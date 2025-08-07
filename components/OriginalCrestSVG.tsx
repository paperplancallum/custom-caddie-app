'use client'

interface OriginalCrestSVGProps {
  initials?: string
  name?: string
  showName?: boolean
  size?: number
  className?: string
}

export default function OriginalCrestSVG({ 
  initials = 'ABC',
  name = '',
  showName = false,
  size = 100,
  className = ''
}: OriginalCrestSVGProps) {
  
  // Since we can't directly import the complex SVG, let's use the image tag with proper styling
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Use object tag to properly render SVG */}
      <object
        data={showName ? '/products/crest-with-name.svg' : '/products/crest-no-name.svg'}
        type="image/svg+xml"
        className="w-full h-full"
        style={{ pointerEvents: 'none' }}
      >
        {/* Fallback */}
        <img 
          src={showName ? '/products/crest-with-name.svg' : '/products/crest-no-name.svg'} 
          alt="Heritage Crest"
          className="w-full h-full"
        />
      </object>
      
      {/* Overlay personalization if needed */}
      {!showName && (
        <div 
          className="absolute left-1/2 -translate-x-1/2 text-center"
          style={{ 
            bottom: `${size * 0.25}px`,
          }}
        >
          <div 
            className="font-bold uppercase tracking-wider"
            style={{ 
              color: '#000',
              fontSize: `${size * 0.08}px`,
              fontFamily: 'serif'
            }}
          >
            {initials}
          </div>
          <div 
            className="uppercase tracking-widest mt-0.5"
            style={{ 
              color: '#000',
              fontSize: `${size * 0.05}px`,
              fontFamily: 'sans-serif'
            }}
          >
            SIGNATURE SERIES
          </div>
        </div>
      )}
      
      {showName && name && (
        <div 
          className="absolute left-1/2 -translate-x-1/2 text-center"
          style={{ 
            bottom: `${size * 0.25}px`,
          }}
        >
          <div 
            className="font-serif"
            style={{ 
              color: '#000',
              fontSize: `${size * 0.08}px`
            }}
          >
            {name}
          </div>
          <div 
            className="uppercase tracking-widest mt-0.5"
            style={{ 
              color: '#000',
              fontSize: `${size * 0.05}px`,
              fontFamily: 'sans-serif'
            }}
          >
            SIGNATURE SERIES
          </div>
        </div>
      )}
    </div>
  )
}