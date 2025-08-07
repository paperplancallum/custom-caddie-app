// Font configurations for crest text
export interface CrestFont {
  name: string;
  family: string;
  weight: number | string;
  style?: string;
  letterSpacing?: string;
}

export const CREST_FONTS: Record<string, CrestFont> = {
  serif: {
    name: 'Classic Serif',
    family: 'Georgia, "Times New Roman", serif',
    weight: 600,
    letterSpacing: '0.15em'
  },
  sans: {
    name: 'Modern Sans',
    family: '"Helvetica Neue", Arial, sans-serif',
    weight: 700,
    letterSpacing: '0.1em'
  },
  script: {
    name: 'Elegant Script',
    family: '"Baskerville", "Palatino Linotype", serif',
    weight: 400,
    style: 'italic',
    letterSpacing: '0.05em'
  },
  gothic: {
    name: 'Gothic Bold',
    family: '"Franklin Gothic Medium", "Arial Black", sans-serif',
    weight: 900,
    letterSpacing: '0.2em'
  },
  modern: {
    name: 'Contemporary',
    family: '"Futura", "Century Gothic", sans-serif',
    weight: 500,
    letterSpacing: '0.25em'
  }
}

export function getCrestFont(fontKey: string = 'serif'): CrestFont {
  return CREST_FONTS[fontKey] || CREST_FONTS.serif;
}