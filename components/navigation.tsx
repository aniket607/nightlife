"use client"

import { usePathname } from 'next/navigation'
import { 
  Home,
  MapPin,
  Calendar,
  Phone
} from 'lucide-react'
import { NavBar } from "@/components/ui/tubelight-navbar"

const navItems = [
  { name: 'Home', url: '/', icon: Home },
  { name: 'Venues', url: '/venues', icon: MapPin },
  { name: 'Events', url: '/events', icon: Calendar },
  { name: 'Contact', url: '/contact', icon: Phone }
]

export function Navigation() {
  const pathname = usePathname()
  const currentTab = navItems.find(item => {
    if (item.url === '/' && pathname === '/') return true
    if (item.url !== '/' && pathname.startsWith(item.url)) return true
    return false
  })?.name || 'Home'

  return <NavBar items={navItems} activeTab={currentTab} />
} 