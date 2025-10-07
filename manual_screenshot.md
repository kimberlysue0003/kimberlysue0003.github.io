# Quick Manual Screenshot Guide

## 🚀 Fastest Manual Method (2 minutes)

### Using Browser Developer Tools:

1. **Open Chrome/Edge**
2. **Press F12** to open DevTools
3. **Press Ctrl+Shift+P** (Command menu)
4. **Type "screenshot"**
5. **Select "Capture full size screenshot"**

### For Each Website:

#### QuickShop:
1. Go to: https://www.quickshop.fit
2. F12 → Ctrl+Shift+P → "Capture full size screenshot"
3. Save as: `quickshop.jpg`

#### Digital Twin:
1. Go to: http://digitwin-platform-frontend.s3-website-ap-southeast-1.amazonaws.com
2. F12 → Ctrl+Shift+P → "Capture full size screenshot"
3. Save as: `digitwin.jpg`

### Then:
1. Move both files to `portfolio/assets/images/`
2. Resize to 400x250 pixels (optional, use any image editor)

## 🎨 Online Tools (Alternative)

### Use these free screenshot services:

1. **Screenshotmachine.com**
   - Go to: https://www.screenshotmachine.com
   - Paste URL
   - Download screenshot

2. **Thum.io**
   - Direct link: https://image.thum.io/get/width/1920/https://www.quickshop.fit
   - Right-click → Save image

3. **Screenshot.rocks**
   - Go to: https://screenshot.rocks
   - Enter URL
   - Download

## 📐 Resize Images (if needed)

### Online:
- https://www.iloveimg.com/resize-image
- Upload → Set to 400x250 → Download

### Windows:
- Right-click image → "Edit with Photos"
- Resize → Custom dimensions → 400x250

## 🚀 Deploy:
```bash
cd portfolio
git add .
git commit -m "Add project screenshots"
git push
```