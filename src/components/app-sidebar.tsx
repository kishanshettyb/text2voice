'use client'

import * as React from 'react'
import {
  AudioLines,
  AudioWaveform,
  Command,
  CreditCard,
  FolderClosed,
  Headset,
  LayoutDashboard,
  Mic,
  Settings,
  Sparkles
} from 'lucide-react'

import { NavMain } from '@/components/nav-main'
import { NavAccounts } from '@/components/nav-accounts'
import { NavUser } from '@/components/nav-user'
import { TeamSwitcher } from '@/components/team-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from '@/components/ui/sidebar'
import { NavOverview } from './nav-overview'

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/profilenew.jpg'
  },
  teams: [
    {
      name: 'voicekaro',
      logo: Mic,
      plan: 'Enterprise'
    },
    {
      name: 'voicekaro',
      logo: AudioWaveform,
      plan: 'Startup'
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free'
    }
  ],
  navOverview: [
    {
      name: 'Dashboard',
      url: '/studio',
      icon: LayoutDashboard
    },
    {
      name: 'My Files',
      url: '/studio/my-files',
      icon: FolderClosed
    }
  ],
  navMain: [
    {
      name: 'Text to Speech',
      url: '/studio/text-to-speech',
      icon: AudioLines
    },
    {
      name: 'Voice Cloning',
      url: '#',
      icon: Sparkles
    }
  ],
  account: [
    {
      name: 'Billing',
      url: '#',
      icon: CreditCard
    },
    {
      name: 'Settings',
      url: '#',
      icon: Settings
    },
    {
      name: 'Support',
      url: '#',
      icon: Headset
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavOverview items={data.navOverview} />
        <NavMain items={data.navMain} />
        <NavAccounts account={data.account} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
