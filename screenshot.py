"""
Automatic Website Screenshot Tool
Requires: pip install selenium pillow
"""

import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from PIL import Image
import os

def capture_website(url, output_filename, width=1920, height=1080):
    """
    Capture a screenshot of a website
    """
    # Setup Chrome options
    chrome_options = Options()
    chrome_options.add_argument('--headless')  # Run in background
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    chrome_options.add_argument(f'--window-size={width},{height}')

    # Initialize driver
    driver = webdriver.Chrome(options=chrome_options)

    try:
        print(f"📸 Capturing {url}...")
        driver.get(url)

        # Wait for page to load
        time.sleep(5)  # Adjust if needed for slower sites

        # Take screenshot
        driver.save_screenshot(output_filename)

        # Resize to 400x250 for portfolio cards
        img = Image.open(output_filename)

        # Create thumbnail version
        thumbnail = img.resize((400, 250), Image.Resampling.LANCZOS)
        thumb_filename = output_filename.replace('.png', '_thumb.png')
        thumbnail.save(thumb_filename)

        print(f"✅ Saved: {output_filename}")
        print(f"✅ Thumbnail: {thumb_filename}")

    finally:
        driver.quit()

def main():
    """
    Capture screenshots for portfolio projects
    """
    # Create images directory if it doesn't exist
    os.makedirs('assets/images', exist_ok=True)

    # Define websites to capture
    websites = [
        {
            'url': 'https://www.quickshop.fit',
            'filename': 'assets/images/quickshop.jpg',
            'name': 'QuickShop'
        },
        {
            'url': 'http://digitwin-platform-frontend.s3-website-ap-southeast-1.amazonaws.com',
            'filename': 'assets/images/digitwin.jpg',
            'name': 'Digital Twin Platform'
        }
    ]

    print("🚀 Starting screenshot capture...")

    for site in websites:
        try:
            capture_website(site['url'], site['filename'])
        except Exception as e:
            print(f"❌ Error capturing {site['name']}: {e}")

    print("\n✨ All screenshots captured!")
    print("Next steps:")
    print("1. Check the assets/images/ folder")
    print("2. Run: git add .")
    print("3. Run: git commit -m 'Add project screenshots'")
    print("4. Run: git push")

if __name__ == "__main__":
    main()