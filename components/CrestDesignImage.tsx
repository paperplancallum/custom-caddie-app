'use client'

import Image from 'next/image'

interface CrestDesignImageProps {
  showName?: boolean
  name?: string
  initials?: string
  className?: string
  size?: number
}

export default function CrestDesignImage({ 
  showName = false, 
  name = '', 
  initials = '',
  className = '',
  size = 100
}: CrestDesignImageProps) {
  
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* SVG Crest Image */}
      <Image
        src={showName ? '/products/crest-with-name.svg' : '/products/crest-no-name.svg'}
        alt="Heritage Crest"
        width={size}
        height={size}
        className="object-contain"
      />
      
      {/* Overlay personalization text */}
      {!showName && (
        <div className="absolute bottom-0 left-0 right-0 text-center">
          <div className="text-[10px] font-bold text-[#2c5c4f] uppercase tracking-wider">
            {initials || 'ABC'}
          </div>
          <div className="text-[8px] text-[#2c5c4f]">SIGNATURE SERIES</div>
        </div>
      )}
      
      {showName && name && (
        <div className="absolute bottom-0 left-0 right-0 text-center">
          <div className="text-[10px] font-bold text-[#2c5c4f] uppercase tracking-wider">
            {name}
          </div>
        </div>
      )}
    </div>
  )
}