"use client"

import { RainbowButton } from "./rainbow-button"

export function ExploreButton() {
  const handleScroll = () => {
    const featuredSection = document.getElementById('featured-venues')
    featuredSection?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }
  
  return (
    <RainbowButton 
      onClick={handleScroll} 
      className="text-black bg-white relative cursor-pointer hover:scale-105 transition-all duration-300"
      style={{ zIndex: 9999 }}
    >
      Start Exploring
    </RainbowButton>
  )
}
