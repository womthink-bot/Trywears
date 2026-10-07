import os
import subprocess
import shutil
import glob
from pathlib import Path

APP_ROOT = Path("/app/applet")
PUBLIC_DIR = APP_ROOT / "public"

def run_cmd(cmd):
    print(f"Running: {cmd}")
    res = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if res.returncode != 0:
        print(f"Error ({res.returncode}): {res.stderr}")
    return res

def convert_mp4_to_webm(src_path, dest_path):
    dest_path.parent.mkdir(parents=True, exist_ok=True)
    if dest_path.exists() and dest_path.stat().st_size > 1000:
        print(f"Already exists: {dest_path}")
        return
    print(f"Converting video {src_path} -> {dest_path}")
    cmd = f'ffmpeg -y -i "{src_path}" -c:v libvpx-vp9 -crf 32 -b:v 0 -deadline realtime -cpu-used 4 -c:a libopus -b:a 96k "{dest_path}"'
    run_cmd(cmd)

def convert_image_to_webp(src_path, dest_path):
    dest_path.parent.mkdir(parents=True, exist_ok=True)
    if dest_path.exists() and dest_path.stat().st_size > 100:
        print(f"Already exists: {dest_path}")
        return
    print(f"Converting image {src_path} -> {dest_path}")
    cmd = f'convert "{src_path}" -quality 85 "{dest_path}"'
    run_cmd(cmd)

def main():
    print("=== STARTING MEDIA CONVERSION & PAGE-BASED REORGANIZATION ===")
    
    # 1. Target Directory Structure
    dirs = [
        PUBLIC_DIR / "media/home/videos",
        PUBLIC_DIR / "media/home/images",
        PUBLIC_DIR / "media/about/videos",
        PUBLIC_DIR / "media/about/images",
        PUBLIC_DIR / "media/quality/videos",
        PUBLIC_DIR / "media/quality/images",
        PUBLIC_DIR / "media/services/videos",
        PUBLIC_DIR / "media/services/images",
        PUBLIC_DIR / "media/support/videos",
        PUBLIC_DIR / "media/support/images",
        PUBLIC_DIR / "media/products/sports-wears",
        PUBLIC_DIR / "media/products/gym-fitness",
        PUBLIC_DIR / "media/products/street-wears",
        PUBLIC_DIR / "media/products/leather-jackets",
        PUBLIC_DIR / "media/global"
    ]
    for d in dirs:
        d.mkdir(parents=True, exist_ok=True)
        
    # 2. Find and convert all MP4s to WEBM in place and in organized locations
    all_mp4s = list(PUBLIC_DIR.rglob("*.mp4"))
    print(f"Found {len(all_mp4s)} MP4 files to convert to WEBM")
    for mp4 in all_mp4s:
        webm_path = mp4.with_suffix(".webm")
        convert_mp4_to_webm(mp4, webm_path)
        
    # Also find all existing webm files
    all_webms = list(PUBLIC_DIR.rglob("*.webm"))
    print(f"Found {len(all_webms)} WEBM files")

    # Map videos to organized page folders
    video_page_map = {
        # Home page videos
        "sportswearsGP": "media/home/videos/sportswearsGP.webm",
        "sportswearsBG": "media/home/videos/sportswearsBG.webm",
        "gymandfitnessGP": "media/home/videos/gymandfitnessGP.webm",
        "gymandfitnessBG": "media/home/videos/gymandfitnessBG.webm",
        "streetwearsGP": "media/home/videos/streetwearsGP.webm",
        "streetwearsBG": "media/home/videos/streetwearsBG.webm",
        "leatherGP": "media/home/videos/leatherGP.webm",
        "leatherBG": "media/home/videos/leatherBG.webm",
        "LeatherBG": "media/home/videos/LeatherBG.webm",
        "allPV": "media/home/videos/allPV.webm",

        # About Us page videos
        "sportswearsAB1": "media/about/videos/sportswearsAB1.webm",
        "gymandfitnessAB2": "media/about/videos/gymandfitnessAB2.webm",
        "streetwearsAB3": "media/about/videos/streetwearsAB3.webm",
        "jacketsAB4": "media/about/videos/jacketsAB4.webm",
        "aboutV1": "media/about/videos/aboutV1.webm",

        # Quality & Process page videos
        "qualityprocess1": "media/quality/videos/qualityprocess1.webm",

        # Services page videos
        "design_customization_SR1": "media/services/videos/design_customization_SR1.webm",
        "brand_customization_SR2": "media/services/videos/brand_customization_SR2.webm",
        "customize_product_3d_SR3": "media/services/videos/customize_product_3d_SR3.webm",
        "sample_development_SR4": "media/services/videos/sample_development_SR4.webm",
        "bulk_production_SR5": "media/services/videos/bulk_production_SR5.webm",

        # Support page videos
        "shipping_policy_SQ1": "media/support/videos/shipping_policy_SQ1.webm",
        "return_refund_policy_SQ2": "media/support/videos/return_refund_policy_SQ2.webm",
        "terms_conditions_SQ3": "media/support/videos/terms_conditions_SQ3.webm",
        "moq_lead_time_SQ4": "media/support/videos/moq_lead_time_SQ4.webm",
        "order_process_SQ5": "media/support/videos/order_process_SQ5.webm",
    }

    for webm in all_webms:
        stem = webm.stem
        for key, rel_dest in video_page_map.items():
            if key.lower() == stem.lower():
                target = PUBLIC_DIR / rel_dest
                if not target.exists():
                    shutil.copy2(webm, target)
                    print(f"Copied {webm} -> {target}")

    # Ensure all root and videos/ folders also have .webm copies
    (PUBLIC_DIR / "videos").mkdir(exist_ok=True)
    for webm in (PUBLIC_DIR / "media").rglob("*.webm"):
        root_copy = PUBLIC_DIR / webm.name
        videos_copy = PUBLIC_DIR / "videos" / webm.name
        if not root_copy.exists():
            shutil.copy2(webm, root_copy)
        if not videos_copy.exists():
            shutil.copy2(webm, videos_copy)

    # 3. Convert all images (.jpg, .jpeg, .png) to .webp and organize by page
    all_imgs = [p for p in PUBLIC_DIR.rglob("*") if p.suffix.lower() in [".png", ".jpg", ".jpeg"]]
    print(f"Found {len(all_imgs)} images to convert to WEBP")
    for img in all_imgs:
        webp_dest = img.with_suffix(".webp")
        convert_image_to_webp(img, webp_dest)

    # Copy custom showcase images cp1-cp7 to media/home/images/
    for i in range(1, 8):
        for src in PUBLIC_DIR.rglob(f"cp{i}.webp"):
            dest = PUBLIC_DIR / f"media/home/images/cp{i}.webp"
            shutil.copy2(src, dest)
            print(f"Copied {src} -> {dest}")
            break

    # Copy logo to media/global/
    for src in PUBLIC_DIR.rglob("trylogo.*"):
        dest = PUBLIC_DIR / f"media/global/{src.name}"
        shutil.copy2(src, dest)
        if src.suffix.lower() == ".png":
            convert_image_to_webp(src, PUBLIC_DIR / "media/global/trylogo.webp")

    print("=== MEDIA ORGANIZATION & CONVERSION COMPLETED ===")

if __name__ == "__main__":
    main()
