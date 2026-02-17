import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Sidebar, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import type { FC, ReactNode } from 'react';

export const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-dvh w-full">
      <SidebarProvider>
        <Sidebar>
          <div className="border-sidebar-foreground/10 m-6 h-full rounded-md border bg-[repeating-linear-gradient(45deg,color-mix(in_oklab,var(--sidebar-foreground)10%,transparent),color-mix(in_oklab,var(--sidebar-foreground)10%,transparent)_1px,var(--sidebar)_2px,var(--sidebar)_15px)]" />
        </Sidebar>
        <div className="flex flex-1 flex-col">
          <header className="bg-card sticky top-0 z-50 border-b">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-2 sm:px-6">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="[&_svg]:size-5!" />
                <Separator orientation="vertical" className="hidden h-4! sm:block" />
                <Breadcrumb className="hidden sm:block">
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Policies</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </div>
          </header>
          <main className="mx-auto size-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
            <Card>
              <CardContent className="h-full">{children}</CardContent>
            </Card>
          </main>
          <footer className="bg-card h-10 border-t">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4">
              <p className="text-center text-balance">
                {`©${new Date().getFullYear()}`}{' '}
                <a href="https://github.com/FatihKaratepe" target="_blank" className="hover:underline">
                  Fatih Karatepe
                </a>
                {' '} - Made with ❤️ for better web.
              </p>
            </div>
          </footer>
        </div>
      </SidebarProvider>
    </div>
  );
};
