import { PresetSet } from '@/types'

export const PRESET_SETS: PresetSet[] = [
  {
    id: 'A',
    name: 'The Executive',
    description: 'Perfect for the corporate golfer',
    price: 9999,
    image: '/images/set-a.jpg',
    includes: ['Golf Balls (12)', 'Premium Tees (25)', 'Engraved Divot Tool', 'Metal Ball Marker'],
    popular: true,
  },
  {
    id: 'B',
    name: 'The Weekend Warrior',
    description: 'Everything for your weekend rounds',
    price: 12999,
    image: '/images/set-b.jpg',
    includes: ['Golf Balls (12)', 'Premium Tees (50)', 'Engraved Divot Tool', 'Metal Ball Marker', 'Golf Towel'],
  },
  {
    id: 'C',
    name: 'The Collector',
    description: 'A premium gift for the golf enthusiast',
    price: 7999,
    image: '/images/set-c.jpg',
    includes: ['Golf Balls (6)', 'Premium Tees (25)', 'Leather Ball Marker'],
  },
  {
    id: 'custom',
    name: 'Build Your Own',
    description: 'Create a completely custom set',
    price: 0,
    image: '/images/custom-set.jpg',
    includes: ['Choose your own items'],
  },
]

export const FONTS = [
  { value: 'serif', label: 'Classic Serif', className: 'font-serif' },
  { value: 'sans', label: 'Modern Sans', className: 'font-sans' },
  { value: 'script', label: 'Elegant Script', className: 'font-serif italic' },
  { value: 'bold', label: 'Bold Impact', className: 'font-bold' },
]

export const COLORS = {
  text: [
    { value: 'black', label: 'Black', hex: '#000000' },
    { value: 'gold', label: 'Gold', hex: '#d4af37' },
    { value: 'silver', label: 'Silver', hex: '#c0c0c0' },
    { value: 'white', label: 'White', hex: '#ffffff' },
    { value: 'navy', label: 'Navy', hex: '#000080' },
  ],
  products: [
    { value: 'white', label: 'White', hex: '#ffffff' },
    { value: 'black', label: 'Black', hex: '#000000' },
    { value: 'navy', label: 'Navy', hex: '#000080' },
    { value: 'forest', label: 'Forest Green', hex: '#228b22' },
    { value: 'burgundy', label: 'Burgundy', hex: '#800020' },
    { value: 'gray', label: 'Gray', hex: '#808080' },
  ],
}

export const TEE_COLORS = [
  { value: 'natural', label: 'Natural Wood', hex: '#deb887' },
  { value: 'white', label: 'White', hex: '#ffffff' },
  { value: 'black', label: 'Black', hex: '#000000' },
  { value: 'red', label: 'Red', hex: '#ff0000' },
  { value: 'blue', label: 'Blue', hex: '#0000ff' },
]

export const EMBROIDERY_TYPES = [
  { value: 'initials', label: 'Initials Only' },
  { value: 'name', label: 'Full Name' },
  { value: 'logo', label: 'Custom Logo' },
]

export const BALL_MARKER_TYPES = [
  { value: 'metal', label: 'Brushed Metal', price: 1499 },
  { value: 'leather', label: 'Premium Leather', price: 1999 },
]

export const MAX_TEXT_LENGTHS = {
  golfBalls: 15,
  tees: 20,
  divotTool: 25,
  towel: 30,
  initials: 3,
}