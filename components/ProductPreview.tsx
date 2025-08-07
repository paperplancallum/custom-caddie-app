'use client'

import { GiftBoxCustomization } from '@/types/giftbox'

interface ProductPreviewProps {
  customization: GiftBoxCustomization
  activeStep: number
}

export default function ProductPreview({ customization, activeStep }: ProductPreviewProps) {
  const { recipient, items } = customization

  // Determine what to show based on active step
  const getActiveProduct = () => {
    switch (activeStep) {
      case 0: // Gift Set
        return 'set'
      case 1: // Recipient
        return 'recipient'
      case 2: // Golf Balls
        return 'golfBalls'
      case 3: // Golf Tees
        return 'golfTees'
      case 4: // Golf Towel
        return 'golfTowel'
      case 5: // Divot Tool
        return 'divotTool'
      case 6: // Gift Options
        return 'giftBox'
      default:
        return 'set'
    }
  }

  const activeProduct = getActiveProduct()

  // Get the text to display on golf balls
  const getGolfBallText = () => {
    const { personalization } = items.golfBalls
    if (personalization.type === 'initials') {
      return recipient.initials || 'ABC'
    } else if (personalization.type === 'name') {
      return recipient.name || 'Your Name'
    } else {
      return personalization.text || 'Custom'
    }
  }

  // Get font classes
  const getFontClass = (font: string) => {
    return FONT_STYLES[font as keyof typeof FONT_STYLES]?.className || 'font-serif'
  }

  // Get font size classes
  const getFontSizeClass = (size: string) => {
    return FONT_SIZES[size as keyof typeof FONT_SIZES]?.className || 'text-sm'
  }

  // Get font style object
  const getFontStyle = (font: string, size: string) => {
    const fontStyle = FONT_STYLES[font as keyof typeof FONT_STYLES]?.style || {}
    const sizeScale = FONT_SIZES[size as keyof typeof FONT_SIZES]?.scale || 1
    return {
      ...fontStyle,
      fontSize: `${1.2 * sizeScale}rem`
    }
  }

  return (
    <div className="w-full h-full">
      {/* Set Overview */}
      {activeProduct === 'set' && (
        <div className="h-full flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-[#C9A961]/20 to-[#E8DCC4]/20 rounded-full flex items-center justify-center">
              <Package className="w-16 h-16 text-[#C9A961]" />
            </div>
            <h3 className="text-xl font-serif text-[#2F3E2E]">{GIFT_SETS[customization.set].name}</h3>
            <p className="text-sm text-[#7C8471]">Customize each item →</p>
          </div>
        </div>
      )}

      {/* Recipient Preview */}
      {activeProduct === 'recipient' && recipient.name && (
        <div className="h-full flex items-center justify-center">
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="w-40 h-40 mx-auto bg-gradient-to-br from-[#E8DCC4]/30 to-white rounded-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl font-serif text-[#C9A961] mb-2">
                    {recipient.initials}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-[#7C8471]">
                    For {recipient.name}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Golf Balls Preview */}
      {activeProduct === 'golfBalls' && items.golfBalls.included && (
        <div className="h-full flex items-center justify-center">
          <div className="space-y-6">
            <h4 className="text-center text-sm uppercase tracking-wider text-[#7C8471]">Golf Ball Preview</h4>
            
            {/* Single large golf ball */}
            <div className="flex justify-center">
              <div className="relative">
                {/* Golf ball */}
                <div className="w-40 h-40 bg-white rounded-full shadow-xl border border-gray-100 flex items-center justify-center overflow-hidden">
                  {/* Dimple pattern overlay */}
                  <div className="absolute inset-0 opacity-5">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      {[...Array(35)].map((_, i) => (
                        <circle
                          key={i}
                          cx={15 + (i % 7) * 12}
                          cy={15 + Math.floor(i / 7) * 12}
                          r="2"
                          fill="gray"
                        />
                      ))}
                    </svg>
                  </div>
                  
                  {/* Custom text */}
                  <div className={`relative z-10 text-center ${getFontClass(items.golfBalls.personalization.font)} ${getFontSizeClass(items.golfBalls.personalization.size)}`}>
                    <div className="font-bold text-gray-800 px-4" style={getFontStyle(items.golfBalls.personalization.font, items.golfBalls.personalization.size)}>
                      {getGolfBallText()}
                    </div>
                  </div>
                </div>
                
                {/* Shadow */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-3 bg-black/10 rounded-full blur-md" />
              </div>
            </div>
            
            <p className="text-center text-xs text-[#7C8471]">
              {items.golfBalls.quantity} balls with {items.golfBalls.personalization.type}
              <br/>
              {FONT_STYLES[items.golfBalls.personalization.font].name} • {FONT_SIZES[items.golfBalls.personalization.size].name}
            </p>
          </div>
        </div>
      )}

      {/* Golf Tees Preview */}
      {activeProduct === 'golfTees' && items.golfTees.included && (
        <div className="h-full flex items-center justify-center">
          <div className="space-y-6">
            <h4 className="text-center text-sm uppercase tracking-wider text-[#7C8471]">Golf Tees Preview</h4>
            
            <div className="flex gap-2 justify-center">
              {[1, 2, 3, 4, 5].map((tee) => (
                <div key={tee} className="relative">
                  {/* Tee shape */}
                  <div className="relative">
                    {/* Cup/top */}
                    <div 
                      className="w-4 h-2 rounded-t-full"
                      style={{
                        backgroundColor: items.golfTees.color === 'natural' ? '#D2B48C' :
                                       items.golfTees.color === 'white' ? '#FFFFFF' : '#000000',
                        borderTop: '1px solid rgba(0,0,0,0.1)'
                      }}
                    />
                    {/* Stem */}
                    <div 
                      className="w-1 h-16 mx-auto"
                      style={{
                        backgroundColor: items.golfTees.color === 'natural' ? '#D2B48C' :
                                       items.golfTees.color === 'white' ? '#FFFFFF' : '#000000',
                        boxShadow: 'inset -1px 0 2px rgba(0,0,0,0.1)'
                      }}
                    />
                    {/* Point */}
                    <div 
                      className="w-0 h-0 mx-auto"
                      style={{
                        borderLeft: '2px solid transparent',
                        borderRight: '2px solid transparent',
                        borderTop: `4px solid ${
                          items.golfTees.color === 'natural' ? '#D2B48C' :
                          items.golfTees.color === 'white' ? '#FFFFFF' : '#000000'
                        }`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            {items.golfTees.personalization.text && (
              <p className="text-center text-xs font-medium text-[#2F3E2E]">
                "{items.golfTees.personalization.text}"
              </p>
            )}
            
            <p className="text-center text-xs text-[#7C8471]">
              {items.golfTees.quantity} natural wood tees with personalization
            </p>
          </div>
        </div>
      )}

      {/* Golf Towel Preview */}
      {activeProduct === 'golfTowel' && items.golfTowel.included && (
        <div className="h-full flex items-center justify-center">
          <div className="space-y-6">
            <h4 className="text-center text-sm uppercase tracking-wider text-[#7C8471]">Golf Towel Preview</h4>
            
            <div className="relative">
              {/* Towel */}
              <div 
                className="w-48 h-32 rounded shadow-lg relative overflow-hidden"
                style={{
                  backgroundColor: items.golfTowel.color === 'white' ? '#FFFFFF' :
                                 items.golfTowel.color === 'navy' ? '#000080' : '#000000',
                  border: '1px solid rgba(0,0,0,0.1)'
                }}
              >
                {/* Texture lines */}
                <div className="absolute inset-0 opacity-10">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="h-px bg-black/20"
                      style={{ marginTop: `${i * 4}px` }}
                    />
                  ))}
                </div>
                
                {/* Embroidery */}
                <div 
                  className={`absolute ${
                    items.golfTowel.personalization.position === 'corner' 
                      ? 'bottom-2 right-2' 
                      : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                  }`}
                >
                  <div 
                    className="font-serif text-lg font-bold"
                    style={{
                      color: items.golfTowel.color === 'white' ? '#C9A961' : '#FFFFFF',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                    }}
                  >
                    {items.golfTowel.personalization.type === 'initials' 
                      ? recipient.initials
                      : items.golfTowel.personalization.type === 'name'
                      ? recipient.name
                      : 'LOGO'}
                  </div>
                </div>
                
                {/* Carabiner clip */}
                <div className="absolute top-2 left-2">
                  <div className="w-4 h-6 border-2 border-gray-400 rounded-lg" />
                </div>
              </div>
            </div>
            
            <p className="text-center text-xs text-[#7C8471]">
              {items.golfTowel.color} towel with {items.golfTowel.personalization.type} ({items.golfTowel.personalization.position})
            </p>
          </div>
        </div>
      )}

      {/* Divot Tool Preview */}
      {activeProduct === 'divotTool' && items.divotTool.included && (
        <div className="h-full flex items-center justify-center">
          <div className="space-y-6">
            <h4 className="text-center text-sm uppercase tracking-wider text-[#7C8471]">Divot Tool Preview</h4>
            
            <div className="relative">
              {/* Divot tool shape */}
              <div className="relative mx-auto w-20">
                {/* Handle */}
                <div 
                  className="w-16 h-24 mx-auto rounded-t-3xl rounded-b-lg shadow-lg relative overflow-hidden"
                  style={{
                    background: items.divotTool.finish === 'gold' 
                      ? 'linear-gradient(135deg, #FFD700, #FFA500)'
                      : items.divotTool.finish === 'silver'
                      ? 'linear-gradient(135deg, #C0C0C0, #808080)'
                      : 'linear-gradient(135deg, #2F2F2F, #000000)'
                  }}
                >
                  {/* Engraving area */}
                  <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <div 
                      className="text-xs font-bold"
                      style={{
                        color: items.divotTool.finish === 'black' ? '#C9A961' : '#2F3E2E',
                        textShadow: '0 1px 1px rgba(0,0,0,0.3)'
                      }}
                    >
                      {items.divotTool.personalization.type === 'initials'
                        ? recipient.initials
                        : items.divotTool.personalization.type === 'name'
                        ? recipient.name.split(' ')[0]
                        : items.divotTool.personalization.text}
                    </div>
                  </div>
                  
                  {/* Ball marker indent */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                    <div className="w-6 h-6 rounded-full bg-black/20" />
                  </div>
                </div>
                
                {/* Prongs */}
                <div className="flex justify-center gap-1 -mt-1">
                  <div 
                    className="w-1 h-4"
                    style={{
                      background: items.divotTool.finish === 'gold' 
                        ? 'linear-gradient(180deg, #FFA500, #FFD700)'
                        : items.divotTool.finish === 'silver'
                        ? 'linear-gradient(180deg, #808080, #C0C0C0)'
                        : 'linear-gradient(180deg, #000000, #2F2F2F)'
                    }}
                  />
                  <div 
                    className="w-1 h-4"
                    style={{
                      background: items.divotTool.finish === 'gold' 
                        ? 'linear-gradient(180deg, #FFA500, #FFD700)'
                        : items.divotTool.finish === 'silver'
                        ? 'linear-gradient(180deg, #808080, #C0C0C0)'
                        : 'linear-gradient(180deg, #000000, #2F2F2F)'
                    }}
                  />
                </div>
              </div>
            </div>
            
            <p className="text-center text-xs text-[#7C8471]">
              {items.divotTool.finish} finish with {items.divotTool.personalization.type}
            </p>
          </div>
        </div>
      )}

      {/* Gift Box Preview */}
      {activeProduct === 'giftBox' && (
        <div className="h-full flex items-center justify-center">
          <div className="space-y-6">
            <h4 className="text-center text-sm uppercase tracking-wider text-[#7C8471]">Complete Gift Set</h4>
            
            <div className="relative">
              {/* Gift box */}
              <div className="w-56 h-40 bg-gradient-to-br from-[#2F3E2E] to-[#1a2420] rounded-lg shadow-xl relative overflow-hidden">
                {/* Lid */}
                <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-[#3a4a3a] to-[#2F3E2E] rounded-t-lg">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="text-[#C9A961] text-xs font-serif">Custom Caddie</div>
                  </div>
                </div>
                
                {/* Ribbon */}
                {customization.giftOptions.giftWrap && (
                  <>
                    <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-[#C9A961]/80" />
                    <div className="absolute top-0 left-0 right-0 h-8 flex items-center justify-center">
                      <div className="w-12 h-12 bg-[#C9A961] rounded-full flex items-center justify-center shadow-lg">
                        <Gift className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </>
                )}
                
                {/* Items preview */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-around">
                  {items.golfBalls.included && (
                    <div className="w-6 h-6 bg-white rounded-full shadow-sm" />
                  )}
                  {items.golfTowel.included && (
                    <div className="w-6 h-4 bg-white/80 rounded-sm shadow-sm" />
                  )}
                  {items.divotTool.included && (
                    <div className="w-2 h-6 bg-gray-400 rounded-t-full shadow-sm" />
                  )}
                </div>
              </div>
              
              {/* Gift tag */}
              {customization.giftOptions.includeCard && (
                <div className="absolute -bottom-4 right-0 bg-white shadow-md rounded p-2 text-xs">
                  <div className="font-semibold">To: {recipient.name}</div>
                  {customization.giftOptions.occasion && (
                    <div className="text-[#7C8471]">{customization.giftOptions.occasion}</div>
                  )}
                </div>
              )}
            </div>
            
            <p className="text-center text-xs text-[#7C8471]">
              Ready for {recipient.name || 'your recipient'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

// Import at top of file
import { GIFT_SETS } from '@/types/giftbox'
import { Package, Gift } from 'lucide-react'
import { FONT_STYLES, FONT_SIZES } from '@/lib/fonts'