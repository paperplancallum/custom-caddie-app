'use client'

import { useEffect, useState } from 'react'

interface CrestSVGProps {
  showName?: boolean
  name?: string
  initials?: string
  className?: string
  size?: number
}

export default function CrestSVG({ 
  showName = false, 
  name = '', 
  initials = '',
  className = '',
  size = 100
}: CrestSVGProps) {
  const [svgContent, setSvgContent] = useState<string>('')
  
  useEffect(() => {
    // Load the SVG file
    const svgPath = showName 
      ? '/products/crest-with-name.svg' 
      : '/products/crest-no-name.svg'
    
    fetch(svgPath)
      .then(response => response.text())
      .then(svgText => {
        setSvgContent(svgText)
      })
      .catch(error => {
        console.error('Error loading SVG:', error)
      })
  }, [showName])
  
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Display the actual SVG */}
      {svgContent && (
        <div 
          className="w-full h-full [&>svg]:w-full [&>svg]:h-full"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      )}
      
      {/* Add personalization text overlay if needed */}
      {!showName && initials && (
        <div className="absolute bottom-[20%] left-0 right-0 text-center">
          <div 
            className="text-xs font-bold uppercase tracking-wider"
            style={{ 
              color: '#2c5c4f',
              fontSize: `${size * 0.12}px`
            }}
          >
            {initials}
          </div>
          <div 
            className="uppercase tracking-wider"
            style={{ 
              color: '#2c5c4f',
              fontSize: `${size * 0.06}px`
            }}
          >
            SIGNATURE SERIES
          </div>
        </div>
      )}
      
      {showName && name && (
        <div className="absolute bottom-[20%] left-0 right-0 text-center">
          <div 
            className="font-serif"
            style={{ 
              color: '#2c5c4f',
              fontSize: `${size * 0.1}px`
            }}
          >
            {name}
          </div>
        </div>
      )}
    </div>
  )
}