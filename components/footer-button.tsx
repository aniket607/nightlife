'use client'

interface FooterButtonProps {
  elementId: string;
  buttonText: string;
}

export function FooterButton({ elementId, buttonText }: FooterButtonProps) {
  const handleScroll = () => {
    const featuredSection = document.getElementById(elementId)
    featuredSection?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }
  return (
    <button onClick={handleScroll}>{buttonText}</button>
  )
}

