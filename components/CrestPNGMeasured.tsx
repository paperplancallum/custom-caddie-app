'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { getCrestConfig } from '@/lib/crest-config'
import { getCrestFont } from '@/lib/crest-fonts'

interface CrestPNGMeasuredProps {
  initials?: string
  firstName?: string
  lastName?: string
  customText?: string
  textType?: 'initials' | 'firstName' | 'lastName' | 'custom'
  fontType?: 'serif' | 'sans' | 'script' | 'gothic' | 'modern'
  textSize?: number  // Text size as percentage (100 = normal)
  size?: number
  className?: string
  crestType?: string  // Specify which crest design to use
}

export default function CrestPNGMeasured({ 
  initials = 'ABC',
  firstName = '',
  lastName = '',
  customText = '',
  textType = 'initials',
  fontType = 'serif',
  textSize = 100,
  size = 100,
  className = '',
  crestType = 'crest-1-no-name'  // Default to crest-1
}: CrestPNGMeasuredProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Get configuration for this specific crest
  const config = getCrestConfig(crestType)
  const optimalPosition = config.textPosition
  
  // Get font configuration
  const font = getCrestFont(fontType)
  
  // Determine what text to display based on textType - always uppercase
  const getDisplayText = () => {
    switch(textType) {
      case 'initials':
        return initials?.toUpperCase()
      case 'firstName':
        return firstName?.toUpperCase()
      case 'lastName':
        return lastName?.toUpperCase()
      case 'custom':
        return customText?.toUpperCase()
      default:
        return initials?.toUpperCase()
    }
  }
  
  const displayText = getDisplayText()
  
  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`} 
      style={{ width: size, height: size }}
    >
      {/* Use the configured crest PNG */}
      <Image
        src={config.imagePath}
        alt="Heritage Crest"
        width={size}
        height={size}
        className="object-contain"
      />
      
      {/* Position text precisely in the measured blank space */}
      {displayText && (
        <div 
          className="absolute text-center flex items-center justify-center"
          style={{ 
            top: `${optimalPosition}%`,
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: `${config.width}%`,
            height: `${size * 0.08}px`, // Height of the blank space
          }}
        >
          <div 
            style={{ 
              color: '#000',
              fontSize: `${size * config.fontSize * (textSize / 100)}px`,
              fontFamily: font.family,
              fontWeight: font.weight,
              fontStyle: font.style || 'normal',
              letterSpacing: font.letterSpacing,
              lineHeight: 1,
              textTransform: 'uppercase',
            }}
          >
            {displayText}
          </div>
        </div>
      )}
    </div>
  )
}