# Personal Portfolio Website

A modern, responsive portfolio website with 3D animations and interactive effects.

## Features

- 🎨 3D animated background using Three.js
- 📱 Fully responsive design
- ⚡ Smooth scrolling and animations
- 🎯 Project showcase with live links
- 🌙 Modern dark theme
- 🚀 Optimized for performance

## Quick Start

### Step 1: Customize Your Content

1. **Update Personal Info** in `index.html`:
   - Replace "Your Name" with your actual name
   - Update email and social media links in the contact section
   - Modify the about section content

2. **Add Your Projects** in `js/projects-data.js`:
   - Update project titles, descriptions, and links
   - Replace YouTube video IDs with your actual video IDs
   - Add project screenshots to `assets/images/`

3. **Add Screenshots**:
   - Create project screenshots (400x250px recommended)
   - Save them in `portfolio/assets/images/`
   - Name them according to your projects (e.g., quickshop.jpg, digitwin.jpg)

### Step 2: Deploy to GitHub Pages

1. **Create a GitHub Repository**:
   ```bash
   # Initialize git in the portfolio folder
   cd portfolio
   git init
   git add .
   git commit -m "Initial portfolio commit"
   ```

2. **Push to GitHub**:
   ```bash
   # Create a new repo on GitHub named 'portfolio' (or your-username.github.io for user page)
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click on "Settings" tab
   - Scroll down to "Pages" section
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

4. **Access Your Site**:
   - Your site will be available at: `https://YOUR_USERNAME.github.io/portfolio/`
   - If you named your repo `YOUR_USERNAME.github.io`, it will be at: `https://YOUR_USERNAME.github.io/`

## Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── css/
│   ├── style.css      # Main styles
│   └── animations.css # Animation styles
├── js/
│   ├── main.js        # Main JavaScript
│   ├── three-background.js # 3D background
│   ├── animations.js  # Scroll animations
│   └── projects-data.js # Projects data
└── assets/
    └── images/        # Project screenshots
```

## Customization Tips

### Colors
Edit CSS variables in `css/style.css`:
```css
:root {
    --primary-color: #6366f1;  /* Main brand color */
    --secondary-color: #8b5cf6; /* Secondary color */
    --accent-color: #ec4899;    /* Accent color */
}
```

### Typing Animation
Edit texts in `js/main.js`:
```javascript
const typingTexts = [
    "Your Title 1",
    "Your Title 2",
    // Add more titles
];
```

### Performance
- The 3D background automatically falls back to a simple animation on mobile
- Images lazy load for better performance
- Animations are throttled for smooth scrolling

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Technologies Used

- HTML5 & CSS3
- JavaScript (Vanilla)
- Three.js for 3D graphics
- GSAP for animations
- Font Awesome for icons

## License

Feel free to use this template for your personal portfolio!

## Need Help?

If you encounter any issues:
1. Check browser console for errors (F12)
2. Ensure all file paths are correct
3. Test locally before deploying
4. Clear browser cache if updates don't appear

---

Happy coding! 🚀