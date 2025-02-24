import { AppSidebar } from '@/components/app-sidebar'
import React, { ReactNode } from 'react'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Separator } from '@radix-ui/react-separator'
import { ProfileDropdown } from '@/components/profileDropdown'
import { ModeToggle } from '@/components/themeModeToggle'
interface Props {
  children: ReactNode
}

function Layout({ children }: Props) {
  return (
    <div className="flex bg-white dark:bg-zinc-900 h-screen">
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <SidebarInset>
            <header className="border mb-5 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex justify-between w-full  flex-row">
                <div className="flex items-center gap-2 px-4">
                  <SidebarTrigger className="-ml-1" />
                  <Separator orientation="vertical" className="mr-2 h-4" />
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
                <div className="p-4 flex flex-row justify-between items-center gap-x-4">
                  <ModeToggle />
                  <ProfileDropdown />
                </div>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
              </div>
              <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
            </div>
          </SidebarInset>
          {children}
        </main>
      </SidebarProvider>
    </div>
  )
}

export default Layout
