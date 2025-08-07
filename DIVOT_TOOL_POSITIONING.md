# Divot Tool Crest Positioning Guide

## Mobile Preview (Sticky)
**Location:** `/app/customize/page.tsx` (around line 1734)

```jsx
{/* Crest overlay - Adjust top-[15%] to move up/down, left-1/2 is centered */}
<div className="absolute top-[15%] left-1/2 -translate-x-1/2">
  <CrestPNGMeasured 
    size={45 * ((customization.items.divotTool.personalization.crestSize || 100) / 100)}
```

### Adjustments:
- **Vertical Position:** Change `top-[15%]` 
  - Lower values (e.g., `top-[10%]`) move crest UP
  - Higher values (e.g., `top-[20%]`) move crest DOWN
- **Horizontal Position:** Change `left-1/2` (currently centered)
  - `left-[45%]` moves LEFT
  - `left-[55%]` moves RIGHT
- **Base Size:** Change `45` to make crest bigger/smaller
  - Current: `45` pixels base size
  - Increase to `60` for larger crest
  - Decrease to `30` for smaller crest

## Desktop Preview
**Location:** `/components/RealisticProductPreview.tsx` (around line 231)

```jsx
{/* Overlay crest on medallion - Adjust top-[15%] to move up/down */}
<div className="absolute top-[15%] left-1/2 -translate-x-1/2">
  <CrestPNGMeasured 
    size={60 * ((items.divotTool.personalization.crestSize || 100) / 100)}
```

### Adjustments:
- **Vertical Position:** Change `top-[15%]`
  - Lower values (e.g., `top-[10%]`) move crest UP
  - Higher values (e.g., `top-[20%]`) move crest DOWN
- **Horizontal Position:** Change `left-1/2` (currently centered)
  - `left-[45%]` moves LEFT
  - `left-[55%]` moves RIGHT
- **Base Size:** Change `60` to make crest bigger/smaller
  - Current: `60` pixels base size
  - Increase to `80` for larger crest
  - Decrease to `40` for smaller crest

## Preview Container Sizes

### Mobile (Sticky Preview)
- **Current:** `w-48 h-60` (192px × 240px)
- Located in `/app/customize/page.tsx` line ~1726

### Desktop Preview
- **Current:** `w-64 h-80` (256px × 320px)
- Located in `/components/RealisticProductPreview.tsx` line ~222

## Quick Examples

### Move crest higher and make it bigger:
```jsx
<div className="absolute top-[10%] left-1/2 -translate-x-1/2">
  <CrestPNGMeasured 
    size={70 * ((items.divotTool.personalization.crestSize || 100) / 100)}
```

### Move crest lower and smaller:
```jsx
<div className="absolute top-[25%] left-1/2 -translate-x-1/2">
  <CrestPNGMeasured 
    size={35 * ((items.divotTool.personalization.crestSize || 100) / 100)}
```

### Offset slightly to the right:
```jsx
<div className="absolute top-[15%] left-[52%] -translate-x-1/2">
```