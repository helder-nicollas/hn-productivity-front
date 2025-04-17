'use client';
import { ISection } from '@/types/section';
import { Section } from '../section';
import { Task } from '../task';
import {
    closestCorners,
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    UniqueIdentifier,
} from '@dnd-kit/core';
import { useCallback, useEffect, useRef, useState } from 'react';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { ITask } from '@/types/task';
import { useMutation } from '@tanstack/react-query';
import { fetcher } from '@/utils/api';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';

type SectionsListProps = {
    sections: ISection[];
};

type UpdateTasksPositionsRequest = {
    sourceSectionId: string;
    destinationSectionId: string;
    sourceTasksList: string[];
    destinationTasksList: string[];
};

function SectionsList({ sections }: SectionsListProps) {
    const [currentSections, setCurrentSections] = useState(sections || []);
    const [activeTask, setActiveTask] = useState<ITask | null>(null);
    const [emptySection, setEmptySection] = useState<ISection | null>(null);
    const previousSectionsRef = useRef(sections || []);
    const [mounted, setMounted] = useState(false);
    const params = useParams();
    const session = useSession();
    const token = session.data?.user.accessToken;

    useEffect(() => {
        setCurrentSections(sections);
        setMounted(true);
    }, [sections]);

    const { mutateAsync } = useMutation<
        unknown,
        Error,
        UpdateTasksPositionsRequest
    >({
        mutationFn: async ({
            sourceSectionId,
            destinationSectionId,
            sourceTasksList,
            destinationTasksList,
        }) =>
            await fetcher(
                `/boards/${params.boardId}/sections/tasks/update-positions`,
                {
                    body: JSON.stringify({
                        sourceSectionId,
                        destinationSectionId,
                        sourceTasksList,
                        destinationTasksList,
                    }),
                    method: 'PUT',
                    token,
                },
            ),
    });

    const getTaskSection = useCallback(
        (taskId: UniqueIdentifier) => {
            const allTasks = currentSections.flatMap(section =>
                section.tasks.map(task => task),
            );

            const activeTask = allTasks.find(task => task.task_id === taskId);

            if (!activeTask) return null;

            return currentSections.find(
                section => section.section_id === activeTask.section_id,
            );
        },
        [currentSections],
    );

    const updateSameSectionTasks = ({
        sectionId,
        newTasks,
    }: {
        sectionId: string;
        newTasks: ITask[];
    }) => {
        setCurrentSections(prevSections =>
            prevSections.map(section => {
                if (section.section_id === sectionId) {
                    return {
                        ...section,
                        tasks: newTasks,
                    };
                }
                return section;
            }),
        );
    };

    const updateDifferentsSectionsTasks = ({
        activeSectionId,
        newActiveSectionTasks,
        newOverSectionTasks,
        overSectionId,
    }: {
        activeSectionId: string;
        newActiveSectionTasks: ITask[];
        overSectionId: string;
        newOverSectionTasks: ITask[];
    }) => {
        setCurrentSections(prevSections =>
            prevSections.map(section => {
                if (section.section_id === activeSectionId) {
                    return {
                        ...section,
                        tasks: newActiveSectionTasks,
                    };
                }
                if (section.section_id === overSectionId) {
                    return {
                        ...section,
                        tasks: newOverSectionTasks,
                    };
                }
                return section;
            }),
        );
    };
    const handleDragStart = (event: DragStartEvent) => {
        previousSectionsRef.current = structuredClone(currentSections);
        setActiveTask(event.active.data.current as ITask);
    };

    const handleDragCancel = () => {
        setActiveTask(null);
        setEmptySection(null);
    };

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;
        if (!active || !over) return;

        const activeSection = getTaskSection(active.id);
        const activeTask = active.data?.current as ITask;
        const overSection = getTaskSection(over.id);
        const isEmptySection = over.data.current?.type === 'section';

        if (isEmptySection && activeSection) {
            setEmptySection(over.data.current as ISection);
            activeTask.section_id = over.data.current?.section_id;
            const overSection = over.data.current;

            const newActiveSectionTasks = activeSection.tasks!.filter(
                task => task.task_id !== active.id,
            );

            if (!activeTask) return;

            updateDifferentsSectionsTasks({
                activeSectionId: activeSection.section_id,
                newActiveSectionTasks,
                newOverSectionTasks: [activeTask],
                overSectionId: overSection?.section_id,
            });
            return;
        }

        if (!activeSection || !overSection) return;

        const isDifferentsSection =
            activeSection.section_id !== overSection.section_id;

        if (isDifferentsSection) {
            activeTask.section_id = over.data.current?.section_id;
            const newActiveSectionTasks = [...activeSection.tasks];
            const newOverSectionTasks = [...overSection.tasks];

            const activeIndex = newActiveSectionTasks.findIndex(
                task => task.task_id === active.id,
            );
            newActiveSectionTasks.splice(activeIndex, 1);

            const overIndex = newOverSectionTasks.findIndex(
                task => task.task_id === over.id,
            );

            newOverSectionTasks.splice(overIndex, 0, activeTask);

            updateDifferentsSectionsTasks({
                activeSectionId: activeSection.section_id,
                newActiveSectionTasks,
                newOverSectionTasks,
                overSectionId: overSection?.section_id,
            });
        }
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (!active || !over) return;

        if (!active.data.current?.task_id || !over.data.current?.task_id) {
            if (previousSectionsRef.current)
                setCurrentSections(previousSectionsRef.current);
            setEmptySection(null);
            setActiveTask(null);
            previousSectionsRef.current = [];
            return;
        }

        const activeSection = getTaskSection(active.id);
        const overSection = getTaskSection(over.id);
        if (!activeSection || !overSection) return;

        const activeIndex = activeSection.tasks.findIndex(
            task => task.task_id === active.id,
        );

        const overIndex = overSection.tasks.findIndex(
            task => task.task_id === over.id,
        );
        const newActiveSectionTasks = [...activeSection.tasks];
        const newOverSectionTasks = [...overSection.tasks];

        // Empty Section use case
        if (emptySection) {
            const [removedTask] = newActiveSectionTasks.splice(activeIndex, 1);
            mutateAsync({
                sourceSectionId: activeSection.section_id,
                sourceTasksList: newActiveSectionTasks.map(
                    task => task.task_id,
                ),
                destinationSectionId: emptySection.section_id,
                destinationTasksList: [removedTask.task_id],
            });
            setActiveTask(null);
            setEmptySection(null);
            previousSectionsRef.current = [];
            return;
        }

        // Same Section use case
        if (activeSection?.section_id === overSection?.section_id) {
            const newTasks = arrayMove(
                activeSection.tasks,
                activeIndex,
                overIndex,
            );

            updateSameSectionTasks({
                sectionId: overSection.section_id,
                newTasks,
            });

            mutateAsync({
                sourceSectionId: activeSection.section_id,
                sourceTasksList: newTasks.map(task => task.task_id),
                destinationSectionId: overSection.section_id,
                destinationTasksList: newTasks.map(task => task.task_id),
            });
        } else {
            // Differents Sections use case
            const [removedTask] = newActiveSectionTasks.splice(activeIndex, 1);
            newOverSectionTasks.splice(overIndex, 0, removedTask);

            mutateAsync({
                sourceSectionId: activeSection.section_id,
                sourceTasksList: newActiveSectionTasks.map(
                    task => task.task_id,
                ),
                destinationSectionId: overSection.section_id,
                destinationTasksList: newOverSectionTasks.map(
                    task => task.task_id,
                ),
            });

            updateDifferentsSectionsTasks({
                activeSectionId: activeSection.section_id,
                newActiveSectionTasks,
                newOverSectionTasks,
                overSectionId: overSection.section_id,
            });
        }
        setActiveTask(null);
        setEmptySection(null);
        previousSectionsRef.current = [];
    };

    if (!mounted) return null;

    if (!sections.length)
        return (
            <h1 className="opacity-30 text-3xl">
                Nenhuma seção foi cadastrada.
            </h1>
        );

    return (
        <DndContext
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragCancel={handleDragCancel}
            collisionDetection={closestCorners}
        >
            {currentSections?.map(section => (
                <SortableContext
                    key={section.section_id}
                    id={section.section_id}
                    items={section.tasks.map(task => task.task_id)}
                >
                    <Section section={section}>
                        <div className="mt-5 space-y-4 h-full">
                            {section.tasks.map(task => (
                                <Task key={task.task_id} task={task} />
                            ))}
                        </div>
                    </Section>
                </SortableContext>
            ))}
            <DragOverlay>
                {activeTask ? (
                    <Task
                        className="opacity-50 border-emerald-600 border"
                        task={activeTask}
                    />
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}

export { SectionsList };
