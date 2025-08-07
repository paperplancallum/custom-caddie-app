// Configuration for different crest designs
// Each crest can have its own text positioning settings

export interface CrestConfig {
  imagePath: string
  textPosition: number  // Percentage from top (0-100)
  fontSize: number      // Multiplier for font size
  width: number        // Width percentage for text container
  letterSpacing: number // Letter spacing in em units
}

export const CREST_CONFIGS: Record<string, CrestConfig> = {
  'crest-1-no-name': {
    imagePath: '/golf-products/crest-1-no-name.png',  // Using the high-quality version
    textPosition: 55,     // You found this works for crest-1
    fontSize: 0.09,
    width: 65,
    letterSpacing: 0.15
  },
  // Add more crest configurations here as needed
  'crest-2-no-name': {
    imagePath: '/products/crest-2-no-name.png',
    textPosition: 60,     // Different position for a different crest
    fontSize: 0.10,
    width: 70,
    letterSpacing: 0.10
  },
  // Default fallback
  'default': {
    imagePath: '/golf-products/crest-1-no-name.png',
    textPosition: 55,
    fontSize: 0.09,
    width: 65,
    letterSpacing: 0.15
  }
}

export function getCrestConfig(crestName: string = 'crest-1-no-name'): CrestConfig {
  return CREST_CONFIGS[crestName] || CREST_CONFIGS['default']
}