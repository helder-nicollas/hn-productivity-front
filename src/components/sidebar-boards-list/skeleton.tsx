import {
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuSkeleton,
} from '../ui/sidebar';

function SidebarBoardsListSkeleton() {
    return (
        <SidebarMenu>
            {Array.from({ length: 5 }).map((_, index) => (
                <SidebarMenuItem key={index}>
                    <SidebarMenuSkeleton />
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    );
}

export { SidebarBoardsListSkeleton };
