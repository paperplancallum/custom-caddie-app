import { create } from 'zustand'
import { CustomizerState, SetType } from '@/types'
import { calculatePricing } from '@/lib/utils'
import { PRESET_SETS } from '@/lib/constants'

interface CustomizerStore extends CustomizerState {
  updateSet: (set: SetType) => void
  updateItem: (item: keyof CustomizerState['items'], updates: any) => void
  updatePersonalization: (updates: Partial<CustomizerState['personalization']>) => void
  updatePricing: () => void
  resetCustomizer: () => void
  loadDesign: (design: CustomizerState) => void
}

const initialState: CustomizerState = {
  selectedSet: 'A',
  items: {
    golfBalls: {
      included: true,
      quantity: 12,
      customization: {
        type: 'name',
        text: '',
        font: 'serif',
        color: 'black',
      },
    },
    tees: {
      included: true,
      quantity: 25,
      color: 'natural',
      customText: '',
    },
    divotTool: {
      included: true,
      engraving: '',
    },
    ballMarker: {
      included: true,
      type: 'metal',
      design: '',
    },
    towel: {
      included: false,
      color: 'white',
      embroideryColor: 'gold',
      embroideryText: '',
      embroideryType: 'initials',
    },
  },
  personalization: {
    firstName: '',
    middleName: '',
    lastName: '',
    initials: '',
    logo: null,
  },
  pricing: {
    basePrice: 9999,
    customizationFee: 0,
    total: 9999,
  },
}

export const useCustomizerStore = create<CustomizerStore>((set, get) => ({
  ...initialState,

  updateSet: (setType: SetType) => {
    const preset = PRESET_SETS.find(s => s.id === setType)
    if (!preset) return

    // Configure items based on preset
    const newItems = { ...initialState.items }
    
    if (setType === 'A') {
      newItems.golfBalls.included = true
      newItems.golfBalls.quantity = 12
      newItems.tees.included = true
      newItems.tees.quantity = 25
      newItems.divotTool.included = true
      newItems.ballMarker.included = true
      newItems.towel.included = false
    } else if (setType === 'B') {
      newItems.golfBalls.included = true
      newItems.golfBalls.quantity = 12
      newItems.tees.included = true
      newItems.tees.quantity = 50
      newItems.divotTool.included = true
      newItems.ballMarker.included = true
      newItems.towel.included = true
    } else if (setType === 'C') {
      newItems.golfBalls.included = true
      newItems.golfBalls.quantity = 6
      newItems.tees.included = true
      newItems.tees.quantity = 25
      newItems.divotTool.included = false
      newItems.ballMarker.included = true
      newItems.ballMarker.type = 'leather'
      newItems.towel.included = false
    }

    set(state => ({
      selectedSet: setType,
      items: newItems,
    }))
    
    get().updatePricing()
  },

  updateItem: (item, updates) => {
    set(state => ({
      items: {
        ...state.items,
        [item]: {
          ...state.items[item],
          ...updates,
        },
      },
    }))
    get().updatePricing()
  },

  updatePersonalization: (updates) => {
    set(state => ({
      personalization: {
        ...state.personalization,
        ...updates,
      },
    }))
  },

  updatePricing: () => {
    const items = get().items
    const pricing = calculatePricing(items)
    set({ pricing })
  },

  resetCustomizer: () => {
    set(initialState)
  },

  loadDesign: (design) => {
    set(design)
  },
}))