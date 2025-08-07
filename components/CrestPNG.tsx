'use client'

import Image from 'next/image'

interface CrestPNGProps {
  initials?: string
  name?: string
  showName?: boolean
  size?: number
  className?: string
}

export default function CrestPNG({ 
  initials = 'ABC',
  name = '',
  showName = false,
  size = 100,
  className = ''
}: CrestPNGProps) {
  
  // Use the crest-1-no-name.png for the clean crest design
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Use the actual crest PNG */}
      <Image
        src="/products/crest-1-no-name.png"  // Clean crest design with space for personalization
        alt="Heritage Crest"
        width={size}
        height={size}
        className="object-contain"
      />
      
      {/* For personalization, position text in the empty space between the lines */}
      {!showName && (
        <div 
          className="absolute text-center"
          style={{ 
            top: '58%',  // Position in the middle of the two lines
            left: '50%',
            transform: 'translateX(-50%)',
            width: '70%',  // Constrain width to fit within the lines
          }}
        >
          <div 
            className="font-bold uppercase"
            style={{ 
              color: '#000',
              fontSize: `${size * 0.11}px`,
              fontFamily: 'serif',
              letterSpacing: '0.1em',
              lineHeight: 1
            }}
          >
            {initials}
          </div>
        </div>
      )}
      
      {showName && name && (
        <div 
          className="absolute text-center"
          style={{ 
            top: '58%',  // Position in the middle of the two lines
            left: '50%',
            transform: 'translateX(-50%)',
            width: '70%',  // Constrain width to fit within the lines
          }}
        >
          <div 
            style={{ 
              color: '#000',
              fontSize: `${size * 0.08}px`,
              fontFamily: 'serif',
              letterSpacing: '0.02em',
              lineHeight: 1
            }}
          >
            {name}
          </div>
        </div>
      )}
    </div>
  )
}