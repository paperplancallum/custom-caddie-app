'use client'

import { useEffect, useState } from 'react'
import { RotateCw, ZoomIn, ZoomOut } from 'lucide-react'
import { useCustomizerStore } from '@/store/customizer-store'
import { cn } from '@/lib/utils'

export default function PreviewCanvas() {
  const { items, personalization, selectedSet } = useCustomizerStore()
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [activeProduct, setActiveProduct] = useState('golfBalls')

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360)
  }

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.2, 2))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.2, 0.5))
  }

  const products = [
    { id: 'golfBalls', name: 'Golf Balls', enabled: items.golfBalls.included },
    { id: 'tees', name: 'Tees', enabled: items.tees.included },
    { id: 'divotTool', name: 'Divot Tool', enabled: items.divotTool.included },
    { id: 'ballMarker', name: 'Ball Marker', enabled: items.ballMarker.included },
    { id: 'towel', name: 'Towel', enabled: items.towel.included },
  ].filter(p => p.enabled)

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-serif font-bold text-golf-green">Preview</h2>
      
      <div className="card">
        {/* Product Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto">
          {products.map((product) => (
            <button
              key={product.id}
              onClick={() => setActiveProduct(product.id)}
              className={cn(
                'px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all',
                activeProduct === product.id
                  ? 'bg-golf-green text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              {product.name}
            </button>
          ))}
        </div>

        {/* Preview Area */}
        <div className="relative bg-gradient-to-br from-golf-sand/20 to-golf-sand/10 rounded-xl overflow-hidden h-96">
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transform: `rotate(${rotation}deg) scale(${zoom})`,
              transition: 'transform 0.3s ease-in-out',
            }}
          >
            {/* Product Preview */}
            <div className="relative">
              {activeProduct === 'golfBalls' && (
                <div className="bg-white rounded-full w-48 h-48 shadow-xl flex items-center justify-center">
                  <div className="text-center">
                    <p className={cn(
                      'text-lg font-bold',
                      items.golfBalls.customization.font === 'serif' && 'font-serif',
                      items.golfBalls.customization.font === 'script' && 'font-serif italic',
                    )}
                    style={{ color: items.golfBalls.customization.color === 'gold' ? '#d4af37' : 'black' }}
                    >
                      {items.golfBalls.customization.text || personalization.firstName || 'Your Name'}
                    </p>
                    {items.golfBalls.customization.type === 'signature' && (
                      <p className="text-sm italic mt-1 text-gray-600">Signature Style</p>
                    )}
                  </div>
                </div>
              )}

              {activeProduct === 'tees' && (
                <div className="flex gap-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-32 rounded-full shadow-lg"
                      style={{
                        backgroundColor: items.tees.color === 'natural' ? '#deb887' : 
                                       items.tees.color === 'white' ? '#ffffff' :
                                       items.tees.color === 'black' ? '#000000' :
                                       items.tees.color === 'red' ? '#ff0000' : '#0000ff'
                      }}
                    />
                  ))}
                  {items.tees.customText && (
                    <div className="absolute -bottom-8 left-0 right-0 text-center">
                      <p className="text-xs font-medium">{items.tees.customText}</p>
                    </div>
                  )}
                </div>
              )}

              {activeProduct === 'divotTool' && (
                <div className="bg-gradient-to-b from-gray-300 to-gray-400 w-32 h-48 rounded-lg shadow-xl flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-xs font-bold text-gray-800">
                      {items.divotTool.engraving || personalization.initials || 'ABC'}
                    </p>
                  </div>
                </div>
              )}

              {activeProduct === 'ballMarker' && (
                <div className={cn(
                  'w-24 h-24 rounded-full shadow-xl flex items-center justify-center',
                  items.ballMarker.type === 'metal' 
                    ? 'bg-gradient-to-br from-gray-300 to-gray-500' 
                    : 'bg-gradient-to-br from-amber-700 to-amber-900'
                )}>
                  <p className="text-white font-bold text-lg">
                    {personalization.initials || 'ABC'}
                  </p>
                </div>
              )}

              {activeProduct === 'towel' && (
                <div 
                  className="w-48 h-64 rounded shadow-xl flex items-center justify-center"
                  style={{
                    backgroundColor: items.towel.color === 'white' ? '#ffffff' :
                                   items.towel.color === 'black' ? '#000000' :
                                   items.towel.color === 'navy' ? '#000080' :
                                   items.towel.color === 'forest' ? '#228b22' :
                                   items.towel.color === 'burgundy' ? '#800020' : '#808080'
                  }}
                >
                  <div className="text-center">
                    <p 
                      className="text-2xl font-bold"
                      style={{
                        color: items.towel.embroideryColor === 'gold' ? '#d4af37' :
                               items.towel.embroideryColor === 'silver' ? '#c0c0c0' :
                               items.towel.embroideryColor === 'white' ? '#ffffff' :
                               items.towel.embroideryColor === 'black' ? '#000000' : '#000080'
                      }}
                    >
                      {items.towel.embroideryType === 'initials' 
                        ? (personalization.initials || 'ABC')
                        : items.towel.embroideryType === 'name'
                        ? (items.towel.embroideryText || `${personalization.firstName} ${personalization.lastName}`.trim() || 'Your Name')
                        : 'LOGO'
                      }
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button
              onClick={handleRotate}
              className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50"
              title="Rotate"
            >
              <RotateCw className="w-5 h-5" />
            </button>
            <button
              onClick={handleZoomIn}
              className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50"
              title="Zoom In"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50"
              title="Zoom Out"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Preview Info */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> This is a simplified preview. The final product will be professionally crafted with your exact specifications.
          </p>
        </div>
      </div>
    </div>
  )
}