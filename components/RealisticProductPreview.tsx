'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { GiftBoxCustomization } from '@/types/giftbox'
import { FONT_STYLES } from '@/lib/fonts'
import CrestPNGMeasured from './CrestPNGMeasured'

interface RealisticProductPreviewProps {
  customization: GiftBoxCustomization
  activeStep: number
}

const PRODUCT_DESIGNS = {
  golfBall: '/products/ball-blank.png',
  divotTool: {
    silver: '/products/8.png',
    blank: '/products/9.png'
  },
  tees: {
    personalized: '/products/tees-personalized-hd.png',
    plain: '/products/12.png'
  }
}

export default function RealisticProductPreview({ customization, activeStep }: RealisticProductPreviewProps) {
  const { recipient, items, designStyle } = customization

  const getActiveProduct = () => {
    switch (activeStep) {
      case 2: return 'crestPreview'
      case 3: return 'golfBalls'
      case 4: return 'golfTees'
      case 5: return 'golfTowel'
      case 6: return 'divotTool'
      case 7: return 'ballMarker'
      default: return null
    }
  }

  const activeProduct = getActiveProduct()

  return (
    <div className="w-full h-full bg-gradient-to-br from-[#FAF7F2] to-white rounded-lg p-8">
      {/* Crest Preview */}
      {activeProduct === 'crestPreview' && (
        <div className="h-full flex flex-col items-center justify-center space-y-6">
          <div className="text-center mb-4">
            <h4 className="text-sm uppercase tracking-wider text-[#7C8471] mb-2">Selected Crest Style</h4>
            <p className="text-xs text-[#7C8471]">
              {customization.crestStyle === 'heritage' && 'Heritage Crest'}
              {customization.crestStyle === 'royal' && 'Royal Crest'}
              {customization.crestStyle === 'classic' && 'Classic Crest'}
              {customization.crestStyle === 'modern' && 'Modern Crest'}
            </p>
          </div>

          <div className="flex items-center justify-center">
            <CrestPNGMeasured 
              size={250}
              initials={recipient.initials || 'ABC'}
              firstName={recipient.name?.split(' ')[0] || ''}
              lastName={recipient.name?.split(' ').slice(1).join(' ') || ''}
              customText={customization.crestCustomText || ''}
              textType={customization.crestTextType || 'initials'}
              fontType={customization.crestFont || 'serif'}
              textSize={customization.crestTextSize || 100}
              crestType="crest-1-no-name"
            />
          </div>

          <p className="text-xs text-[#7C8471] text-center max-w-xs">
            This crest will be available for personalization on individual items
          </p>
        </div>
      )}

      {/* Golf Balls Preview */}
      {activeProduct === 'golfBalls' && items.golfBalls.included && (
        <div className="h-full flex flex-col items-center justify-center space-y-6">
          <div className="text-center mb-4">
            <h4 className="text-sm uppercase tracking-wider text-[#7C8471] mb-2">Preview</h4>
            <p className="text-xs text-[#7C8471]">
              {items.golfBalls.quantity} Golf Balls • {items.golfBalls.personalization.style === 'crest' ? 'Crest Design' : 'Custom Text'}
            </p>
          </div>

          {/* Product image */}
          <div className="relative w-64 h-64">
            {/* Base golf ball */}
            <Image
              src={PRODUCT_DESIGNS.golfBall}
              alt="Golf ball"
              fill
              className="object-contain"
            />
            
            {/* Overlay design based on user selection */}
            <div className="absolute inset-0 flex items-center justify-center">
              {items.golfBalls.personalization.style === 'crest' ? (
                <CrestPNGMeasured 
                  size={150 * ((items.golfBalls.personalization.crestSize || 100) / 100)}
                  initials={recipient.initials || 'ABC'}
                  firstName={recipient.name?.split(' ')[0] || ''}
                  lastName={recipient.name?.split(' ').slice(1).join(' ') || ''}
                  customText={customization.crestCustomText || ''}
                  textType={customization.crestTextType || 'initials'}
                  fontType={customization.crestFont || 'serif'}
                  textSize={customization.crestTextSize || 100}
                  crestType={customization.crestStyle ? `crest-${customization.crestStyle}-no-name` : 'crest-1-no-name'}
                />
              ) : (
                <div className="text-center flex flex-col items-center justify-center">
                  {/* Line 1 */}
                  <div 
                    className="text-black"
                    style={{
                      fontFamily: FONT_STYLES[items.golfBalls.personalization.line1?.font || 'classic']?.style?.fontFamily || 'serif',
                      fontWeight: (FONT_STYLES[items.golfBalls.personalization.line1?.font || 'classic']?.style as any)?.fontWeight || 'normal',
                      fontSize: `${items.golfBalls.personalization.line1?.size || 20}px`,
                      textTransform: items.golfBalls.personalization.line1?.textCase === 'uppercase' ? 'uppercase' : 
                                     items.golfBalls.personalization.line1?.textCase === 'capitalize' ? 'capitalize' : 
                                     'none'
                    }}
                  >
                    {items.golfBalls.personalization.line1?.type === 'fullName' ? recipient.name :
                     items.golfBalls.personalization.line1?.type === 'firstName' ? recipient.name?.split(' ')[0] :
                     items.golfBalls.personalization.line1?.type === 'lastName' ? recipient.name?.split(' ').slice(-1)[0] :
                     items.golfBalls.personalization.line1?.text || recipient.name || 'Your Name'}
                  </div>
                  
                  {/* Line 2 - if enabled */}
                  {items.golfBalls.personalization.lines === 2 && items.golfBalls.personalization.line2?.text && (
                    <div 
                      className="text-black mt-1"
                      style={{
                        fontFamily: FONT_STYLES[items.golfBalls.personalization.line2?.font || 'classic']?.style?.fontFamily || 'serif',
                        fontWeight: (FONT_STYLES[items.golfBalls.personalization.line2?.font || 'classic']?.style as any)?.fontWeight || 'normal',
                        fontSize: `${items.golfBalls.personalization.line2?.size || 14}px`,
                        textTransform: items.golfBalls.personalization.line2?.textCase === 'uppercase' ? 'uppercase' : 
                                       items.golfBalls.personalization.line2?.textCase === 'capitalize' ? 'capitalize' : 
                                       'none'
                      }}
                    >
                      {items.golfBalls.personalization.line2.text}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <p className="text-xs text-[#7C8471] text-center max-w-xs">
            Premium tour-quality golf balls with your personalization
          </p>
        </div>
      )}

      {/* Golf Tees Preview */}
      {activeProduct === 'golfTees' && items.golfTees.included && (
        <div className="h-full flex flex-col items-center justify-center space-y-6">
          <div className="text-center mb-4">
            <h4 className="text-sm uppercase tracking-wider text-[#7C8471] mb-2">Preview</h4>
            <p className="text-xs text-[#7C8471]">
              {items.golfTees.quantity} Natural Wood Tees
            </p>
          </div>

          <div className="relative w-96 h-64">
            <Image
              src={items.golfTees.personalization.text ? PRODUCT_DESIGNS.tees.personalized : PRODUCT_DESIGNS.tees.plain}
              alt="Golf tee"
              fill
              className="object-contain"
            />
            
            {/* Overlay text on tee */}
            {(items.golfTees.personalization.type === 'initials' || 
              items.golfTees.personalization.type === 'name' ||
              items.golfTees.personalization.text) && (
              <div 
                className="absolute flex items-center justify-center"
                style={{
                  top: '48%',  // Adjust vertical position
                  left: '53%',
                  transform: 'translate(-50%, -50%)',
                  width: '100%'
                }}
              >
                <div 
                  className="font-bold text-black/80 tracking-wider uppercase"
                  style={{
                    fontSize: `${items.golfTees.personalization.fontSize || 11}px`,  // Dynamic text size
                    letterSpacing: '0.15em'  // Letter spacing
                  }}
                >
                  {items.golfTees.personalization.type === 'initials' 
                    ? recipient.initials 
                    : items.golfTees.personalization.type === 'name'
                    ? recipient.name.toUpperCase()
                    : items.golfTees.personalization.text.toUpperCase()}
                </div>
              </div>
            )}
          </div>

          <p className="text-xs text-[#7C8471] text-center max-w-xs">
            Premium hardwood tees with laser engraving
          </p>
        </div>
      )}

      {/* Divot Tool Preview */}
      {activeProduct === 'divotTool' && items.divotTool.included && (
        <div className="h-full flex flex-col items-center justify-center space-y-6">
          <div className="text-center mb-4">
            <h4 className="text-sm uppercase tracking-wider text-[#7C8471] mb-2">Preview</h4>
            <p className="text-xs text-[#7C8471]">
              Silver Finish Divot Tool with Crest
            </p>
          </div>

          <div className="relative w-full h-96">
            <Image
              src="/crest-background.png"
              alt="Divot tool"
              fill
              className="object-contain"
            />
            
            {/* Overlay crest on medallion - Adjust top value to move up/down */}
            <div 
              className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
              style={{ top: '36%', left: '49.75%' }}>
              <CrestPNGMeasured 
                size={90 * ((items.divotTool.personalization.crestSize || 100) / 100)}
                initials={recipient.initials || 'ABC'}
                firstName={recipient.name?.split(' ')[0] || ''}
                lastName={recipient.name?.split(' ').slice(1).join(' ') || ''}
                customText={customization.crestCustomText || ''}
                textType={customization.crestTextType || 'initials'}
                fontType={customization.crestFont || 'serif'}
                textSize={customization.crestTextSize || 100}
                crestType={customization.crestStyle ? `crest-${customization.crestStyle}-no-name` : 'crest-1-no-name'}
              />
            </div>
          </div>

          <p className="text-xs text-[#7C8471] text-center max-w-xs">
            Premium silver divot tool with magnetic ball marker
          </p>
        </div>
      )}

      {/* Ball Marker Preview */}
      {activeProduct === 'ballMarker' && items.ballMarker.included && (
        <div className="h-full flex flex-col items-center justify-center space-y-6">
          <div className="text-center mb-4">
            <h4 className="text-sm uppercase tracking-wider text-[#7C8471] mb-2">Preview</h4>
            <p className="text-xs text-[#7C8471]">
              Magnetic Ball Marker with Crest
            </p>
          </div>

          <div className="relative w-64 h-64">
            <Image
              src="/ball-marker.png"
              alt="Ball marker"
              fill
              className="object-contain"
            />
            
            {/* Overlay crest on ball marker center */}
            <div 
              className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
              style={{ top: '47%', left: '61.5%' }}>
              <CrestPNGMeasured 
                size={154 * ((items.ballMarker.personalization.crestSize || 100) / 100)}
                initials={recipient.initials || 'ABC'}
                firstName={recipient.name?.split(' ')[0] || ''}
                lastName={recipient.name?.split(' ').slice(1).join(' ') || ''}
                customText={customization.crestCustomText || ''}
                textType={customization.crestTextType || 'initials'}
                fontType={customization.crestFont || 'serif'}
                textSize={customization.crestTextSize || 100}
                crestType={customization.crestStyle ? `crest-${customization.crestStyle}-no-name` : 'crest-1-no-name'}
              />
            </div>
          </div>

          <p className="text-xs text-[#7C8471] text-center max-w-xs">
            Premium magnetic ball marker that attaches to divot tool
          </p>
        </div>
      )}

      {/* Golf Towel Preview */}
      {activeProduct === 'golfTowel' && items.golfTowel.included && (
        <div className="h-full flex flex-col items-center justify-center space-y-6">
          <div className="text-center mb-4">
            <h4 className="text-sm uppercase tracking-wider text-[#7C8471] mb-2">Preview</h4>
            <p className="text-xs text-[#7C8471]">
              {items.golfTowel.color === 'navy' ? 'Navy' : items.golfTowel.color === 'black' ? 'Black' : items.golfTowel.color === 'red' ? 'Red' : 'Navy'} Golf Towel
            </p>
          </div>

          <div className="relative">
            <div 
              className="w-56 h-40 rounded shadow-lg relative overflow-hidden"
              style={{
                backgroundColor: items.golfTowel.color === 'navy' ? '#1e3a5f' 
                  : items.golfTowel.color === 'black' ? '#000000'
                  : items.golfTowel.color === 'red' ? '#8B0000' 
                  : '#1e3a5f',
                border: '1px solid rgba(0,0,0,0.1)'
              }}
            >
              {/* Texture */}
              <div className="absolute inset-0 opacity-20">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="h-px bg-black/10"
                    style={{ marginTop: `${i * 3.5}px` }}
                  />
                ))}
              </div>
              
              {/* Embroidery - Always in bottom-right corner, always white */}
              <div className="absolute bottom-4 right-4">
                <div 
                  className="font-bold"
                  style={{
                    color: '#FFFFFF',
                    fontSize: `${items.golfTowel.personalization.fontSize || 24}px`,
                    ...FONT_STYLES[items.golfTowel.personalization.fontFamily || 'elegant'].style
                  }}
                >
                  {items.golfTowel.personalization.type === 'initials' 
                    ? recipient.initials
                    : recipient.name}
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-[#7C8471] text-center max-w-xs">
            Premium microfiber golf towel with custom embroidery
          </p>
        </div>
      )}
    </div>
  )
}