"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  activeTab: string
}

export function NavBar({ items, className, activeTab }: NavBarProps) {
  return (
    <div
      className={cn(
        "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-[100] mb-6 sm:pt-6 pointer-events-none w-full",
        className,
      )}
    >
      <div className="flex items-center gap-3 bg-black/20 border border-white/[0.1] backdrop-blur-lg py-1 px-1 rounded-full shadow-lg mx-auto w-fit pointer-events-auto">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <Link
              key={item.name}
              href={item.url}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                "text-white/70 hover:text-white",
                isActive && "text-white"
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="tubelight"
                    className="absolute inset-0 rounded-full -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30
                    }}
                  >
                    <div className="absolute inset-0 rounded-full bg-white/[0.08]" />
                    <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-8 h-[2px] bg-white">
                      <div className="absolute w-12 h-6 bg-white/20 rounded-full blur-lg -top-2 -left-2" />
                      <div className="absolute w-8 h-6 bg-white/20 rounded-full blur-md -top-1" />
                      <div className="absolute w-4 h-4 bg-white/20 rounded-full blur-sm top-0 left-2" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Link>
          )
        })}
      </div>
    </div>
  )
} 