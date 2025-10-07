"""
Resize screenshots to portfolio card size (400x250)
"""

from PIL import Image
import os

def resize_image(input_path, output_path=None, size=(400, 250)):
    """
    Resize and crop image to exact size while maintaining aspect ratio
    """
    if output_path is None:
        output_path = input_path

    try:
        # Open image
        img = Image.open(input_path)
        print(f"Original size: {img.size}")

        # Calculate aspect ratios
        img_ratio = img.width / img.height
        target_ratio = size[0] / size[1]

        if img_ratio > target_ratio:
            # Image is wider - crop width
            new_width = int(img.height * target_ratio)
            offset = (img.width - new_width) // 2
            img = img.crop((offset, 0, offset + new_width, img.height))
        else:
            # Image is taller - crop height
            new_height = int(img.width / target_ratio)
            offset = (img.height - new_height) // 2
            img = img.crop((0, offset, img.width, offset + new_height))

        # Resize to exact dimensions
        img = img.resize(size, Image.Resampling.LANCZOS)

        # Convert to RGB if necessary (for JPEG)
        if img.mode in ('RGBA', 'P'):
            rgb_img = Image.new('RGB', img.size, (255, 255, 255))
            rgb_img.paste(img, mask=img.split()[3] if img.mode == 'RGBA' else None)
            img = rgb_img

        # Save with good quality
        img.save(output_path, 'JPEG', quality=95, optimize=True)
        print(f"Saved: {output_path} ({size[0]}x{size[1]})")
        return True

    except Exception as e:
        print(f"Error processing {input_path}: {e}")
        return False

def main():
    """
    Resize portfolio screenshots
    """
    images_dir = "assets/images"

    # Images to resize
    images = [
        "quickshop.jpg",
        "digitwin.jpg"
    ]

    print("Resizing screenshots to 400x250...\n")

    for image_name in images:
        image_path = os.path.join(images_dir, image_name)
        if os.path.exists(image_path):
            print(f"Processing: {image_name}")

            # Create backup of original
            backup_path = image_path.replace('.jpg', '_original.jpg')

            # Open and save backup
            img = Image.open(image_path)
            # Convert to RGB if needed for JPEG
            if img.mode in ('RGBA', 'P'):
                rgb_img = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'RGBA':
                    rgb_img.paste(img, mask=img.split()[3])
                else:
                    rgb_img.paste(img)
                img = rgb_img
            img.save(backup_path, 'JPEG', quality=95)
            print(f"Backup saved: {backup_path}")

            # Resize the image
            resize_image(image_path)
            print()
        else:
            print(f"Not found: {image_path}")

    print("\nDone! Your images are now 400x250 pixels")
    print("\nNext steps:")
    print("1. Check the resized images")
    print("2. git add .")
    print("3. git commit -m 'Add resized project screenshots'")
    print("4. git push")

if __name__ == "__main__":
    main()