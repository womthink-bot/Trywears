import os
import subprocess
import shutil
import glob
from pathlib import Path

APP_ROOT = Path(".").resolve()
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
        return
    print(f"Converting video {src_path} -> {dest_path}")
    cmd = f'ffmpeg -y -i "{src_path}" -c:v libvpx-vp9 -crf 32 -b:v 0 -deadline realtime -cpu-used 4 -c:a libopus -b:a 96k "{dest_path}"'
    run_cmd(cmd)

def convert_image_to_webp(src_path, dest_path):
    dest_path.parent.mkdir(parents=True, exist_ok=True)
    if dest_path.exists() and dest_path.stat().st_size > 100:
        return
    print(f"Converting image {src_path} -> {dest_path}")
    cmd = f'convert "{src_path}" -quality 85 "{dest_path}"'
    run_cmd(cmd)

def safe_copy(src, dest):
    if src.resolve() == dest.resolve():
        return
    dest.parent.mkdir(parents=True, exist_ok=True)
    try:
        shutil.copy2(src, dest)
    except Exception as e:
        print(f"Copy error ({src} -> {dest}): {e}")

def main():
    print(f"=== STARTING MEDIA CONVERSION & PAGE-BASED REORGANIZATION in {PUBLIC_DIR} ===")
    
    # 1. Target Directory Structure
    page_dirs = [
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
        PUBLIC_DIR / "media/global",
        PUBLIC_DIR / "videos",
        PUBLIC_DIR / "images"
    ]
    for d in page_dirs:
        d.mkdir(parents=True, exist_ok=True)
        
    # 2. Convert all MP4 files to WEBM
    all_mp4s = list(PUBLIC_DIR.rglob("*.mp4"))
    print(f"Found {len(all_mp4s)} MP4 files")
    for mp4 in all_mp4s:
        webm_path = mp4.with_suffix(".webm")
        convert_mp4_to_webm(mp4, webm_path)
        
    # 3. Convert all images to WEBP
    all_imgs = [p for p in PUBLIC_DIR.rglob("*") if p.is_file() and p.suffix.lower() in [".png", ".jpg", ".jpeg"]]
    print(f"Found {len(all_imgs)} image files to convert to WEBP")
    for img in all_imgs:
        webp_dest = img.with_suffix(".webp")
        convert_image_to_webp(img, webp_dest)

    # 4. Map videos to respective page folders
    video_page_map = {
        # Home page videos
        "sportswearsGP": ["media/home/videos/sportswearsGP.webm", "videos/sportswearsGP.webm"],
        "sportswearsBG": ["media/home/videos/sportswearsBG.webm", "videos/sportswearsBG.webm"],
        "gymandfitnessGP": ["media/home/videos/gymandfitnessGP.webm", "videos/gymandfitnessGP.webm"],
        "gymandfitnessBG": ["media/home/videos/gymandfitnessBG.webm", "videos/gymandfitnessBG.webm"],
        "streetwearsGP": ["media/home/videos/streetwearsGP.webm", "videos/streetwearsGP.webm"],
        "streetwearsBG": ["media/home/videos/streetwearsBG.webm", "videos/streetwearsBG.webm"],
        "leatherGP": ["media/home/videos/leatherGP.webm", "videos/leatherGP.webm"],
        "leatherBG": ["media/home/videos/leatherBG.webm", "videos/leatherBG.webm"],
        "LeatherBG": ["media/home/videos/LeatherBG.webm", "videos/LeatherBG.webm", "media/quality/videos/LeatherBG.webm"],
        "allPV": ["media/home/videos/allPV.webm", "videos/allPV.webm"],

        # About Us page videos
        "sportswearsAB1": ["media/about/videos/sportswearsAB1.webm", "videos/sportswearsAB1.webm"],
        "gymandfitnessAB2": ["media/about/videos/gymandfitnessAB2.webm", "videos/gymandfitnessAB2.webm"],
        "streetwearsAB3": ["media/about/videos/streetwearsAB3.webm", "videos/streetwearsAB3.webm"],
        "jacketsAB4": ["media/about/videos/jacketsAB4.webm", "videos/jacketsAB4.webm"],
        "aboutV1": ["media/about/videos/aboutV1.webm", "videos/aboutV1.webm"],

        # Quality & Process page videos
        "qualityprocess1": ["media/quality/videos/qualityprocess1.webm", "videos/qualityprocess1.webm"],

        # Services page videos
        "design_customization_SR1": ["media/services/videos/design_customization_SR1.webm", "videos/design_customization_SR1.webm"],
        "brand_customization_SR2": ["media/services/videos/brand_customization_SR2.webm", "videos/brand_customization_SR2.webm"],
        "customize_product_3d_SR3": ["media/services/videos/customize_product_3d_SR3.webm", "videos/customize_product_3d_SR3.webm"],
        "sample_development_SR4": ["media/services/videos/sample_development_SR4.webm", "videos/sample_development_SR4.webm"],
        "bulk_production_SR5": ["media/services/videos/bulk_production_SR5.webm", "videos/bulk_production_SR5.webm"],

        # Support page videos
        "shipping_policy_SQ1": ["media/support/videos/shipping_policy_SQ1.webm", "videos/shipping_policy_SQ1.webm"],
        "return_refund_policy_SQ2": ["media/support/videos/return_refund_policy_SQ2.webm", "videos/return_refund_policy_SQ2.webm"],
        "terms_conditions_SQ3": ["media/support/videos/terms_conditions_SQ3.webm", "videos/terms_conditions_SQ3.webm"],
        "moq_lead_time_SQ4": ["media/support/videos/moq_lead_time_SQ4.webm", "videos/moq_lead_time_SQ4.webm"],
        "order_process_SQ5": ["media/support/videos/order_process_SQ5.webm", "videos/order_process_SQ5.webm"],
    }

    all_webms = list(PUBLIC_DIR.rglob("*.webm"))
    for webm in all_webms:
        stem = webm.stem
        for key, dest_list in video_page_map.items():
            if key.lower() == stem.lower():
                for rel_dest in dest_list:
                    target = PUBLIC_DIR / rel_dest
                    safe_copy(webm, target)

    # 5. Populate page images
    # Global & Brand
    for logo_src in PUBLIC_DIR.rglob("trylogo*.webp"):
        safe_copy(logo_src, PUBLIC_DIR / "media/global/trylogo.webp")
        safe_copy(logo_src, PUBLIC_DIR / "media/home/images/trylogo.webp")
        break

    # Home Page Showcase Images
    for p in list(PUBLIC_DIR.rglob("*.webp")):
        if any(token in p.name.lower() for token in ["cp1", "cp2", "cp3", "cp4", "cp5", "cp6", "cp7", "hero_", "product_"]):
            safe_copy(p, PUBLIC_DIR / f"media/home/images/{p.name}")

    # Product category folders (.webp)
    for cat in ["sports-wears", "gym-fitness", "street-wears", "leather-jackets"]:
        for p in list(PUBLIC_DIR.rglob(f"*{cat}*")):
            if p.is_file() and p.suffix.lower() == ".webp":
                safe_copy(p, PUBLIC_DIR / f"media/products/{cat}/{p.name}")
                safe_copy(p, PUBLIC_DIR / f"images/{cat}/{p.name}")

    # Copy all webms to root /public as well for direct path references
    for webm in list(PUBLIC_DIR.rglob("*.webm")):
        safe_copy(webm, PUBLIC_DIR / webm.name)
        safe_copy(webm, PUBLIC_DIR / "videos" / webm.name)

    print("=== MEDIA REORGANIZATION COMPLETED SUCCESSFULLY ===")

if __name__ == "__main__":
    main()
