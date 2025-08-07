'use client'

import { useState, useEffect } from 'react'

interface CrestDesignProps {
  showName?: boolean
  name?: string
  initials?: string
  className?: string
  color?: string
}

export default function CrestDesign({ 
  showName = false, 
  name = '', 
  initials = '',
  className = '',
  color = '#2c5c4f'
}: CrestDesignProps) {
  const [svgContent, setSvgContent] = useState<string>('')
  
  useEffect(() => {
    // Load the appropriate SVG based on whether we show name or not
    const svgFile = showName ? '/products/crest-with-name.svg' : '/products/crest-no-name.svg'
    
    fetch(svgFile)
      .then(res => res.text())
      .then(text => {
        // Parse and modify the SVG to add personalization
        let modifiedSvg = text
        
        // Change colors if needed
        if (color !== '#000000') {
          modifiedSvg = modifiedSvg.replace(/fill="[^"]*"/g, (match) => {
            // Skip white fills
            if (match.includes('#ffffff') || match.includes('white')) {
              return match
            }
            return `fill="${color}"`
          })
        }
        
        setSvgContent(modifiedSvg)
      })
      .catch(err => console.error('Failed to load SVG:', err))
  }, [showName, color])
  
  if (!svgContent) {
    // Fallback to the simple crest design while loading
    return (
      <div className={className}>
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <g fill={color} opacity="0.9">
            <path d="M 25 50 Q 20 40, 25 30 T 25 10" stroke={color} strokeWidth="2" fill="none"/>
            <path d="M 25 15 L 22 12 L 28 13 Z"/>
            <path d="M 25 25 L 22 22 L 28 23 Z"/>
            <path d="M 25 35 L 22 32 L 28 33 Z"/>
            <path d="M 25 45 L 22 42 L 28 43 Z"/>
            <path d="M 75 50 Q 80 40, 75 30 T 75 10" stroke={color} strokeWidth="2" fill="none"/>
            <path d="M 75 15 L 78 12 L 72 13 Z"/>
            <path d="M 75 25 L 78 22 L 72 23 Z"/>
            <path d="M 75 35 L 78 32 L 72 33 Z"/>
            <path d="M 75 45 L 78 42 L 72 43 Z"/>
          </g>
        </svg>
        {!showName && (
          <div className="text-center mt-2">
            <div className="text-xs font-bold uppercase tracking-wider" style={{ color }}>
              {initials || 'ABC'}
            </div>
          </div>
        )}
      </div>
    )
  }
  
  return (
    <div className={className}>
      <div dangerouslySetInnerHTML={{ __html: svgContent }} />
      {!showName && (
        <div className="text-center mt-2">
          <div className="text-xs font-bold uppercase tracking-wider" style={{ color }}>
            {initials || 'ABC'}
          </div>
          <div className="text-[8px] mt-0.5" style={{ color }}>SIGNATURE SERIES</div>
        </div>
      )}
      {showName && name && (
        <div className="text-center mt-2">
          <div className="text-xs font-bold uppercase tracking-wider" style={{ color }}>
            {name}
          </div>
        </div>
      )}
    </div>
  )
}