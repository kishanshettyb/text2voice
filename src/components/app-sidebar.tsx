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
import { Button } from './ui/button'
import Link from 'next/link'

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
      <div className="p-4">
        <div className="shadow-2xl border border-green-400 shadow-green-300 dark:shadow-green-900 rounded-2xl bg-gradient-to-r from-green-400 from-10% via-green-600 via-30% to-green-400 to-90% ">
          <div className="px-4 pt-4 border border-b-green-400 border-x-0 border-t-0">
            <p className="text-sm mb-0 text-white font-normal">Pro Plan</p>
            <p className="text-xl  text-white font-semibold">Flat 50% off</p>
            <p className="text-xs text-white mb-2">for annual subscription</p>
          </div>
          <div className="px-4 pt-2 pb-4">
            <p className="text-center text-xs mb-2 text-white">6,716 characters left</p>

            <Link href="/studio/pricing">
              <Button variant="default" size="lg" className="w-full opacity-90 hover:opacity-100">
                <Sparkles /> Upgrade Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
