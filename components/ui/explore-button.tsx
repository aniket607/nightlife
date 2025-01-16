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
      className="text-black relative cursor-pointer"
      style={{ zIndex: 9999 }}
    >
      Start Exploring
    </RainbowButton>
  )
}
