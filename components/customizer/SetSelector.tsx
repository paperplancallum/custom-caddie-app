'use client'

import { Check } from 'lucide-react'
import { useCustomizerStore } from '@/store/customizer-store'
import { PRESET_SETS } from '@/lib/constants'
import { cn, formatPrice } from '@/lib/utils'

export default function SetSelector() {
  const { selectedSet, updateSet } = useCustomizerStore()

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-serif font-bold text-golf-green">Choose Your Set</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PRESET_SETS.map((set) => (
          <button
            key={set.id}
            onClick={() => updateSet(set.id)}
            className={cn(
              'relative p-6 rounded-xl border-2 text-left transition-all duration-200',
              selectedSet === set.id
                ? 'border-golf-green bg-golf-sand/20 shadow-lg'
                : 'border-gray-200 hover:border-golf-light hover:shadow-md'
            )}
          >
            {set.popular && (
              <span className="absolute -top-3 right-4 bg-golf-gold text-white text-xs font-bold px-3 py-1 rounded-full">
                POPULAR
              </span>
            )}
            
            {selectedSet === set.id && (
              <div className="absolute top-4 right-4 w-6 h-6 bg-golf-green rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}

            <h3 className="text-lg font-bold text-golf-green mb-2">{set.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{set.description}</p>
            
            {set.price > 0 && (
              <p className="text-2xl font-bold text-golf-green mb-3">
                {formatPrice(set.price)}
              </p>
            )}

            <div className="space-y-1">
              <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Includes:</p>
              <ul className="text-sm text-gray-600">
                {set.includes.map((item, index) => (
                  <li key={index} className="flex items-center gap-1">
                    <span className="text-golf-green">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}