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
import { useCallback, useEffect, useState } from 'react';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { ITask } from '@/types/task';

type SectionsListProps = {
    sections: ISection[];
};

function SectionsList({ sections }: SectionsListProps) {
    const [currentSections, setCurrentSections] = useState(sections || []);
    const [activeTask, setActiveTask] = useState<ITask | null>(null);

    useEffect(() => {
        setCurrentSections(sections);
    }, [sections]);

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

    const handleDragStart = (event: DragStartEvent) => {
        setActiveTask(event.active.data.current as ITask);

        console.log(activeTask);
    };

    const handleDragCancel = () => {
        setActiveTask(null);
    };

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;

        if (!active || !over) return;

        const activeTask = active.data?.current as ITask;

        const isOverSection = over.data.current?.type === 'section';

        if (isOverSection) {
            const sourceSection = getTaskSection(active.id);
            if (!sourceSection) return;

            const updatedSourceTasks = sourceSection.tasks!.filter(
                task => task.task_id !== active.id,
            );

            activeTask.section_id = over.data.current?.section_id;

            setCurrentSections(prevSections =>
                prevSections.map(section => {
                    if (section.section_id === sourceSection?.section_id) {
                        return {
                            ...section,
                            tasks: updatedSourceTasks,
                        };
                    }
                    if (section.section_id === over.data.current?.section_id) {
                        return {
                            ...section,
                            tasks: [activeTask],
                        };
                    }
                    return section;
                }),
            );
            return;
        }

        const sourceSection = getTaskSection(active.id);
        const targetSection = getTaskSection(over.id);

        if (!sourceSection || !targetSection) return;

        if (sourceSection !== targetSection) {
            const sourceTasks = sourceSection.tasks;
            const targetTasks = targetSection.tasks;

            const updatedSourceTasks = sourceTasks.filter(
                task => task.task_id !== active.id,
            );

            const overIndex = targetTasks.findIndex(
                task => task.task_id === over.id,
            );

            activeTask.section_id = over.data.current?.section_id;
            const updatedTargetTasks = [
                ...targetTasks.slice(0, overIndex),
                activeTask,
                ...targetTasks.slice(overIndex),
            ];

            setCurrentSections(prevSections =>
                prevSections.map(section => {
                    if (section.section_id === sourceSection?.section_id) {
                        return {
                            ...section,
                            tasks: updatedSourceTasks,
                        };
                    }
                    if (section.section_id === targetSection?.section_id) {
                        return {
                            ...section,
                            tasks: updatedTargetTasks,
                        };
                    }
                    return section;
                }),
            );
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) {
            setActiveTask(null);
            return;
        }

        if (active.id === over.id) {
            setActiveTask(null);
            return;
        }

        const activeSection = getTaskSection(active.id);
        const overSection = getTaskSection(over.id);

        if (!activeSection || !overSection) {
            setActiveTask(null);
            return;
        }

        if (activeSection.section_id !== overSection.section_id) {
        } else {
            const activeIndex = activeSection.tasks.findIndex(
                t => t.task_id === active.id,
            );
            const overIndex = overSection.tasks.findIndex(
                t => t.task_id === over.id,
            );

            const newTasks = arrayMove(
                activeSection.tasks,
                activeIndex,
                overIndex,
            );

            setCurrentSections(prevSections =>
                prevSections.map(section => {
                    if (section.section_id !== activeSection.section_id)
                        return section;
                    return {
                        ...section,
                        tasks: newTasks,
                    };
                }),
            );
        }

        setActiveTask(null);
    };

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
                <Section key={section.section_id} section={section}>
                    <div className="mt-5 space-y-4 h-full">
                        <SortableContext
                            items={section.tasks.map(task => task.task_id)}
                        >
                            {section.tasks.map(task => (
                                <Task key={task.task_id} task={task} />
                            ))}
                        </SortableContext>
                    </div>
                </Section>
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
