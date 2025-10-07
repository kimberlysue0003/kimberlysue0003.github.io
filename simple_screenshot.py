"""
Simple Screenshot Downloader using free API
No installation required, just run!
"""

import urllib.request
import time

def download_screenshot(url, filename):
    """
    Download screenshot using free API service
    """
    # Using screenshot.rocks free API (no key required)
    api_url = f"https://api.screenshot.rocks/screenshot"

    # Build the screenshot URL
    screenshot_url = f"{api_url}?url={url}&width=1920&height=1080&format=jpg"

    try:
        print(f"📸 Capturing {url}...")
        urllib.request.urlretrieve(screenshot_url, filename)
        print(f"✅ Saved: {filename}")
        return True
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def main():
    """
    Download screenshots for your portfolio projects
    """
    import os

    # Create images directory
    os.makedirs('assets/images', exist_ok=True)

    print("🚀 Downloading screenshots...\n")

    # QuickShop
    print("1. QuickShop E-commerce Platform")
    success1 = download_screenshot(
        "https://www.quickshop.fit",
        "assets/images/quickshop.jpg"
    )

    time.sleep(2)  # Be nice to the free API

    # Digital Twin
    print("\n2. Digital Twin Platform")
    success2 = download_screenshot(
        "http://digitwin-platform-frontend.s3-website-ap-southeast-1.amazonaws.com",
        "assets/images/digitwin.jpg"
    )

    if success1 and success2:
        print("\n✨ Success! Screenshots downloaded!")
        print("\nNext steps:")
        print("1. Check assets/images/ folder")
        print("2. git add .")
        print("3. git commit -m 'Add project screenshots'")
        print("4. git push")
    else:
        print("\n⚠️ Some screenshots failed. Try the manual method below.")

if __name__ == "__main__":
    main()