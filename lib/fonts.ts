export const FONT_STYLES = {
  classic: { 
    name: 'Baskerville', 
    className: 'font-serif',
    style: { fontFamily: 'Baskerville, "Baskerville Old Face", "Hoefler Text", Garamond, "Times New Roman", serif' }
  },
  modern: { 
    name: 'Didot', 
    className: 'font-serif tracking-wide',
    style: { fontFamily: 'Didot, "Didot LT STD", "Hoefler Text", Garamond, Georgia, serif', letterSpacing: '0.02em' }
  },
  script: { 
    name: 'Garamond', 
    className: 'font-serif',
    style: { fontFamily: 'Garamond, "EB Garamond", Georgia, serif' }
  },
  bold: {
    name: 'Caslon',
    className: 'font-serif',
    style: { fontFamily: '"Adobe Caslon Pro", "Caslon", Georgia, serif', fontWeight: '500' }
  },
  elegant: {
    name: 'Sabon',
    className: 'font-serif tracking-wider',
    style: { fontFamily: 'Sabon, "Hoefler Text", "Palatino Linotype", Palatino, Georgia, serif', letterSpacing: '0.03em' }
  }
}

export const FONT_SIZES = {
  small: { 
    name: 'Small', 
    className: 'text-xs',
    scale: 0.8
  },
  medium: { 
    name: 'Medium', 
    className: 'text-sm',
    scale: 1
  },
  large: { 
    name: 'Large', 
    className: 'text-base',
    scale: 1.2
  }
}