// import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
// import { type BreadcrumbItem } from '@/types';
// import { type ReactNode } from 'react';

// interface AppLayoutProps {
//     children: ReactNode;
//     breadcrumbs?: BreadcrumbItem[];
// }

// export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
//     <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
//         {children}
//     </AppLayoutTemplate>
// );




import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import { usePage } from '@inertiajs/react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({ children, breadcrumbs, ...props }: AppLayoutProps) {
    const { auth } = usePage().props;

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}
        </AppLayoutTemplate>
    );
}
