'use client'

import { ShoppingCart, Share2, Save } from 'lucide-react'
import { useCustomizerStore } from '@/store/customizer-store'
import { formatPrice } from '@/lib/utils'
import { useState } from 'react'

interface PricingSummaryProps {
  onCheckout: () => void
  onSave: () => void
  onShare: () => void
}

export default function PricingSummary({ onCheckout, onSave, onShare }: PricingSummaryProps) {
  const { pricing, items, personalization } = useCustomizerStore()
  const [isSaving, setIsSaving] = useState(false)

  const itemsList = [
    { name: 'Golf Balls', included: items.golfBalls.included, customized: !!items.golfBalls.customization.text },
    { name: 'Premium Tees', included: items.tees.included, customized: !!items.tees.customText },
    { name: 'Divot Tool', included: items.divotTool.included, customized: !!items.divotTool.engraving },
    { name: 'Ball Marker', included: items.ballMarker.included, customized: !!items.ballMarker.design },
    { name: 'Golf Towel', included: items.towel.included, customized: !!items.towel.embroideryText },
  ].filter(item => item.included)

  const isValid = personalization.firstName && personalization.lastName

  const handleSave = async () => {
    setIsSaving(true)
    await onSave()
    setIsSaving(false)
  }

  return (
    <div className="space-y-4 sticky top-4">
      <div className="card">
        <h3 className="text-xl font-bold text-golf-green mb-4">Order Summary</h3>
        
        {/* Items List */}
        <div className="space-y-2 mb-4">
          {itemsList.map((item) => (
            <div key={item.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="text-golf-green">✓</span>
                <span>{item.name}</span>
                {item.customized && (
                  <span className="text-xs bg-golf-gold text-white px-2 py-0.5 rounded-full">
                    Customized
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Breakdown */}
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Base Price:</span>
            <span>{formatPrice(pricing.basePrice)}</span>
          </div>
          {pricing.customizationFee > 0 && (
            <div className="flex justify-between text-sm">
              <span>Customization:</span>
              <span>{formatPrice(pricing.customizationFee)}</span>
            </div>
          )}
          {personalization.logo && (
            <div className="flex justify-between text-sm">
              <span>Logo Processing:</span>
              <span>{formatPrice(1500)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-lg pt-2 border-t">
            <span>Total:</span>
            <span className="text-golf-green">
              {formatPrice(pricing.total + (personalization.logo ? 1500 : 0))}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-3">
          <button
            onClick={onCheckout}
            disabled={!isValid}
            className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-5 h-5" />
            Proceed to Checkout
          </button>
          
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="btn-secondary flex items-center justify-center gap-2 text-sm py-2"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Saving...' : 'Save Design'}
            </button>
            
            <button
              onClick={onShare}
              className="btn-secondary flex items-center justify-center gap-2 text-sm py-2"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>

        {!isValid && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              Please fill in your first and last name to proceed with checkout.
            </p>
          </div>
        )}
      </div>

      {/* Trust Badges */}
      <div className="card">
        <div className="space-y-3 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <span>🔒</span>
            <span>Secure Checkout</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <span>🚚</span>
            <span>Free Shipping Over $100</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <span>✨</span>
            <span>100% Satisfaction Guarantee</span>
          </div>
        </div>
      </div>
    </div>
  )
}