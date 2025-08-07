'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useCustomizerStore } from '@/store/customizer-store'
import { COLORS, FONTS, TEE_COLORS, EMBROIDERY_TYPES, BALL_MARKER_TYPES, MAX_TEXT_LENGTHS } from '@/lib/constants'
import { cn } from '@/lib/utils'

export default function ItemCustomizer() {
  const { items, selectedSet, updateItem } = useCustomizerStore()
  const [expandedItems, setExpandedItems] = useState<string[]>(['golfBalls'])

  const toggleExpanded = (item: string) => {
    setExpandedItems(prev =>
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item]
    )
  }

  if (selectedSet !== 'custom') {
    return null
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-serif font-bold text-golf-green">Customize Items</h2>
      
      {/* Golf Balls */}
      <div className="card">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleExpanded('golfBalls')}
        >
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={items.golfBalls.included}
              onChange={(e) => updateItem('golfBalls', { included: e.target.checked })}
              onClick={(e) => e.stopPropagation()}
              className="w-5 h-5 text-golf-green rounded"
            />
            <h3 className="text-lg font-semibold">Golf Balls</h3>
          </div>
          {expandedItems.includes('golfBalls') ? <ChevronUp /> : <ChevronDown />}
        </div>

        {expandedItems.includes('golfBalls') && items.golfBalls.included && (
          <div className="mt-4 space-y-4 pt-4 border-t">
            <div>
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <select
                value={items.golfBalls.quantity}
                onChange={(e) => updateItem('golfBalls', { quantity: parseInt(e.target.value) })}
                className="input-field"
              >
                <option value="6">6 Balls</option>
                <option value="12">12 Balls (1 Dozen)</option>
                <option value="24">24 Balls (2 Dozen)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Customization Type</label>
              <select
                value={items.golfBalls.customization.type}
                onChange={(e) => updateItem('golfBalls', {
                  customization: { ...items.golfBalls.customization, type: e.target.value }
                })}
                className="input-field"
              >
                <option value="name">Name Only</option>
                <option value="signature">Signature Style</option>
                <option value="both">Name + Signature</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Custom Text (Max {MAX_TEXT_LENGTHS.golfBalls} characters)
              </label>
              <input
                type="text"
                value={items.golfBalls.customization.text}
                onChange={(e) => updateItem('golfBalls', {
                  customization: { ...items.golfBalls.customization, text: e.target.value }
                })}
                maxLength={MAX_TEXT_LENGTHS.golfBalls}
                className="input-field"
                placeholder="Enter name or text"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Font Style</label>
              <div className="grid grid-cols-2 gap-2">
                {FONTS.map((font) => (
                  <button
                    key={font.value}
                    onClick={() => updateItem('golfBalls', {
                      customization: { ...items.golfBalls.customization, font: font.value }
                    })}
                    className={cn(
                      'p-3 rounded-lg border-2 transition-all',
                      items.golfBalls.customization.font === font.value
                        ? 'border-golf-green bg-golf-sand/20'
                        : 'border-gray-200 hover:border-golf-light'
                    )}
                  >
                    <span className={font.className}>{font.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Text Color</label>
              <div className="flex gap-2">
                {COLORS.text.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => updateItem('golfBalls', {
                      customization: { ...items.golfBalls.customization, color: color.value }
                    })}
                    className={cn(
                      'w-10 h-10 rounded-full border-2 transition-all',
                      items.golfBalls.customization.color === color.value
                        ? 'border-golf-green scale-110'
                        : 'border-gray-300'
                    )}
                    style={{ backgroundColor: color.hex }}
                    title={color.label}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tees */}
      <div className="card">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleExpanded('tees')}
        >
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={items.tees.included}
              onChange={(e) => updateItem('tees', { included: e.target.checked })}
              onClick={(e) => e.stopPropagation()}
              className="w-5 h-5 text-golf-green rounded"
            />
            <h3 className="text-lg font-semibold">Premium Tees</h3>
          </div>
          {expandedItems.includes('tees') ? <ChevronUp /> : <ChevronDown />}
        </div>

        {expandedItems.includes('tees') && items.tees.included && (
          <div className="mt-4 space-y-4 pt-4 border-t">
            <div>
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <select
                value={items.tees.quantity}
                onChange={(e) => updateItem('tees', { quantity: parseInt(e.target.value) })}
                className="input-field"
              >
                <option value="25">25 Tees</option>
                <option value="50">50 Tees</option>
                <option value="100">100 Tees</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tee Color</label>
              <div className="flex gap-2">
                {TEE_COLORS.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => updateItem('tees', { color: color.value })}
                    className={cn(
                      'w-10 h-10 rounded-full border-2 transition-all',
                      items.tees.color === color.value
                        ? 'border-golf-green scale-110'
                        : 'border-gray-300'
                    )}
                    style={{ backgroundColor: color.hex }}
                    title={color.label}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Custom Text (Max {MAX_TEXT_LENGTHS.tees} characters)
              </label>
              <input
                type="text"
                value={items.tees.customText}
                onChange={(e) => updateItem('tees', { customText: e.target.value })}
                maxLength={MAX_TEXT_LENGTHS.tees}
                className="input-field"
                placeholder="Optional custom text"
              />
            </div>
          </div>
        )}
      </div>

      {/* Divot Tool */}
      <div className="card">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleExpanded('divotTool')}
        >
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={items.divotTool.included}
              onChange={(e) => updateItem('divotTool', { included: e.target.checked })}
              onClick={(e) => e.stopPropagation()}
              className="w-5 h-5 text-golf-green rounded"
            />
            <h3 className="text-lg font-semibold">Divot Tool</h3>
          </div>
          {expandedItems.includes('divotTool') ? <ChevronUp /> : <ChevronDown />}
        </div>

        {expandedItems.includes('divotTool') && items.divotTool.included && (
          <div className="mt-4 space-y-4 pt-4 border-t">
            <div>
              <label className="block text-sm font-medium mb-2">
                Engraving Text (Max {MAX_TEXT_LENGTHS.divotTool} characters)
              </label>
              <input
                type="text"
                value={items.divotTool.engraving}
                onChange={(e) => updateItem('divotTool', { engraving: e.target.value })}
                maxLength={MAX_TEXT_LENGTHS.divotTool}
                className="input-field"
                placeholder="Enter engraving text"
              />
            </div>
          </div>
        )}
      </div>

      {/* Ball Marker */}
      <div className="card">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleExpanded('ballMarker')}
        >
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={items.ballMarker.included}
              onChange={(e) => updateItem('ballMarker', { included: e.target.checked })}
              onClick={(e) => e.stopPropagation()}
              className="w-5 h-5 text-golf-green rounded"
            />
            <h3 className="text-lg font-semibold">Ball Marker</h3>
          </div>
          {expandedItems.includes('ballMarker') ? <ChevronUp /> : <ChevronDown />}
        </div>

        {expandedItems.includes('ballMarker') && items.ballMarker.included && (
          <div className="mt-4 space-y-4 pt-4 border-t">
            <div>
              <label className="block text-sm font-medium mb-2">Marker Type</label>
              <div className="grid grid-cols-2 gap-2">
                {BALL_MARKER_TYPES.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => updateItem('ballMarker', { type: type.value })}
                    className={cn(
                      'p-3 rounded-lg border-2 transition-all',
                      items.ballMarker.type === type.value
                        ? 'border-golf-green bg-golf-sand/20'
                        : 'border-gray-200 hover:border-golf-light'
                    )}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Custom Design</label>
              <input
                type="text"
                value={items.ballMarker.design}
                onChange={(e) => updateItem('ballMarker', { design: e.target.value })}
                className="input-field"
                placeholder="Describe your design"
              />
            </div>
          </div>
        )}
      </div>

      {/* Towel */}
      <div className="card">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleExpanded('towel')}
        >
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={items.towel.included}
              onChange={(e) => updateItem('towel', { included: e.target.checked })}
              onClick={(e) => e.stopPropagation()}
              className="w-5 h-5 text-golf-green rounded"
            />
            <h3 className="text-lg font-semibold">Golf Towel</h3>
          </div>
          {expandedItems.includes('towel') ? <ChevronUp /> : <ChevronDown />}
        </div>

        {expandedItems.includes('towel') && items.towel.included && (
          <div className="mt-4 space-y-4 pt-4 border-t">
            <div>
              <label className="block text-sm font-medium mb-2">Towel Color</label>
              <div className="flex gap-2">
                {COLORS.products.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => updateItem('towel', { color: color.value })}
                    className={cn(
                      'w-10 h-10 rounded-full border-2 transition-all',
                      items.towel.color === color.value
                        ? 'border-golf-green scale-110'
                        : 'border-gray-300'
                    )}
                    style={{ backgroundColor: color.hex }}
                    title={color.label}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Embroidery Type</label>
              <div className="grid grid-cols-3 gap-2">
                {EMBROIDERY_TYPES.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => updateItem('towel', { embroideryType: type.value })}
                    className={cn(
                      'p-2 rounded-lg border-2 text-sm transition-all',
                      items.towel.embroideryType === type.value
                        ? 'border-golf-green bg-golf-sand/20'
                        : 'border-gray-200 hover:border-golf-light'
                    )}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Embroidery Text (Max {MAX_TEXT_LENGTHS.towel} characters)
              </label>
              <input
                type="text"
                value={items.towel.embroideryText}
                onChange={(e) => updateItem('towel', { embroideryText: e.target.value })}
                maxLength={MAX_TEXT_LENGTHS.towel}
                className="input-field"
                placeholder="Enter embroidery text"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Embroidery Color</label>
              <div className="flex gap-2">
                {COLORS.text.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => updateItem('towel', { embroideryColor: color.value })}
                    className={cn(
                      'w-10 h-10 rounded-full border-2 transition-all',
                      items.towel.embroideryColor === color.value
                        ? 'border-golf-green scale-110'
                        : 'border-gray-300'
                    )}
                    style={{ backgroundColor: color.hex }}
                    title={color.label}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}