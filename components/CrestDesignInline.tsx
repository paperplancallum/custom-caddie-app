'use client'

interface CrestDesignInlineProps {
  showName?: boolean
  name?: string
  initials?: string
  className?: string
  size?: number
}

export default function CrestDesignInline({ 
  showName = false, 
  name = '', 
  initials = '',
  className = '',
  size = 100
}: CrestDesignInlineProps) {
  
  // This is a simplified version of the crest that will render properly
  // We'll create a golf-themed crest design
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg 
        viewBox="0 0 200 200" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer circle */}
        <circle cx="100" cy="100" r="90" fill="none" stroke="#2c5c4f" strokeWidth="2"/>
        
        {/* Inner circle */}
        <circle cx="100" cy="100" r="85" fill="none" stroke="#2c5c4f" strokeWidth="1"/>
        
        {/* Laurel wreath left */}
        <g transform="translate(100, 100)">
          <path d="M -60 -20 Q -65 -10, -60 0 T -60 20 Q -65 30, -60 40" 
                stroke="#2c5c4f" strokeWidth="2" fill="none"/>
          {[...Array(6)].map((_, i) => (
            <g key={`left-${i}`} transform={`translate(-60, ${-30 + i * 12})`}>
              <ellipse cx="0" cy="0" rx="8" ry="4" 
                       fill="#2c5c4f" 
                       transform="rotate(-30)"/>
            </g>
          ))}
        </g>
        
        {/* Laurel wreath right */}
        <g transform="translate(100, 100)">
          <path d="M 60 -20 Q 65 -10, 60 0 T 60 20 Q 65 30, 60 40" 
                stroke="#2c5c4f" strokeWidth="2" fill="none"/>
          {[...Array(6)].map((_, i) => (
            <g key={`right-${i}`} transform={`translate(60, ${-30 + i * 12})`}>
              <ellipse cx="0" cy="0" rx="8" ry="4" 
                       fill="#2c5c4f" 
                       transform="rotate(30)"/>
            </g>
          ))}
        </g>
        
        {/* Golf clubs crossed */}
        <g transform="translate(100, 100)">
          <line x1="-30" y1="-25" x2="30" y2="15" 
                stroke="#2c5c4f" strokeWidth="3"/>
          <line x1="30" y1="-25" x2="-30" y2="15" 
                stroke="#2c5c4f" strokeWidth="3"/>
          
          {/* Club heads */}
          <ellipse cx="-30" cy="-25" rx="8" ry="12" 
                   fill="#2c5c4f" transform="rotate(-30 -30 -25)"/>
          <ellipse cx="30" cy="-25" rx="8" ry="12" 
                   fill="#2c5c4f" transform="rotate(30 30 -25)"/>
        </g>
        
        {/* Golf ball at top */}
        <g transform="translate(100, 60)">
          <circle cx="0" cy="0" r="12" fill="white" stroke="#2c5c4f" strokeWidth="1"/>
          {/* Dimples */}
          <circle cx="-3" cy="-3" r="1" fill="#2c5c4f" opacity="0.3"/>
          <circle cx="3" cy="-3" r="1" fill="#2c5c4f" opacity="0.3"/>
          <circle cx="0" cy="2" r="1" fill="#2c5c4f" opacity="0.3"/>
          <circle cx="-4" cy="4" r="1" fill="#2c5c4f" opacity="0.3"/>
          <circle cx="4" cy="4" r="1" fill="#2c5c4f" opacity="0.3"/>
        </g>
        
        {/* Stars */}
        <g transform="translate(100, 160)">
          <polygon points="0,-8 2.4,-2.4 8,-0 2.4,2.4 0,8 -2.4,2.4 -8,0 -2.4,-2.4" 
                   fill="#2c5c4f" transform="translate(-25, 0)"/>
          <polygon points="0,-10 3,-3 10,0 3,3 0,10 -3,3 -10,0 -3,-3" 
                   fill="#2c5c4f"/>
          <polygon points="0,-8 2.4,-2.4 8,-0 2.4,2.4 0,8 -2.4,2.4 -8,0 -2.4,-2.4" 
                   fill="#2c5c4f" transform="translate(25, 0)"/>
        </g>
        
        {/* Text area */}
        {!showName && (
          <g transform="translate(100, 120)">
            <text x="0" y="0" 
                  textAnchor="middle" 
                  className="fill-[#2c5c4f] font-bold text-lg uppercase">
              {initials || 'ABC'}
            </text>
            <text x="0" y="15" 
                  textAnchor="middle" 
                  className="fill-[#2c5c4f] text-[10px] uppercase tracking-wider">
              SIGNATURE SERIES
            </text>
          </g>
        )}
        
        {showName && name && (
          <g transform="translate(100, 120)">
            <text x="0" y="0" 
                  textAnchor="middle" 
                  className="fill-[#2c5c4f] font-bold text-sm">
              {name}
            </text>
            <text x="0" y="15" 
                  textAnchor="middle" 
                  className="fill-[#2c5c4f] text-[10px] uppercase tracking-wider">
              SIGNATURE SERIES
            </text>
          </g>
        )}
      </svg>
    </div>
  )
}