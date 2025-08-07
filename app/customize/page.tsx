'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Check, User, Package, Gift, Plus, Minus } from 'lucide-react'
import { GIFT_SETS, OCCASIONS, RELATIONSHIPS, GiftBoxCustomization } from '@/types/giftbox'
import { FONT_STYLES, FONT_SIZES } from '@/lib/fonts'
import { CREST_FONTS } from '@/lib/crest-fonts'
// import ProductPreview from '@/components/ProductPreview'
import RealisticProductPreview from '@/components/RealisticProductPreview'
import CrestPNGMeasured from '@/components/CrestPNGMeasured'

function CustomizeContent() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  
  const initialSet = (searchParams.get('set') as 'executive' | 'signature') || 'signature'
  
  const [customization, setCustomization] = useState<GiftBoxCustomization>({
    recipient: {
      name: 'Callum Mundine',
      initials: 'CM',
      relationship: ''
    },
    set: initialSet,
    designStyle: 'crest',
    crestStyle: 'heritage',
    crestTextType: 'initials',
    crestCustomText: '',
    crestFont: 'serif',
    crestTextSize: 100,
    items: {
      golfBalls: {
        included: true,
        quantity: GIFT_SETS[initialSet].golfBallQuantity as 6 | 12 | 24,
        personalization: {
          style: 'crest',
          crestSize: 100,
          lines: 1,
          line1: {
            type: 'fullName',
            text: '',
            font: 'classic',
            size: 20,
            textCase: 'capitalize'
          },
          line2: {
            text: 'Signature Series',
            font: 'classic',
            size: 14,
            textCase: 'capitalize'
          }
        }
      },
      golfTees: {
        included: true,
        quantity: GIFT_SETS[initialSet].golfTeeQuantity as 25 | 50 | 100,
        color: 'natural',
        personalization: {
          type: 'name',
          text: '',
          fontSize: 8,
          maxCharacters: 12
        }
      },
      golfTowel: {
        included: true,
        color: 'navy',
        personalization: {
          type: 'initials',
          text: '',
          position: 'corner',
          fontSize: 20, // Medium size for initials
          fontFamily: 'elegant'
        }
      },
      divotTool: {
        included: true,
        finish: 'silver',
        personalization: {
          crestSize: 100
        }
      },
      ballMarker: {
        included: false,
        personalization: {
          crestSize: 100
        }
      }
    },
    giftOptions: {
      includeCard: false,
      giftWrap: true
    },
    quantity: 1
  })

  // Auto-generate initials from recipient name
  useEffect(() => {
    const names = customization.recipient.name.trim().split(' ')
    const initials = names
      .map(n => n[0]?.toUpperCase() || '')
      .join('')
      .slice(0, 3)
    
    setCustomization(prev => ({
      ...prev,
      recipient: {
        ...prev.recipient,
        initials
      },
      // Auto-fill initials for items
      items: {
        ...prev.items,
        golfBalls: {
          ...prev.items.golfBalls,
          personalization: {
            ...prev.items.golfBalls.personalization
          }
        },
        golfTowel: {
          ...prev.items.golfTowel,
          personalization: {
            ...prev.items.golfTowel.personalization,
            text: prev.items.golfTowel.personalization.type === 'initials' ? initials : prev.items.golfTowel.personalization.text
          }
        },
        divotTool: {
          ...prev.items.divotTool,
          personalization: {
            ...prev.items.divotTool.personalization
          }
        }
      }
    }))
  }, [customization.recipient.name])

  // Update quantities when set changes
  useEffect(() => {
    setCustomization(prev => ({
      ...prev,
      items: {
        ...prev.items,
        golfBalls: {
          ...prev.items.golfBalls,
          quantity: GIFT_SETS[prev.set].golfBallQuantity as 6 | 12 | 24
        },
        golfTees: {
          ...prev.items.golfTees,
          quantity: GIFT_SETS[prev.set].golfTeeQuantity as 25 | 50 | 100
        }
      }
    }))
  }, [customization.set])

  // Update included items based on selected set
  useEffect(() => {
    const selectedSet = GIFT_SETS[customization.set]
    if (selectedSet) {
      setCustomization(prev => ({
        ...prev,
        items: {
          ...prev.items,
          golfBalls: { ...prev.items.golfBalls, included: selectedSet.includes.golfBalls },
          golfTees: { ...prev.items.golfTees, included: selectedSet.includes.golfTees },
          golfTowel: { ...prev.items.golfTowel, included: selectedSet.includes.golfTowel },
          divotTool: { ...prev.items.divotTool, included: selectedSet.includes.divotTool },
          ballMarker: { ...prev.items.ballMarker, included: selectedSet.includes.ballMarker }
        }
      }))
    }
  }, [customization.set])

  const selectedSet = GIFT_SETS[customization.set]
  const basePrice = selectedSet.price
  const total = basePrice * customization.quantity

  const steps = [
    'Gift Set',
    'Recipient',
    'Crest Setup',
    'Golf Balls',
    'Golf Tees', 
    'Golf Towel',
    'Divot Tool',
    'Ball Marker'
  ]

  // Helper function to check if a step should be shown
  const isStepAvailable = (stepIndex: number): boolean => {
    switch (stepIndex) {
      case 0: // Gift Set
      case 1: // Recipient
      case 2: // Crest Setup
        return true
      case 3: // Golf Balls
        return customization.items.golfBalls.included
      case 4: // Golf Tees
        return customization.items.golfTees.included
      case 5: // Golf Towel
        return customization.items.golfTowel.included
      case 6: // Divot Tool
        return customization.items.divotTool.included
      case 7: // Ball Marker
        return customization.items.ballMarker.included
      default:
        return false
    }
  }

  // Navigate to next available step
  const goToNextStep = () => {
    let nextStep = activeStep + 1
    while (nextStep < steps.length && !isStepAvailable(nextStep)) {
      nextStep++
    }
    if (nextStep < steps.length) {
      setActiveStep(nextStep)
    }
  }

  // Navigate to previous available step
  const goToPreviousStep = () => {
    let prevStep = activeStep - 1
    while (prevStep >= 0 && !isStepAvailable(prevStep)) {
      prevStep--
    }
    if (prevStep >= 0) {
      setActiveStep(prevStep)
    }
  }

  const handleCheckout = async () => {
    if (!customization.recipient.name) {
      alert('Please enter the recipient\'s name')
      return
    }

    setLoading(true)
    try {
      const designResponse = await fetch('/api/designs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ design: customization })
      })
      const { id: designId } = await designResponse.json()

      const checkoutResponse = await fetch('/api/checkout/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          designId,
          customerEmail: 'customer@example.com',
          items: customization,
          amount: total, // Already in dollars
          setName: GIFT_SETS[customization.set].name
        })
      })
      const { checkoutUrl } = await checkoutResponse.json()
      
      window.location.href = checkoutUrl
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-[#E8DCC4]/30 bg-[#FAF7F2]/95">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 text-[#7C8471] hover:text-[#2F3E2E] transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm uppercase tracking-wider">Back</span>
            </Link>
            
            <Image 
              src="/custom-caddie-logo.png" 
              alt="Custom Caddie" 
              width={180} 
              height={60} 
              className="object-contain"
            />
            
            <div className="text-right">
              <div className="text-sm text-[#7C8471]">Total</div>
              <div className="text-lg font-semibold">${total}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Step Indicator */}
      <div className="relative border-b border-[#E8DCC4]/30">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="max-w-7xl mx-auto px-6 lg:px-6 py-4">
            <div className="flex gap-4 lg:gap-8 min-w-max">
            {steps.map((step, index) => {
              const isAvailable = isStepAvailable(index)
              if (!isAvailable) return null // Don't render unavailable steps
              
              // Calculate the display number (sequential for visible steps)
              let displayNumber = 1
              for (let i = 0; i < index; i++) {
                if (isStepAvailable(i)) displayNumber++
              }
              
              return (
                <button
                  key={step}
                  onClick={() => setActiveStep(index)}
                  className={`text-xs uppercase tracking-wider whitespace-nowrap transition-all ${
                    activeStep === index 
                      ? 'text-[#2c5c4f] font-semibold' 
                      : activeStep > index 
                      ? 'text-[#7C8471]' 
                      : 'text-[#7C8471]/40'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                      activeStep === index 
                        ? 'border-[#2c5c4f] bg-[#2c5c4f] text-white' 
                        : activeStep > index
                        ? 'border-[#7C8471] bg-[#7C8471] text-white'
                        : 'border-[#E8DCC4]/50'
                    }`}>
                      {activeStep > index ? <Check className="w-4 h-4" /> : displayNumber}
                    </div>
                    <span>{step}</span>
                  </div>
                </button>
              )
            })}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left: Customization Options */}
          <div className="lg:col-span-2 min-w-0">
            
            {/* Step 0: Gift Set Selection */}
            {activeStep === 0 && (
              <div className="space-y-8 fade-in">
                <div>
                  <h2 className="text-3xl font-serif mb-2">Choose Your Gift Set</h2>
                  <p className="text-[#7C8471]">Select the perfect collection for your recipient</p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {Object.entries(GIFT_SETS).map(([key, set]) => (
                    <button
                      key={key}
                      onClick={() => setCustomization(prev => ({ ...prev, set: key as any }))}
                      className={`text-left p-6 border transition-all duration-300 ${
                        customization.set === key 
                          ? 'border-[#2c5c4f] bg-[#2c5c4f]/5 shadow-lg' 
                          : 'border-[#E8DCC4]/30 bg-white hover:border-[#C9A961]/50'
                      }`}
                    >
                      <h3 className="text-xl font-serif mb-2">{set.name}</h3>
                      <p className="text-2xl font-semibold text-[#C9A961] mb-3">${set.price}</p>
                      <p className="text-sm text-[#7C8471] mb-4">{set.description}</p>
                      <div className="space-y-1 text-xs">
                        {set.includes.golfBalls && <div className="flex items-center gap-2"><Check className="w-3 h-3 text-[#2c5c4f]" /> {set.golfBallQuantity} Premium Golf Balls</div>}
                        {set.includes.golfTees && <div className="flex items-center gap-2"><Check className="w-3 h-3 text-[#2c5c4f]" /> Golf Tees</div>}
                        {set.includes.golfTowel && <div className="flex items-center gap-2"><Check className="w-3 h-3 text-[#2c5c4f]" /> Golf Towel</div>}
                        {set.includes.divotTool && <div className="flex items-center gap-2"><Check className="w-3 h-3 text-[#2c5c4f]" /> Divot Tool</div>}
                        {set.includes.ballMarker && <div className="flex items-center gap-2"><Check className="w-3 h-3 text-[#2c5c4f]" /> Ball Marker</div>}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1: Recipient Information */}
            {activeStep === 1 && (
              <div className="space-y-8 fade-in">
                <div>
                  <h2 className="text-3xl font-serif mb-2">Who is this gift for?</h2>
                  <p className="text-[#7C8471]">Tell us about the lucky recipient</p>
                </div>

                <div className="bg-[#E8DCC4]/10 border border-[#E8DCC4]/30 p-6 rounded">
                  <p className="text-sm text-[#7C8471] mb-4">
                    This information will be used to personalize all items in the gift box
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm uppercase tracking-wider text-[#7C8471] block mb-3">
                        Recipient's Full Name *
                      </label>
                      <input
                        type="text"
                        value={customization.recipient.name}
                        onChange={(e) => setCustomization(prev => ({
                          ...prev,
                          recipient: {
                            ...prev.recipient,
                            name: e.target.value
                          }
                        }))}
                        placeholder="e.g., John Smith"
                        className="input-minimal"
                      />
                      <p className="text-xs text-[#7C8471] mt-2">
                        The name that will appear on personalized items
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm uppercase tracking-wider text-[#7C8471] block mb-3">
                          Their Initials
                        </label>
                        <div className="text-3xl font-serif text-[#2F3E2E] py-2">
                          {customization.recipient.initials || '—'}
                        </div>
                        <p className="text-xs text-[#7C8471] mt-1">Auto-generated from name</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Crest Configuration */}
            {activeStep === 2 && (
              <div className="space-y-8 fade-in">
                <div>
                  <h2 className="text-3xl font-serif mb-2">Customize Your Crest</h2>
                  <p className="text-[#7C8471]">Choose your crest style and personalization</p>
                </div>

                {/* Mobile Sticky Preview - Shows selected crest when scrolling */}
                <div className="lg:hidden sticky top-0 bg-[#FAF7F2] border-b border-[#E8DCC4]/30 py-1 -mx-6 px-6 mb-6 z-40">
                  <div className="flex items-center justify-center">
                    <CrestPNGMeasured 
                      size={180}
                      initials={customization.recipient.initials || 'ABC'}
                      firstName={customization.recipient.name?.split(' ')[0] || ''}
                      lastName={customization.recipient.name?.split(' ').slice(1).join(' ') || ''}
                      customText={customization.crestCustomText || ''}
                      textType={customization.crestTextType || 'initials'}
                      fontType={customization.crestFont || 'serif'}
                      textSize={customization.crestTextSize || 100}
                      crestType="crest-1-no-name"
                    />
                  </div>
                </div>

                {/* Crest Style Selection */}
                <div className="border-b border-[#E8DCC4]/30 pb-8">
                  <h3 className="text-sm uppercase tracking-wider text-[#7C8471] mb-6">Step 1: Choose Your Crest Style</h3>
                  <div className="space-y-2">
                    {/* Heritage Crest */}
                    <button
                      onClick={() => setCustomization(prev => ({ ...prev, crestStyle: 'heritage' }))}
                      className={`relative w-full p-1 border-2 rounded-lg transition-all hover:shadow-lg ${
                        customization.crestStyle === 'heritage'
                          ? 'border-[#2c5c4f] bg-[#2c5c4f]/5'
                          : 'border-[#E8DCC4]/30 bg-white hover:border-[#2c5c4f]/50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex-shrink-0">
                          <CrestPNGMeasured 
                            size={150}
                            initials={customization.recipient.initials || 'ABC'}
                            firstName={customization.recipient.name?.split(' ')[0] || ''}
                            lastName={customization.recipient.name?.split(' ').slice(1).join(' ') || ''}
                            customText={customization.crestCustomText || ''}
                            textType={customization.crestTextType || 'initials'}
                            fontType={customization.crestFont || 'serif'}
                            textSize={customization.crestTextSize || 100}
                            crestType="crest-1-no-name"
                          />
                        </div>
                        <div className="flex-1 text-left">
                          <h4 className="font-serif text-2xl mb-2">Heritage</h4>
                          <p className="text-sm text-[#7C8471]">Classic golf crest with traditional elements. Perfect for the distinguished golfer who appreciates timeless elegance.</p>
                        </div>
                        {customization.crestStyle === 'heritage' && (
                          <div className="flex-shrink-0 mr-2">
                            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                    </button>

                    {/* Royal Crest */}
                    <button
                      onClick={() => setCustomization(prev => ({ ...prev, crestStyle: 'royal' }))}
                      className={`relative w-full p-1 border-2 rounded-lg transition-all hover:shadow-lg ${
                        customization.crestStyle === 'royal'
                          ? 'border-[#2c5c4f] bg-[#2c5c4f]/5'
                          : 'border-[#E8DCC4]/30 bg-white hover:border-[#2c5c4f]/50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex-shrink-0">
                          <CrestPNGMeasured 
                            size={150}
                            initials={customization.recipient.initials || 'ABC'}
                            firstName={customization.recipient.name?.split(' ')[0] || ''}
                            lastName={customization.recipient.name?.split(' ').slice(1).join(' ') || ''}
                            customText={customization.crestCustomText || ''}
                            textType={customization.crestTextType || 'initials'}
                            fontType={customization.crestFont || 'serif'}
                            textSize={customization.crestTextSize || 100}
                            crestType="crest-1-no-name"
                          />
                        </div>
                        <div className="flex-1 text-left">
                          <h4 className="font-serif text-2xl mb-2">Royal</h4>
                          <p className="text-sm text-[#7C8471]">Regal emblem design with crown elements. Ideal for those who command respect on and off the course.</p>
                        </div>
                        {customization.crestStyle === 'royal' && (
                          <div className="flex-shrink-0 mr-2">
                            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                    </button>

                    {/* Classic Crest */}
                    <button
                      onClick={() => setCustomization(prev => ({ ...prev, crestStyle: 'classic' }))}
                      className={`relative w-full p-1 border-2 rounded-lg transition-all hover:shadow-lg ${
                        customization.crestStyle === 'classic'
                          ? 'border-[#2c5c4f] bg-[#2c5c4f]/5'
                          : 'border-[#E8DCC4]/30 bg-white hover:border-[#2c5c4f]/50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex-shrink-0">
                          <CrestPNGMeasured 
                            size={150}
                            initials={customization.recipient.initials || 'ABC'}
                            firstName={customization.recipient.name?.split(' ')[0] || ''}
                            lastName={customization.recipient.name?.split(' ').slice(1).join(' ') || ''}
                            customText={customization.crestCustomText || ''}
                            textType={customization.crestTextType || 'initials'}
                            fontType={customization.crestFont || 'serif'}
                            textSize={customization.crestTextSize || 100}
                            crestType="crest-1-no-name"
                          />
                        </div>
                        <div className="flex-1 text-left">
                          <h4 className="font-serif text-2xl mb-2">Classic</h4>
                          <p className="text-sm text-[#7C8471]">Traditional shield design with golf clubs and laurels. A timeless choice for the traditional golfer.</p>
                        </div>
                        {customization.crestStyle === 'classic' && (
                          <div className="flex-shrink-0 mr-2">
                            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                    </button>

                    {/* Modern Crest */}
                    <button
                      onClick={() => setCustomization(prev => ({ ...prev, crestStyle: 'modern' }))}
                      className={`relative w-full p-1 border-2 rounded-lg transition-all hover:shadow-lg ${
                        customization.crestStyle === 'modern'
                          ? 'border-[#2c5c4f] bg-[#2c5c4f]/5'
                          : 'border-[#E8DCC4]/30 bg-white hover:border-[#2c5c4f]/50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex-shrink-0">
                          <CrestPNGMeasured 
                            size={150}
                            initials={customization.recipient.initials || 'ABC'}
                            firstName={customization.recipient.name?.split(' ')[0] || ''}
                            lastName={customization.recipient.name?.split(' ').slice(1).join(' ') || ''}
                            customText={customization.crestCustomText || ''}
                            textType={customization.crestTextType || 'initials'}
                            fontType={customization.crestFont || 'serif'}
                            textSize={customization.crestTextSize || 100}
                            crestType="crest-1-no-name"
                          />
                        </div>
                        <div className="flex-1 text-left">
                          <h4 className="font-serif text-2xl mb-2">Modern</h4>
                          <p className="text-sm text-[#7C8471]">Contemporary minimalist design with clean lines. Perfect for the modern golfer with sophisticated taste.</p>
                        </div>
                        {customization.crestStyle === 'modern' && (
                          <div className="flex-shrink-0 mr-2">
                            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                    </button>
                  </div>
                </div>

                {/* Text Type Selection */}
                <div className="p-6 bg-[#E8DCC4]/10 border border-[#E8DCC4]/30 rounded-lg mt-8">
                  <h3 className="text-sm uppercase tracking-wider text-[#7C8471] mb-4">Step 2: Customize Your Text</h3>
                  <h4 className="text-lg font-serif mb-4">What to Display on the Crest</h4>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                    {(['initials', 'firstName', 'lastName', 'custom'] as const).map(type => (
                      <button
                        key={type}
                        onClick={() => setCustomization(prev => ({
                          ...prev,
                          crestTextType: type,
                          crestCustomText: type === 'custom' ? prev.crestCustomText || '' : undefined
                        }))}
                        className={`py-3 px-4 border transition-all ${
                          customization.crestTextType === type
                            ? 'border-[#2c5c4f] bg-[#2c5c4f]/10'
                            : 'border-[#E8DCC4]/30 bg-white hover:border-[#2c5c4f]/50'
                        }`}
                      >
                        {type === 'initials' && 'Initials'}
                        {type === 'firstName' && 'First Name'}
                        {type === 'lastName' && 'Last Name'}
                        {type === 'custom' && 'Custom Text'}
                      </button>
                    ))}
                  </div>
                  
                  {customization.crestTextType === 'custom' && (
                    <input
                      type="text"
                      value={customization.crestCustomText || ''}
                      onChange={(e) => setCustomization(prev => ({
                        ...prev,
                        crestCustomText: e.target.value
                      }))}
                      placeholder="Enter custom text (max 10 characters)"
                      maxLength={10}
                      className="input-minimal w-full"
                    />
                  )}
                  
                  <div className="mt-4 text-sm text-[#7C8471]">
                    Preview: <span className="font-semibold text-[#2F3E2E]">
                      {customization.crestTextType === 'initials' && (customization.recipient.initials || 'ABC')}
                      {customization.crestTextType === 'firstName' && (customization.recipient.name.split(' ')[0] || 'First')}
                      {customization.crestTextType === 'lastName' && (customization.recipient.name.split(' ').slice(-1)[0] || 'Last')}
                      {customization.crestTextType === 'custom' && (customization.crestCustomText || 'Custom')}
                    </span>
                  </div>

                  {/* Text Size Control */}
                  <div className="mt-4 pt-4 border-t border-[#E8DCC4]/30">
                    <label className="text-xs uppercase tracking-wider text-[#7C8471] block mb-2">
                      Text Size
                    </label>
                    <div className="flex items-center justify-center gap-4">
                      <button
                        onClick={() => setCustomization(prev => ({
                          ...prev,
                          crestTextSize: Math.max(50, (prev.crestTextSize || 100) - 5)
                        }))}
                        className="p-2 border border-[#E8DCC4]/30 bg-white hover:border-[#2c5c4f]/50 rounded transition-all"
                      >
                        <Minus className="w-4 h-4 text-[#2c5c4f]" />
                      </button>
                      <span className="text-sm font-semibold min-w-[3rem] text-center">
                        {customization.crestTextSize || 100}%
                      </span>
                      <button
                        onClick={() => setCustomization(prev => ({
                          ...prev,
                          crestTextSize: Math.min(150, (prev.crestTextSize || 100) + 5)
                        }))}
                        className="p-2 border border-[#E8DCC4]/30 bg-white hover:border-[#2c5c4f]/50 rounded transition-all"
                      >
                        <Plus className="w-4 h-4 text-[#2c5c4f]" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Font Selection */}
                <div className="p-6 bg-[#E8DCC4]/10 border border-[#E8DCC4]/30 rounded-lg mt-6">
                  <h4 className="text-lg font-serif mb-4">Select Font Style</h4>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                    {(Object.keys(CREST_FONTS) as Array<keyof typeof CREST_FONTS>).map(fontKey => (
                      <button
                        key={fontKey}
                        onClick={() => setCustomization(prev => ({
                          ...prev,
                          crestFont: fontKey as 'serif' | 'sans' | 'script' | 'gothic' | 'modern'
                        }))}
                        className={`py-4 px-4 border transition-all ${
                          customization.crestFont === fontKey
                            ? 'border-[#2c5c4f] bg-[#2c5c4f]/10'
                            : 'border-[#E8DCC4]/30 bg-white hover:border-[#2c5c4f]/50'
                        }`}
                      >
                        <div className="text-center">
                          <div 
                            className="text-lg mb-1"
                            style={{
                              fontFamily: CREST_FONTS[fontKey].family,
                              fontWeight: CREST_FONTS[fontKey].weight,
                              fontStyle: CREST_FONTS[fontKey].style || 'normal',
                              letterSpacing: CREST_FONTS[fontKey].letterSpacing
                            }}
                          >
                            ABC
                          </div>
                          <div className="text-xs text-[#7C8471]">
                            {CREST_FONTS[fontKey].name}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Golf Balls */}
            {activeStep === 3 && customization.items.golfBalls.included && (
              <div className="space-y-8 fade-in">
                <div>
                  <h2 className="text-3xl font-serif mb-2">Customize Golf Balls</h2>
                  <p className="text-[#7C8471]">Premium golf balls personalized for {customization.recipient.name || 'the recipient'}</p>
                </div>

                {/* Mobile Sticky Preview - Shows golf ball with current customization */}
                <div className="lg:hidden sticky top-0 bg-[#FAF7F2] border-b border-[#E8DCC4]/30 py-3 -mx-6 px-6 mb-6 z-40">
                  <div className="flex items-center justify-center">
                    <div className="relative w-48 h-48">
                      <Image
                        src="/products/ball-blank.png"
                        alt="Golf ball"
                        fill
                        className="object-contain"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        {customization.items.golfBalls.personalization.style === 'crest' ? (
                          <CrestPNGMeasured 
                            size={150 * ((customization.items.golfBalls.personalization.crestSize || 100) / 100) * 0.75}
                            initials={customization.recipient.initials || 'ABC'}
                            firstName={customization.recipient.name?.split(' ')[0] || ''}
                            lastName={customization.recipient.name?.split(' ').slice(1).join(' ') || ''}
                            customText={customization.crestCustomText || ''}
                            textType={customization.crestTextType || 'initials'}
                            fontType={customization.crestFont || 'serif'}
                            textSize={customization.crestTextSize || 100}
                            crestType="crest-1-no-name"
                          />
                        ) : (
                          <div className="text-center flex flex-col items-center justify-center">
                            <div 
                              className="text-black"
                              style={{
                                fontFamily: FONT_STYLES[customization.items.golfBalls.personalization.line1?.font || 'classic']?.style?.fontFamily || 'serif',
                                fontWeight: (FONT_STYLES[customization.items.golfBalls.personalization.line1?.font || 'classic']?.style as any)?.fontWeight || 'normal',
                                fontSize: `${(customization.items.golfBalls.personalization.line1?.size || 20) * 0.9}px`,
                                textTransform: customization.items.golfBalls.personalization.line1?.textCase === 'uppercase' ? 'uppercase' : 
                                               customization.items.golfBalls.personalization.line1?.textCase === 'capitalize' ? 'capitalize' : 
                                               'none'
                              }}
                            >
                              {customization.items.golfBalls.personalization.line1?.type === 'fullName' ? customization.recipient.name :
                               customization.items.golfBalls.personalization.line1?.type === 'firstName' ? customization.recipient.name?.split(' ')[0] :
                               customization.items.golfBalls.personalization.line1?.type === 'lastName' ? customization.recipient.name?.split(' ').slice(-1)[0] :
                               customization.items.golfBalls.personalization.line1?.text || customization.recipient.name || 'Your Name'}
                            </div>
                            {customization.items.golfBalls.personalization.lines === 2 && customization.items.golfBalls.personalization.line2?.text && (
                              <div 
                                className="text-black mt-1"
                                style={{
                                  fontFamily: FONT_STYLES[customization.items.golfBalls.personalization.line2?.font || 'classic']?.style?.fontFamily || 'serif',
                                  fontWeight: (FONT_STYLES[customization.items.golfBalls.personalization.line2?.font || 'classic']?.style as any)?.fontWeight || 'normal',
                                  fontSize: `${(customization.items.golfBalls.personalization.line2?.size || 14) * 0.9}px`,
                                  textTransform: customization.items.golfBalls.personalization.line2?.textCase === 'uppercase' ? 'uppercase' : 
                                                 customization.items.golfBalls.personalization.line2?.textCase === 'capitalize' ? 'capitalize' : 
                                                 'none'
                                }}
                              >
                                {customization.items.golfBalls.personalization.line2.text}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-[#E8DCC4]/10 border border-[#E8DCC4]/30 p-4 rounded">
                    <p className="text-sm text-[#2F3E2E]">
                      <span className="font-semibold">{GIFT_SETS[customization.set].name}</span> includes{' '}
                      <span className="font-semibold text-[#2c5c4f]">{customization.items.golfBalls.quantity} premium golf balls</span>
                    </p>
                  </div>

                  {/* Style Choice: Crest or Text */}
                  <div>
                    <label className="text-sm uppercase tracking-wider text-[#7C8471] block mb-3">
                      Personalization Style
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setCustomization(prev => ({
                          ...prev,
                          items: {
                            ...prev.items,
                            golfBalls: {
                              ...prev.items.golfBalls,
                              personalization: {
                                ...prev.items.golfBalls.personalization,
                                style: 'crest'
                              }
                            }
                          }
                        }))}
                        className={`py-4 px-4 border transition-all ${
                          customization.items.golfBalls.personalization.style === 'crest'
                            ? 'border-[#2c5c4f] bg-[#2c5c4f]/10'
                            : 'border-[#E8DCC4]/30 bg-white hover:border-[#2c5c4f]/50'
                        }`}
                      >
                        <div className="text-center">
                          <div className="font-semibold">Use My Crest</div>
                          <div className="text-xs text-[#7C8471] mt-1">Display your custom crest design</div>
                        </div>
                      </button>
                      
                      <button
                        onClick={() => setCustomization(prev => ({
                          ...prev,
                          items: {
                            ...prev.items,
                            golfBalls: {
                              ...prev.items.golfBalls,
                              personalization: {
                                ...prev.items.golfBalls.personalization,
                                style: 'text'
                              }
                            }
                          }
                        }))}
                        className={`py-4 px-4 border transition-all ${
                          customization.items.golfBalls.personalization.style === 'text'
                            ? 'border-[#2c5c4f] bg-[#2c5c4f]/10'
                            : 'border-[#E8DCC4]/30 bg-white hover:border-[#2c5c4f]/50'
                        }`}
                      >
                        <div className="text-center">
                          <div className="font-semibold">Custom Text</div>
                          <div className="text-xs text-[#7C8471] mt-1">Add personalized text (1-2 lines)</div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Crest Size Option */}
                  {customization.items.golfBalls.personalization.style === 'crest' && (
                    <div>
                      <label className="text-sm uppercase tracking-wider text-[#7C8471] block mb-3">
                        Crest Size on Ball
                      </label>
                      <div className="flex items-center justify-center gap-4">
                        <button
                          onClick={() => setCustomization(prev => ({
                            ...prev,
                            items: {
                              ...prev.items,
                              golfBalls: {
                                ...prev.items.golfBalls,
                                personalization: {
                                  ...prev.items.golfBalls.personalization,
                                  crestSize: Math.max(50, (prev.items.golfBalls.personalization.crestSize || 100) - 5)
                                }
                              }
                            }
                          }))}
                          className="p-2 border border-[#E8DCC4]/30 bg-white hover:border-[#2c5c4f]/50 rounded transition-all"
                        >
                          <Minus className="w-4 h-4 text-[#2c5c4f]" />
                        </button>
                        <span className="text-sm font-semibold min-w-[3rem] text-center">
                          {customization.items.golfBalls.personalization.crestSize || 100}%
                        </span>
                        <button
                          onClick={() => setCustomization(prev => ({
                            ...prev,
                            items: {
                              ...prev.items,
                              golfBalls: {
                                ...prev.items.golfBalls,
                                personalization: {
                                  ...prev.items.golfBalls.personalization,
                                  crestSize: Math.min(150, (prev.items.golfBalls.personalization.crestSize || 100) + 5)
                                }
                              }
                            }
                          }))}
                          className="p-2 border border-[#E8DCC4]/30 bg-white hover:border-[#2c5c4f]/50 rounded transition-all"
                        >
                          <Plus className="w-4 h-4 text-[#2c5c4f]" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Text Options */}
                  {customization.items.golfBalls.personalization.style === 'text' && (
                    <>
                      {/* Number of Lines */}
                      <div>
                        <label className="text-sm uppercase tracking-wider text-[#7C8471] block mb-3">
                          Number of Lines
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {([1, 2] as const).map(lines => (
                            <button
                              key={lines}
                              onClick={() => setCustomization(prev => ({
                                ...prev,
                                items: {
                                  ...prev.items,
                                  golfBalls: {
                                    ...prev.items.golfBalls,
                                    personalization: {
                                      ...prev.items.golfBalls.personalization,
                                      lines
                                    }
                                  }
                                }
                              }))}
                              className={`py-3 px-4 border transition-all ${
                                customization.items.golfBalls.personalization.lines === lines
                                  ? 'border-[#2c5c4f] bg-[#2c5c4f]/10'
                                  : 'border-[#E8DCC4]/30 bg-white hover:border-[#2c5c4f]/50'
                              }`}
                            >
                              {lines === 1 ? 'Single Line' : 'Two Lines'}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Line 1 Options */}
                      <div className="p-6 bg-[#E8DCC4]/10 border border-[#E8DCC4]/30 rounded-lg">
                        <h4 className="text-sm font-semibold mb-4">Line 1</h4>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="text-xs uppercase tracking-wider text-[#7C8471] block mb-2">
                              Text Type
                            </label>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                              {(['fullName', 'firstName', 'lastName', 'custom'] as const).map(type => (
                                <button
                                  key={type}
                                  onClick={() => {
                                    const text = type === 'fullName' ? customization.recipient.name :
                                                type === 'firstName' ? customization.recipient.name.split(' ')[0] :
                                                type === 'lastName' ? customization.recipient.name.split(' ').slice(-1)[0] :
                                                '';
                                    setCustomization(prev => ({
                                      ...prev,
                                      items: {
                                        ...prev.items,
                                        golfBalls: {
                                          ...prev.items.golfBalls,
                                          personalization: {
                                            ...prev.items.golfBalls.personalization,
                                            line1: {
                                              ...prev.items.golfBalls.personalization.line1!,
                                              type,
                                              text: type === 'custom' ? prev.items.golfBalls.personalization.line1?.text || '' : text
                                            }
                                          }
                                        }
                                      }
                                    }))
                                  }}
                                  className={`py-2 px-3 border text-sm transition-all ${
                                    customization.items.golfBalls.personalization.line1?.type === type
                                      ? 'border-[#2c5c4f] bg-[#2c5c4f]/10'
                                      : 'border-[#E8DCC4]/30 bg-white hover:border-[#2c5c4f]/50'
                                  }`}
                                >
                                  {type === 'fullName' && 'Full Name'}
                                  {type === 'firstName' && 'First'}
                                  {type === 'lastName' && 'Last'}
                                  {type === 'custom' && 'Custom'}
                                </button>
                              ))}
                            </div>
                          </div>

                          {customization.items.golfBalls.personalization.line1?.type === 'custom' && (
                            <input
                              type="text"
                              value={customization.items.golfBalls.personalization.line1?.text || ''}
                              onChange={(e) => setCustomization(prev => ({
                                ...prev,
                                items: {
                                  ...prev.items,
                                  golfBalls: {
                                    ...prev.items.golfBalls,
                                    personalization: {
                                      ...prev.items.golfBalls.personalization,
                                      line1: {
                                        ...prev.items.golfBalls.personalization.line1!,
                                        text: e.target.value
                                      }
                                    }
                                  }
                                }
                              }))}
                              placeholder="Enter custom text"
                              maxLength={20}
                              className="input-minimal w-full"
                            />
                          )}

                          
                          <div className="space-y-4">
                            <div>
                              <label className="text-xs uppercase tracking-wider text-[#7C8471] block mb-2">
                                Font Style
                              </label>
                              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                                {(['classic', 'modern', 'script', 'bold', 'elegant'] as const).map(font => (
                                  <button
                                    key={font}
                                    onClick={() => setCustomization(prev => ({
                                      ...prev,
                                      items: {
                                        ...prev.items,
                                        golfBalls: {
                                          ...prev.items.golfBalls,
                                          personalization: {
                                            ...prev.items.golfBalls.personalization,
                                            line1: {
                                              ...prev.items.golfBalls.personalization.line1!,
                                              font
                                            }
                                          }
                                        }
                                      }
                                    }))}
                                    className={`py-3 px-3 border transition-all ${
                                      customization.items.golfBalls.personalization.line1?.font === font
                                        ? 'border-[#2c5c4f] bg-[#2c5c4f]/10'
                                        : 'border-[#E8DCC4]/30 bg-white hover:border-[#2c5c4f]/50'
                                    }`}
                                  >
                                    <div 
                                      className="text-lg text-black"
                                      style={FONT_STYLES[font].style}
                                    >
                                      ABC
                                    </div>
                                    <div className="text-xs text-[#7C8471] mt-1 capitalize">
                                      {font}
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div>
                              <label className="text-xs uppercase tracking-wider text-[#7C8471] block mb-2">
                                Text Size
                              </label>
                              <div className="flex items-center gap-4">
                                <button
                                  onClick={() => setCustomization(prev => ({
                                    ...prev,
                                    items: {
                                      ...prev.items,
                                      golfBalls: {
                                        ...prev.items.golfBalls,
                                        personalization: {
                                          ...prev.items.golfBalls.personalization,
                                          line1: {
                                            ...prev.items.golfBalls.personalization.line1!,
                                            size: Math.max(12, (prev.items.golfBalls.personalization.line1?.size || 20) - 2)
                                          }
                                        }
                                      }
                                    }
                                  }))}
                                  className="p-2 border border-[#E8DCC4]/30 bg-white hover:border-[#2c5c4f]/50 rounded transition-all"
                                >
                                  <Minus className="w-4 h-4 text-[#2c5c4f]" />
                                </button>
                                <span className="text-sm font-semibold min-w-[3rem] text-center">
                                  {customization.items.golfBalls.personalization.line1?.size || 20}px
                                </span>
                                <button
                                  onClick={() => setCustomization(prev => ({
                                    ...prev,
                                    items: {
                                      ...prev.items,
                                      golfBalls: {
                                        ...prev.items.golfBalls,
                                        personalization: {
                                          ...prev.items.golfBalls.personalization,
                                          line1: {
                                            ...prev.items.golfBalls.personalization.line1!,
                                            size: Math.min(32, (prev.items.golfBalls.personalization.line1?.size || 20) + 2)
                                          }
                                        }
                                      }
                                    }
                                  }))}
                                  className="p-2 border border-[#E8DCC4]/30 bg-white hover:border-[#2c5c4f]/50 rounded transition-all"
                                >
                                  <Plus className="w-4 h-4 text-[#2c5c4f]" />
                                </button>
                              </div>
                            </div>

                            <div>
                              <label className="text-xs uppercase tracking-wider text-[#7C8471] block mb-2">
                                Text Style
                              </label>
                              <div className="grid grid-cols-2 gap-2">
                                {(['uppercase', 'capitalize'] as const).map(textCase => (
                                  <button
                                    key={textCase}
                                    onClick={() => setCustomization(prev => ({
                                      ...prev,
                                      items: {
                                        ...prev.items,
                                        golfBalls: {
                                          ...prev.items.golfBalls,
                                          personalization: {
                                            ...prev.items.golfBalls.personalization,
                                            line1: {
                                              ...prev.items.golfBalls.personalization.line1!,
                                              textCase
                                            }
                                          }
                                        }
                                      }
                                    }))}
                                    className={`py-2 px-3 border text-sm transition-all ${
                                      customization.items.golfBalls.personalization.line1?.textCase === textCase
                                        ? 'border-[#2c5c4f] bg-[#2c5c4f]/10'
                                        : 'border-[#E8DCC4]/30 bg-white hover:border-[#2c5c4f]/50'
                                    }`}
                                  >
                                    <div className="font-medium">
                                      {textCase === 'uppercase' ? 'UPPERCASE' : 'Capitalized'}
                                    </div>
                                    <div className="text-xs text-[#7C8471] mt-1">
                                      {textCase === 'uppercase' ? 'JOHN SMITH' : 'John Smith'}
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Line 2 Options - Only show if 2 lines selected */}
                      {customization.items.golfBalls.personalization.lines === 2 && (
                        <div className="p-6 bg-[#E8DCC4]/10 border border-[#E8DCC4]/30 rounded-lg">
                          <h4 className="text-sm font-semibold mb-4">Line 2 - Signature/Custom Text</h4>
                          
                          <div className="space-y-4">
                            <input
                              type="text"
                              value={customization.items.golfBalls.personalization.line2?.text || ''}
                              onChange={(e) => setCustomization(prev => ({
                                ...prev,
                                items: {
                                  ...prev.items,
                                  golfBalls: {
                                    ...prev.items.golfBalls,
                                    personalization: {
                                      ...prev.items.golfBalls.personalization,
                                      line2: {
                                        ...prev.items.golfBalls.personalization.line2!,
                                        text: e.target.value
                                      }
                                    }
                                  }
                                }
                              }))}
                              placeholder="e.g., 'Signature Series' or custom message"
                              maxLength={20}
                              className="input-minimal w-full"
                            />

                            <div className="space-y-4">
                              <div>
                                <label className="text-xs uppercase tracking-wider text-[#7C8471] block mb-2">
                                  Font Style
                                </label>
                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                                  {(['classic', 'modern', 'script', 'bold', 'elegant'] as const).map(font => (
                                    <button
                                      key={font}
                                      onClick={() => setCustomization(prev => ({
                                        ...prev,
                                        items: {
                                          ...prev.items,
                                          golfBalls: {
                                            ...prev.items.golfBalls,
                                            personalization: {
                                              ...prev.items.golfBalls.personalization,
                                              line2: {
                                                ...prev.items.golfBalls.personalization.line2!,
                                                font
                                              }
                                            }
                                          }
                                        }
                                      }))}
                                      className={`py-3 px-3 border transition-all ${
                                        customization.items.golfBalls.personalization.line2?.font === font
                                          ? 'border-[#2c5c4f] bg-[#2c5c4f]/10'
                                          : 'border-[#E8DCC4]/30 bg-white hover:border-[#2c5c4f]/50'
                                      }`}
                                    >
                                      <div 
                                        className="text-base text-black"
                                        style={FONT_STYLES[font].style}
                                      >
                                        Abc
                                      </div>
                                      <div className="text-xs text-[#7C8471] mt-1 capitalize">
                                        {font}
                                      </div>
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <label className="text-xs uppercase tracking-wider text-[#7C8471] block mb-2">
                                  Text Size
                                </label>
                                <div className="flex items-center gap-4">
                                  <button
                                    onClick={() => setCustomization(prev => ({
                                      ...prev,
                                      items: {
                                        ...prev.items,
                                        golfBalls: {
                                          ...prev.items.golfBalls,
                                          personalization: {
                                            ...prev.items.golfBalls.personalization,
                                            line2: {
                                              ...prev.items.golfBalls.personalization.line2!,
                                              size: Math.max(10, (prev.items.golfBalls.personalization.line2?.size || 14) - 2)
                                            }
                                          }
                                        }
                                      }
                                    }))}
                                    className="p-2 border border-[#E8DCC4]/30 bg-white hover:border-[#2c5c4f]/50 rounded transition-all"
                                  >
                                    <Minus className="w-4 h-4 text-[#2c5c4f]" />
                                  </button>
                                  <span className="text-sm font-semibold min-w-[3rem] text-center">
                                    {customization.items.golfBalls.personalization.line2?.size || 14}px
                                  </span>
                                  <button
                                    onClick={() => setCustomization(prev => ({
                                      ...prev,
                                      items: {
                                        ...prev.items,
                                        golfBalls: {
                                          ...prev.items.golfBalls,
                                          personalization: {
                                            ...prev.items.golfBalls.personalization,
                                            line2: {
                                              ...prev.items.golfBalls.personalization.line2!,
                                              size: Math.min(24, (prev.items.golfBalls.personalization.line2?.size || 14) + 2)
                                            }
                                          }
                                        }
                                      }
                                    }))}
                                    className="p-2 border border-[#E8DCC4]/30 bg-white hover:border-[#2c5c4f]/50 rounded transition-all"
                                  >
                                    <Plus className="w-4 h-4 text-[#2c5c4f]" />
                                  </button>
                                </div>
                              </div>

                              <div>
                                <label className="text-xs uppercase tracking-wider text-[#7C8471] block mb-2">
                                  Text Case
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                  {(['uppercase', 'capitalize'] as const).map(textCase => (
                                    <button
                                      key={textCase}
                                      onClick={() => setCustomization(prev => ({
                                        ...prev,
                                        items: {
                                          ...prev.items,
                                          golfBalls: {
                                            ...prev.items.golfBalls,
                                            personalization: {
                                              ...prev.items.golfBalls.personalization,
                                              line2: {
                                                ...prev.items.golfBalls.personalization.line2!,
                                                textCase
                                              }
                                            }
                                          }
                                        }
                                      }))}
                                      className={`py-3 px-4 border transition-all ${
                                        customization.items.golfBalls.personalization.line2?.textCase === textCase
                                          ? 'border-[#2c5c4f] bg-[#2c5c4f]/10'
                                          : 'border-[#E8DCC4]/30 bg-white hover:border-[#2c5c4f]/50'
                                      }`}
                                    >
                                      <div className="font-medium text-sm">
                                        {textCase === 'uppercase' ? 'UPPERCASE' : 'Capitalized'}
                                      </div>
                                      <div className="text-xs text-[#7C8471] mt-1">
                                        {textCase === 'uppercase' ? 'SIGNATURE SERIES' : 'Signature Series'}
                                      </div>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Golf Tees */}
            {activeStep === 4 && customization.items.golfTees.included && (
              <div className="space-y-8 fade-in">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-serif mb-2">Customize Golf Tees</h2>
                  <p className="text-sm sm:text-base text-[#7C8471]">Premium natural wood tees for {customization.recipient.name || 'the recipient'}</p>
                </div>

                {/* Mobile Sticky Preview - Shows golf tee with current customization */}
                <div className="lg:hidden sticky top-0 bg-[#FAF7F2] border-b border-[#E8DCC4]/30 py-3 -mx-4 sm:-mx-6 px-4 sm:px-6 mb-6 z-40">
                  <div className="flex items-center justify-center">
                    <div className="relative w-72 h-48">
                      <Image
                        src={customization.items.golfTees.personalization.text || customization.items.golfTees.personalization.type !== 'message' 
                          ? '/products/tees-personalized-hd.png' 
                          : '/products/12.png'}
                        alt="Golf tee"
                        fill
                        className="object-contain"
                      />
                      
                      {/* Overlay text on tee */}
                      {(customization.items.golfTees.personalization.type === 'initials' || 
                        customization.items.golfTees.personalization.type === 'name' ||
                        customization.items.golfTees.personalization.text) && (
                        <div 
                          className="absolute flex items-center justify-center"
                          style={{
                            top: '48.5%',
                            left: '53%',
                            transform: 'translate(-50%, -50%)',
                            width: '100%'
                          }}
                        >
                          <div 
                            className="font-bold text-black/80 tracking-wider uppercase"
                            style={{
                              fontSize: `${(customization.items.golfTees.personalization.fontSize || 11) * 0.9}px`,
                              letterSpacing: '0.15em'
                            }}
                          >
                            {customization.items.golfTees.personalization.type === 'initials' 
                              ? customization.recipient.initials 
                              : customization.items.golfTees.personalization.type === 'name'
                              ? customization.recipient.name.toUpperCase()
                              : customization.items.golfTees.personalization.text.toUpperCase()}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-[#2c5c4f]/10 border border-[#2c5c4f]/30 p-3 sm:p-4 rounded">
                    <p className="text-xs sm:text-sm text-[#2F3E2E]">
                      <span className="font-semibold">{GIFT_SETS[customization.set].name}</span> includes{' '}
                      <span className="font-semibold text-[#2c5c4f]">{customization.items.golfTees.quantity} natural wood tees</span>
                      <br/>
                      <span className="text-xs text-[#7C8471] mt-1 inline-block">Personalization included at no extra charge</span>
                    </p>
                  </div>

                  <div>
                    <label className="text-sm uppercase tracking-wider text-[#7C8471] block mb-3">
                      Personalization Text
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-3 mb-4">
                      {(['initials', 'name', 'message'] as const).map(type => (
                        <button
                          key={type}
                          onClick={() => setCustomization(prev => ({
                            ...prev,
                            items: {
                              ...prev.items,
                              golfTees: {
                                ...prev.items.golfTees,
                                personalization: {
                                  ...prev.items.golfTees.personalization,
                                  type,
                                  text: type === 'initials' ? prev.recipient.initials : 
                                        type === 'name' ? prev.recipient.name : ''
                                }
                              }
                            }
                          }))}
                          className={`py-3 px-4 text-sm lg:text-base border transition-all capitalize ${
                            customization.items.golfTees.personalization.type === type
                              ? 'border-[#2c5c4f] bg-[#2c5c4f]/10'
                              : 'border-[#E8DCC4]/30 bg-white hover:border-[#2c5c4f]/50'
                          }`}
                        >
                          {type === 'initials' && `Initials (${customization.recipient.initials || 'ABC'})`}
                          {type === 'name' && 'Full Name'}
                          {type === 'message' && 'Custom Text'}
                        </button>
                      ))}
                    </div>
                    
                    {/* Font Size Controls - Show for all types */}
                    <div className="space-y-4">
                      {/* Custom text input - only for message */}
                      {customization.items.golfTees.personalization.type === 'message' && (
                        <div>
                          <input
                            type="text"
                            value={customization.items.golfTees.personalization.text}
                            onChange={(e) => {
                              const maxChars = customization.items.golfTees.personalization.type === 'initials' ? 3 : 
                                             customization.items.golfTees.personalization.type === 'name' ? 15 : 12;
                              if (e.target.value.length <= maxChars) {
                                setCustomization(prev => ({
                                  ...prev,
                                  items: {
                                    ...prev.items,
                                    golfTees: {
                                      ...prev.items.golfTees,
                                      personalization: {
                                        ...prev.items.golfTees.personalization,
                                        text: e.target.value
                                      }
                                    }
                                  }
                                }))
                              }
                            }}
                            placeholder={`e.g., "${customization.recipient.name}'s Tees" or "Fore!"`}
                            className="input-minimal w-full"
                          />
                          <div className="flex justify-between items-center mt-2">
                            <span className={`text-xs ${
                              customization.items.golfTees.personalization.text.length > 12 
                                ? 'text-red-500' 
                                : 'text-[#7C8471]'
                            }`}>
                              {customization.items.golfTees.personalization.text.length} / 12 characters
                            </span>
                            {customization.items.golfTees.personalization.text.length > 12 && (
                              <span className="text-xs text-red-500">Text too long!</span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Font Size Controls - Show for ALL personalization types */}
                      <div>
                        <label className="text-xs uppercase tracking-wider text-[#7C8471] block mb-2">
                          Font Size
                        </label>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => setCustomization(prev => ({
                              ...prev,
                              items: {
                                ...prev.items,
                                golfTees: {
                                  ...prev.items.golfTees,
                                  personalization: {
                                    ...prev.items.golfTees.personalization,
                                    fontSize: Math.max(8, (prev.items.golfTees.personalization.fontSize || 8) - 0.5)
                                  }
                                }
                              }
                            }))}
                            className="p-2 border border-[#E8DCC4]/30 bg-white hover:border-[#2c5c4f]/50 rounded transition-all"
                          >
                            <Minus className="w-4 h-4 text-[#2c5c4f]" />
                          </button>
                          <span className="text-sm font-semibold min-w-[3rem] text-center">
                            {customization.items.golfTees.personalization.fontSize || 11}px
                          </span>
                          <button
                            onClick={() => setCustomization(prev => ({
                              ...prev,
                              items: {
                                ...prev.items,
                                golfTees: {
                                  ...prev.items.golfTees,
                                  personalization: {
                                    ...prev.items.golfTees.personalization,
                                    fontSize: Math.min(16, (prev.items.golfTees.personalization.fontSize || 8) + 0.5)
                                  }
                                }
                              }
                            }))}
                            className="p-2 border border-[#E8DCC4]/30 bg-white hover:border-[#2c5c4f]/50 rounded transition-all"
                          >
                            <Plus className="w-4 h-4 text-[#2c5c4f]" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-xs text-[#7C8471] mt-2">
                      {customization.items.golfTees.personalization.type === 'initials' && `Will display: ${customization.recipient.initials || 'Your initials'}`}
                      {customization.items.golfTees.personalization.type === 'name' && `Will display: ${customization.recipient.name || 'Recipient name'}`}
                      {customization.items.golfTees.personalization.type === 'message' && `Will display: ${customization.items.golfTees.personalization.text || 'Your custom text'}`}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Golf Towel */}
            {activeStep === 5 && customization.items.golfTowel.included && (
              <div className="space-y-8 fade-in">
                <div>
                  <h2 className="text-3xl font-serif mb-2">Customize Golf Towel</h2>
                  <p className="text-[#7C8471]">Premium embroidered towel for {customization.recipient.name || 'the recipient'}</p>
                </div>

                {/* Mobile Sticky Preview - Shows golf towel with current customization */}
                <div className="lg:hidden sticky top-0 bg-[#FAF7F2] border-b border-[#E8DCC4]/30 py-3 -mx-4 sm:-mx-6 px-4 sm:px-6 mb-6 z-40">
                  <div className="flex items-center justify-center">
                    <div className="relative">
                      <div 
                        className="w-40 h-28 rounded shadow-md relative overflow-hidden"
                        style={{
                          backgroundColor: customization.items.golfTowel.color === 'navy' ? '#1e3a5f' 
                            : customization.items.golfTowel.color === 'black' ? '#000000'
                            : customization.items.golfTowel.color === 'red' ? '#8B0000' 
                            : '#1e3a5f',
                          border: '1px solid rgba(0,0,0,0.1)'
                        }}
                      >
                        {/* Texture */}
                        <div className="absolute inset-0 opacity-20">
                          {[...Array(8)].map((_, i) => (
                            <div
                              key={i}
                              className="h-px bg-black/10"
                              style={{ marginTop: `${i * 3.5}px` }}
                            />
                          ))}
                        </div>
                        
                        {/* Embroidery - Always in bottom-right corner, always white */}
                        <div className="absolute bottom-2 right-2">
                          <div 
                            className="font-bold text-white"
                            style={{
                              fontSize: `${(customization.items.golfTowel.personalization.fontSize || 20) * 0.7}px`,
                              ...FONT_STYLES[customization.items.golfTowel.personalization.fontFamily || 'elegant'].style
                            }}
                          >
                            {customization.items.golfTowel.personalization.type === 'initials' 
                              ? customization.recipient.initials
                              : customization.recipient.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-sm uppercase tracking-wider text-[#7C8471] block mb-3">
                      Towel Color
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {(['navy', 'black', 'red'] as const).map(color => (
                        <button
                          key={color}
                          onClick={() => setCustomization(prev => ({
                            ...prev,
                            items: {
                              ...prev.items,
                              golfTowel: {
                                ...prev.items.golfTowel,
                                color
                              }
                            }
                          }))}
                          className={`py-3 px-4 border transition-all capitalize ${
                            customization.items.golfTowel.color === color
                              ? 'border-[#C9A961] bg-white'
                              : 'border-[#E8DCC4]/30 bg-white hover:border-[#C9A961]/50'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm uppercase tracking-wider text-[#7C8471] block mb-3">
                      Embroidery Type
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {(['initials', 'name'] as const).map(type => (
                        <button
                          key={type}
                          onClick={() => setCustomization(prev => ({
                            ...prev,
                            items: {
                              ...prev.items,
                              golfTowel: {
                                ...prev.items.golfTowel,
                                personalization: {
                                  ...prev.items.golfTowel.personalization,
                                  type,
                                  text: type === 'initials' ? prev.recipient.initials : prev.recipient.name,
                                  // Set appropriate default size when switching type
                                  fontSize: type === 'initials' ? 20 : 12 // Medium size for each type
                                }
                              }
                            }
                          }))}
                          className={`py-3 px-4 border transition-all capitalize ${
                            customization.items.golfTowel.personalization.type === type
                              ? 'border-[#C9A961] bg-white'
                              : 'border-[#E8DCC4]/30 bg-white hover:border-[#C9A961]/50'
                          }`}
                        >
                          {type === 'initials' && `Initials (${customization.recipient.initials})`}
                          {type === 'name' && 'Full Name'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Embroidery Size - Using radio buttons with dynamic sizes */}
                  <div>
                    <label className="text-sm uppercase tracking-wider text-[#7C8471] block mb-3">
                      Embroidery Size
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {(() => {
                        // Dynamic sizes based on embroidery type
                        const sizes = customization.items.golfTowel.personalization.type === 'initials'
                          ? { small: 16, medium: 20, large: 24 }
                          : { small: 10, medium: 12, large: 14 };
                        
                        return (['small', 'medium', 'large'] as const).map(size => {
                          const pixelSize = sizes[size];
                          const isSelected = customization.items.golfTowel.personalization.fontSize === pixelSize;
                          
                          return (
                            <button
                              key={size}
                              onClick={() => setCustomization(prev => ({
                                ...prev,
                                items: {
                                  ...prev.items,
                                  golfTowel: {
                                    ...prev.items.golfTowel,
                                    personalization: {
                                      ...prev.items.golfTowel.personalization,
                                      fontSize: pixelSize
                                    }
                                  }
                                }
                              }))}
                              className={`py-4 px-4 border transition-all capitalize ${
                                isSelected
                                  ? 'border-[#C9A961] bg-white'
                                  : 'border-[#E8DCC4]/30 bg-white hover:border-[#C9A961]/50'
                              }`}
                            >
                              {size}
                            </button>
                          );
                        });
                      })()}
                    </div>
                  </div>

                  {/* Font Family */}
                  <div>
                    <label className="text-sm uppercase tracking-wider text-[#7C8471] block mb-3">
                      Font Style
                    </label>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                      {(['classic', 'modern', 'script', 'bold', 'elegant'] as const).map(font => (
                        <button
                          key={font}
                          onClick={() => setCustomization(prev => ({
                            ...prev,
                            items: {
                              ...prev.items,
                              golfTowel: {
                                ...prev.items.golfTowel,
                                personalization: {
                                  ...prev.items.golfTowel.personalization,
                                  fontFamily: font
                                }
                              }
                            }
                          }))}
                          className={`py-3 px-3 border transition-all ${
                            customization.items.golfTowel.personalization.fontFamily === font
                              ? 'border-[#C9A961] bg-white'
                              : 'border-[#E8DCC4]/30 bg-white hover:border-[#C9A961]/50'
                          }`}
                        >
                          <div 
                            className="text-lg text-black"
                            style={FONT_STYLES[font].style}
                          >
                            ABC
                          </div>
                          <div className="text-xs text-[#7C8471] mt-1 capitalize">
                            {font}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Divot Tool */}
            {activeStep === 6 && customization.items.divotTool.included && (
              <div className="space-y-8 fade-in">
                <div>
                  <h2 className="text-3xl font-serif mb-2">Customize Divot Tool</h2>
                  <p className="text-[#7C8471]">Your crest on a premium silver divot repair tool</p>
                </div>
                
                {/* Mobile Sticky Preview - Shows divot tool with crest */}
                <div className="lg:hidden sticky top-0 bg-[#FAF7F2] border-b border-[#E8DCC4]/30 py-2 -mx-4 sm:-mx-6 px-4 sm:px-6 mb-6 z-40">
                  <div className="flex items-center justify-center">
                    <div className="relative w-72 h-72">  {/* Increased to w-72 h-72 for much bigger preview */}
                      <Image
                        src="/crest-background.png"
                        alt="Divot tool"
                        fill
                        className="object-contain"
                      />
                      {/* Crest overlay - Adjust top value to move up/down */}
                      <div 
                        className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                        style={{ top: '32%', left: '49.7%' }}>
                        <CrestPNGMeasured 
                          size={65 * ((customization.items.divotTool.personalization.crestSize || 100) / 100)}
                          initials={customization.recipient.initials || 'ABC'}
                          firstName={customization.recipient.name?.split(' ')[0] || ''}
                          lastName={customization.recipient.name?.split(' ').slice(1).join(' ') || ''}
                          customText={customization.crestCustomText || ''}
                          textType={customization.crestTextType || 'initials'}
                          fontType={customization.crestFont || 'serif'}
                          textSize={customization.crestTextSize || 100}
                          crestType={customization.crestStyle ? `crest-${customization.crestStyle}-no-name` : 'crest-1-no-name'}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-sm uppercase tracking-wider text-[#7C8471] block mb-3">
                      Crest Size
                    </label>
                    <div className="bg-white border border-[#E8DCC4]/30 p-4">
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => setCustomization(prev => ({
                            ...prev,
                            items: {
                              ...prev.items,
                              divotTool: {
                                ...prev.items.divotTool,
                                personalization: {
                                  ...prev.items.divotTool.personalization,
                                  crestSize: Math.max(50, (prev.items.divotTool.personalization.crestSize || 100) - 10)
                                }
                              }
                            }
                          }))}
                          className="w-10 h-10 rounded-full border border-[#2F3E2E] hover:bg-[#2F3E2E] hover:text-white transition-all flex items-center justify-center"
                        >
                          <span className="text-xl leading-none">−</span>
                        </button>
                        
                        <div className="text-center">
                          <div className="text-2xl font-serif mb-1">
                            {customization.items.divotTool.personalization.crestSize || 100}%
                          </div>
                          <div className="text-xs text-[#7C8471] uppercase tracking-wider">
                            {(customization.items.divotTool.personalization.crestSize || 100) < 80 ? 'Small' : 
                             (customization.items.divotTool.personalization.crestSize || 100) > 120 ? 'Large' : 'Medium'}
                          </div>
                        </div>
                        
                        <button
                          onClick={() => setCustomization(prev => ({
                            ...prev,
                            items: {
                              ...prev.items,
                              divotTool: {
                                ...prev.items.divotTool,
                                personalization: {
                                  ...prev.items.divotTool.personalization,
                                  crestSize: Math.min(150, (prev.items.divotTool.personalization.crestSize || 100) + 10)
                                }
                              }
                            }
                          }))}
                          className="w-10 h-10 rounded-full border border-[#2F3E2E] hover:bg-[#2F3E2E] hover:text-white transition-all flex items-center justify-center"
                        >
                          <span className="text-xl leading-none">+</span>
                        </button>
                      </div>
                      
                      <p className="text-xs text-[#7C8471] text-center mt-4">
                        Adjust the size of your crest on the divot tool
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}


            {/* Step 7: Ball Marker */}
            {activeStep === 7 && customization.items.ballMarker.included && (
              <div className="space-y-8 fade-in">
                <div>
                  <h2 className="text-3xl font-serif mb-2">Customize Ball Marker</h2>
                  <p className="text-[#7C8471]">Premium magnetic ball marker with your crest</p>
                </div>
                
                {/* Mobile Sticky Preview - Shows ball marker with crest */}
                <div className="lg:hidden sticky top-0 bg-[#FAF7F2] border-b border-[#E8DCC4]/30 py-3 -mx-4 sm:-mx-6 px-4 sm:px-6 mb-6 z-40">
                  <div className="flex items-center justify-center">
                    <div className="relative w-full h-80">
                      <Image
                        src="/ball-marker.png"
                        alt="Ball marker"
                        fill
                        className="object-contain"
                      />
                      
                      {/* Overlay crest on ball marker center */}
                      <div 
                        className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                        style={{ top: '46.5%', left: '60%' }}>
                        <CrestPNGMeasured 
                          size={194 * ((customization.items.ballMarker.personalization.crestSize || 100) / 100)}
                          initials={customization.recipient.initials || 'ABC'}
                          firstName={customization.recipient.name?.split(' ')[0] || ''}
                          lastName={customization.recipient.name?.split(' ').slice(1).join(' ') || ''}
                          customText={customization.crestCustomText || ''}
                          textType={customization.crestTextType || 'initials'}
                          fontType={customization.crestFont || 'serif'}
                          textSize={customization.crestTextSize || 100}
                          crestType={customization.crestStyle ? `crest-${customization.crestStyle}-no-name` : 'crest-1-no-name'}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-sm uppercase tracking-wider text-[#7C8471] block mb-3">
                      Crest Size
                    </label>
                    <div className="bg-white border border-[#E8DCC4]/30 p-4">
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => setCustomization(prev => ({
                            ...prev,
                            items: {
                              ...prev.items,
                              ballMarker: {
                                ...prev.items.ballMarker,
                                personalization: {
                                  ...prev.items.ballMarker.personalization,
                                  crestSize: Math.max(50, (prev.items.ballMarker.personalization.crestSize || 100) - 10)
                                }
                              }
                            }
                          }))}
                          className="w-10 h-10 rounded-full border border-[#2F3E2E] hover:bg-[#2F3E2E] hover:text-white transition-all flex items-center justify-center"
                        >
                          <span className="text-xl leading-none">−</span>
                        </button>
                        
                        <div className="text-center">
                          <div className="text-2xl font-serif mb-1">
                            {customization.items.ballMarker.personalization.crestSize || 100}%
                          </div>
                          <div className="text-xs text-[#7C8471] uppercase tracking-wider">
                            {(customization.items.ballMarker.personalization.crestSize || 100) < 80 ? 'Small' : 
                             (customization.items.ballMarker.personalization.crestSize || 100) > 120 ? 'Large' : 'Medium'}
                          </div>
                        </div>
                        
                        <button
                          onClick={() => setCustomization(prev => ({
                            ...prev,
                            items: {
                              ...prev.items,
                              ballMarker: {
                                ...prev.items.ballMarker,
                                personalization: {
                                  ...prev.items.ballMarker.personalization,
                                  crestSize: Math.min(150, (prev.items.ballMarker.personalization.crestSize || 100) + 10)
                                }
                              }
                            }
                          }))}
                          className="w-10 h-10 rounded-full border border-[#2F3E2E] hover:bg-[#2F3E2E] hover:text-white transition-all flex items-center justify-center"
                        >
                          <span className="text-xl leading-none">+</span>
                        </button>
                      </div>
                      
                      <p className="text-xs text-[#7C8471] text-center mt-4">
                        Adjust the size of your crest on the ball marker
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between gap-3 mt-8">
              {activeStep > 0 && (
                <button 
                  onClick={goToPreviousStep}
                  className="px-4 sm:px-8 py-3 sm:py-4 border border-[#2F3E2E] hover:bg-[#2F3E2E] hover:text-white rounded-none transition-all duration-300 uppercase tracking-wider text-xs sm:text-sm font-medium"
                >
                  Previous
                </button>
              )}
              
              {activeStep < steps.length - 1 ? (
                <button 
                  onClick={goToNextStep}
                  className="px-4 sm:px-8 py-3 sm:py-4 bg-[#2F3E2E] hover:bg-[#1a2420] text-white rounded-none transition-all duration-300 uppercase tracking-wider text-xs sm:text-sm font-medium ml-auto"
                  disabled={activeStep === 1 && !customization.recipient.name}
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={handleCheckout}
                  disabled={loading || !customization.recipient.name}
                  className="btn-primary ml-auto disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Proceed to Checkout'}
                </button>
              )}
            </div>
          </div>

          {/* Right: Preview & Summary */}
          <div className="hidden lg:block lg:sticky lg:top-32 h-fit">
            {/* Visual Product Preview - Skip step 0 (Gift Set) and step 1 (Recipient) */}
            {activeStep >= 2 && activeStep <= 7 ? (
              <div className="mb-6">
                <RealisticProductPreview customization={customization} activeStep={activeStep} />
              </div>
            ) : activeStep === 0 ? (
              <div className="border border-[#E8DCC4]/30 p-6 mb-6">
                <h3 className="text-sm uppercase tracking-wider text-[#7C8471] mb-4">Live Preview</h3>
                
                <div className="h-64 bg-gradient-to-br from-[#FAF7F2] to-white rounded-lg">
                  {/* <ProductPreview customization={customization} activeStep={activeStep} /> */}
                </div>
              </div>
            ) : null}

            {/* Order Summary */}
            <div className="border border-[#E8DCC4]/30 p-6 mb-6">
              <h3 className="text-sm uppercase tracking-wider text-[#7C8471] mb-4">Order Summary</h3>
              
              {customization.recipient.name && (
                <div className="mb-4 p-3 bg-[#E8DCC4]/10 rounded">
                  <p className="text-xs uppercase tracking-wider text-[#7C8471] mb-1">For</p>
                  <p className="text-lg font-serif">{customization.recipient.name}</p>
                </div>
              )}

              <div className="space-y-3">
                <div className="text-sm">
                  <p className="font-semibold mb-2">{selectedSet.name}</p>
                  <div className="space-y-1 text-xs text-[#7C8471]">
                    {customization.items.golfBalls.included && (
                      <div>• Golf Balls ({customization.items.golfBalls.quantity})</div>
                    )}
                    {customization.items.golfTees.included && (
                      <div>• Golf Tees ({customization.items.golfTees.quantity})</div>
                    )}
                    {customization.items.golfTowel.included && (
                      <div>• Golf Towel ({customization.items.golfTowel.color})</div>
                    )}
                    {customization.items.divotTool.included && (
                      <div>• Divot Tool ({customization.items.divotTool.finish})</div>
                    )}
                    {customization.items.ballMarker.included && (
                      <div>• Ball Marker</div>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E8DCC4]/30">
                  <div className="flex justify-between text-sm">
                    <span>{selectedSet.name}</span>
                    <span>${selectedSet.price}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-base mt-3 pt-3 border-t border-[#E8DCC4]/30">
                    <span>Total</span>
                    <span className="text-[#C9A961]">${total}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center text-xs text-[#7C8471] space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Check className="w-3 h-3" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span>Handcrafted with Care</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CustomizePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CustomizeContent />
    </Suspense>
  )
}