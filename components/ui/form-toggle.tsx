"use client"

import { useState } from 'react'
import { User, Users } from 'lucide-react'
import { cn } from "@/lib/utils"

interface FormToggleProps {
  onToggle: (value: 'stag' | 'couple') => void
  className?: string
  disableCouple?: boolean
}

export function FormToggle({ onToggle, className, disableCouple = false }: FormToggleProps) {
  const [selected, setSelected] = useState<'stag' | 'couple'>('stag')

  const handleToggle = () => {
    if (selected === 'couple' || !disableCouple) {
      const newValue = selected === 'stag' ? 'couple' : 'stag';
      setSelected(newValue);
      onToggle(newValue);
    }
  }

  return (
    <div
      className={cn(
        "flex w-48 h-12 p-1.5 rounded-full cursor-pointer transition-all duration-300 mx-auto",
        "bg-white/10 backdrop-blur-lg border border-white/20 hover:border-white/30",
        disableCouple && selected === 'stag' && "cursor-not-allowed hover:border-white/20",
        className
      )}
      onClick={handleToggle}
      role="button"
      tabIndex={0}
    >
      <div className="flex justify-between items-center w-full relative">
        {/* Sliding Background */}
        <div
          className={cn(
            "absolute w-[calc(50%-6px)] h-9 rounded-full bg-white transition-transform duration-300 ease-spring",
            selected === 'stag' 
              ? "transform translate-x-0" 
              : "transform translate-x-[calc(100%+12px)]"
          )}
        />

        {/* Stag Icon + Text */}
        <div
          className={cn(
            "flex justify-center items-center gap-2 w-[calc(50%-6px)] h-9 rounded-full transition-colors duration-300 z-10",
            selected === 'stag' ? "text-black" : "text-white/70"
          )}
        >
          <User className="w-4 h-4" strokeWidth={1.5} />
          <span className="text-sm font-medium font-helvetica">Stag</span>
        </div>

        {/* Couple Icon + Text */}
        <div
          className={cn(
            "flex justify-center items-center gap-2 w-[calc(50%-6px)] h-9 rounded-full transition-colors duration-300 z-10",
            selected === 'couple' ? "text-black" : disableCouple ? "text-white/30" : "text-white/70"
          )}
        >
          <Users className="w-4 h-4" strokeWidth={1.5} />
          <span className="text-sm font-helvetica font-medium">Couple</span>
        </div>
      </div>
    </div>
  )
}
