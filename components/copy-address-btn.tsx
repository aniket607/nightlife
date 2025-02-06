'use client'

import { useState } from 'react';

interface CopyAddressBtnProps {
  address: string;
}

export default function CopyAddressBtn({ address }: CopyAddressBtnProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 2000); // Hide after 2 seconds
  };

  return (
    <div className="relative">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className='w-5 h-5 flex-shrink-0 cursor-pointer hover:text-white transition-colors' 
        fill="none" 
        viewBox="0 0 24 24"
        onClick={handleCopy}
      >
        <path stroke="currentColor" strokeLinecap="square" d="M7.5 9.5h-2v9h9v-2m-5-11h9v9h-9v-9Z"/>
      </svg>
      
      {/* Tooltip */}
      {showTooltip && (
        <div 
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-white/10 backdrop-blur-sm 
                     text-xs text-white rounded whitespace-nowrap animate-fade-in"
        >
          Copied!
        </div>
      )}
    </div>
  );
}
