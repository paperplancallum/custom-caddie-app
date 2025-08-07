# Sticky Preview Logic Documentation

## Overview
The Custom Caddie app uses sticky preview sections on mobile devices to show live previews of customizations as users scroll through options. This ensures users can always see how their changes affect the final product.

## Implementation Details

### 1. Crest Setup Page (Step 2)
**Location:** `/app/customize/page.tsx` (activeStep === 2)

#### Structure:
```jsx
{/* Mobile Sticky Preview - Shows selected crest when scrolling */}
<div className="lg:hidden sticky top-0 bg-[#FAF7F2] border-b border-[#E8DCC4]/30 py-1 -mx-6 px-6 mb-6 z-40">
  <div className="flex items-center justify-center">
    <CrestPNGMeasured 
      size={180}
      // ... props
    />
  </div>
</div>
```

#### Key Features:
- **Size:** 180px crest preview
- **Visibility:** Only on mobile (`lg:hidden`)
- **Background:** Solid `bg-[#FAF7F2]` to prevent bleed-through
- **Positioning:** `sticky top-0` with `z-40` for proper layering
- **Edge-to-edge:** `-mx-6 px-6` extends background to screen edges
- **Padding:** Minimal `py-1` to save screen space

### 2. Golf Balls Customization (Step 3)
**Location:** `/app/customize/page.tsx` (activeStep === 3)

#### Structure:
```jsx
{/* Mobile Sticky Preview - Shows golf ball with current customization */}
<div className="lg:hidden sticky top-0 bg-[#FAF7F2] border-b border-[#E8DCC4]/30 py-3 -mx-6 px-6 mb-6 z-40">
  <div className="flex items-center justify-center">
    <div className="relative w-48 h-48">
      <Image src="/products/ball-blank.png" fill />
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Conditional rendering: crest or text */}
      </div>
    </div>
  </div>
</div>
```

#### Key Features:
- **Size:** 192px ball preview (w-48 h-48)
- **Dynamic Content:** Shows either crest or custom text based on selection
- **Crest Scaling:** 150 * (crestSize/100) * 0.75
- **Text Scaling:** Font sizes multiplied by 0.9 for preview
- **Real-time Updates:** Reflects all customization changes instantly

### 3. Golf Towel Customization (Step 5)
**Location:** `/app/customize/page.tsx` (activeStep === 5)

#### Structure:
```jsx
{/* Mobile Sticky Preview - Shows golf towel with current customization */}
<div className="lg:hidden sticky top-0 bg-[#FAF7F2] border-b border-[#E8DCC4]/30 py-3 -mx-4 sm:-mx-6 px-4 sm:px-6 mb-6 z-40">
  <div className="flex items-center justify-center">
    <div className="relative">
      <div className="w-40 h-28 rounded shadow-md relative overflow-hidden">
        {/* Towel with dynamic color */}
        {/* Texture lines */}
        {/* White embroidery in bottom-right */}
      </div>
    </div>
  </div>
</div>
```

#### Key Features:
- **Size:** 160px x 112px towel preview (w-40 h-28)
- **Dynamic Background:** Changes based on selected towel color (navy/black/red)
- **Embroidery:** Always white, positioned bottom-right
- **Font Scaling:** Font size multiplied by 0.7 for mobile preview
- **Real-time Updates:** Reflects color, text, font family, and size changes

### 4. Divot Tool Customization (Step 6)
**Location:** `/app/customize/page.tsx` (activeStep === 6)

#### Structure:
```jsx
{/* Mobile Sticky Preview - Shows divot tool with crest */}
<div className="lg:hidden sticky top-0 bg-[#FAF7F2] border-b border-[#E8DCC4]/30 py-3 -mx-4 sm:-mx-6 px-4 sm:px-6 mb-6 z-40">
  <div className="flex items-center justify-center">
    <div className="relative w-32 h-40">
      <Image src="/products/8.png" fill />
      {/* Crest overlay */}
      <CrestPNGMeasured size={30 * (crestSize/100)} />
    </div>
  </div>
</div>
```

#### Key Features:
- **Size:** 128px x 160px divot tool preview (w-32 h-40)
- **Fixed Finish:** Always silver (removed color options)
- **Crest Only:** Shows user's selected crest (no text options)
- **Size Adjustment:** Plus/minus controls for crest size (50-150%)
- **Real-time Updates:** Reflects crest size changes instantly

## CSS Requirements

### Scrollbar Hiding
**Location:** `/app/globals.css`

```css
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;  /* Chrome, Safari and Opera */
}
```

## Common Patterns

### 1. Sticky Container Structure
```jsx
<div className="lg:hidden sticky top-0 bg-[#FAF7F2] border-b border-[#E8DCC4]/30 py-X -mx-6 px-6 mb-6 z-40">
  <div className="flex items-center justify-center">
    {/* Preview content */}
  </div>
</div>
```

### 2. Responsive Visibility
- Always use `lg:hidden` to show only on mobile/tablet
- Desktop uses side-by-side layout in right column

### 3. Background Handling
- Always use solid background color (no transparency)
- Use `-mx-6 px-6` to extend background edge-to-edge
- This prevents elements behind from showing through

### 4. Z-Index Management
- Use `z-40` for sticky previews
- Ensures preview stays above scrolling content
- Below modal overlays (z-50)

## Scaling Formulas

### Crest on Golf Ball
```javascript
size = 150 * (crestSize/100) * 0.75
// Base: 150px
// User adjustment: crestSize percentage
// Preview scale: 0.75 for mobile
```

### Text on Golf Ball
```javascript
fontSize = originalSize * 0.9
// Scales text to 90% for mobile preview
```

## Known Adjustments

### Current Sizes:
- **Crest Preview (Step 2):** 180px
- **Golf Ball Preview (Step 3):** 192px (w-48)
- **Golf Tee Preview (Step 4):** 288px x 192px (w-72 h-48)
- **Golf Towel Preview (Step 5):** 160px x 112px (w-40 h-28)
- **Divot Tool Preview (Step 6):** 128px x 160px (w-32 h-40)
- **Golf Ball Crest:** Base 150px (appears as 100% to user)
- **Golf Tee Text Position:** top: 48%, left: 53%
- **Divot Tool Crest:** Base 30px for mobile, 45px for desktop

## Troubleshooting

### Common Issues:
1. **Content bleeding through:** Ensure solid background, no transparency
2. **Preview cut off:** Check padding and margins
3. **Not sticky:** Verify parent containers don't have overflow hidden
4. **Wrong size:** Adjust size prop or width/height classes

### Testing Checklist:
- [ ] Preview updates in real-time
- [ ] Background fully opaque
- [ ] No horizontal scroll on mobile
- [ ] Smooth scroll behavior
- [ ] Correct scaling at different sizes
- [ ] Edge-to-edge background coverage

## Future Considerations

When adding new sticky previews:
1. Follow the same container structure
2. Keep mobile preview sizes reasonable (120-200px)
3. Test on various mobile devices
4. Ensure real-time updates work
5. Check z-index layering
6. Verify background opacity

## File References

- **Main Implementation:** `/app/customize/page.tsx`
- **Preview Components:** `/components/CrestPNGMeasured.tsx`, `/components/RealisticProductPreview.tsx`
- **Styles:** `/app/globals.css`
- **Types:** `/types/giftbox.ts`