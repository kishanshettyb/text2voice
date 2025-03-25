'use client'

import { LucideIcon } from 'lucide-react'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export function NavMain({
  items
}: {
  items: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}) {
  const router = useRouter()

  const openFile = () => {
    const newUid = crypto.randomUUID() // Generate a new UID
    router.push(`/studio/text-to-speech/${newUid}`)
  }
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Voice Features</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              {item.name === 'Text to Speech' ? (
                <Button size="sm" className="flex justify-start" variant="ghost" onClick={openFile}>
                  <item.icon />
                  <span>{item.name}</span>
                </Button>
              ) : (
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.name}</span>
                </Link>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
