import os
import shutil
from pathlib import Path

PUBLIC = Path("public").resolve()

def ensure_dir(p):
    p.mkdir(parents=True, exist_ok=True)

def copy_if_exists(src, dest):
    if not src.exists():
        return
    if src.resolve() == dest.resolve():
        return
    dest.parent.mkdir(parents=True, exist_ok=True)
    try:
        shutil.copy2(src, dest)
        print(f"Copied: {src.name} -> {dest}")
    except Exception as e:
        print(f"Error copying {src} -> {dest}: {e}")

def main():
    # 1. Ensure all directories exist
    home_v = PUBLIC / "media/home/videos"
    home_i = PUBLIC / "media/home/images"
    about_v = PUBLIC / "media/about/videos"
    about_i = PUBLIC / "media/about/images"
    quality_v = PUBLIC / "media/quality/videos"
    quality_i = PUBLIC / "media/quality/images"
    services_v = PUBLIC / "media/services/videos"
    services_i = PUBLIC / "media/services/images"
    support_v = PUBLIC / "media/support/videos"
    support_i = PUBLIC / "media/support/images"
    global_dir = PUBLIC / "media/global"
    
    for d in [home_v, home_i, about_v, about_i, quality_v, quality_i, services_v, services_i, support_v, support_i, global_dir]:
        ensure_dir(d)

    # 2. Map Home Videos
    home_videos = ["sportswearsGP", "sportswearsBG", "gymandfitnessGP", "gymandfitnessBG", "streetwearsGP", "streetwearsBG", "leatherGP", "leatherBG", "LeatherBG", "allPV"]
    for name in home_videos:
        for f in PUBLIC.rglob(f"{name}.webm"):
            copy_if_exists(f, home_v / f"{name}.webm")
            copy_if_exists(f, PUBLIC / "videos" / f"{name}.webm")
            copy_if_exists(f, PUBLIC / f"{name}.webm")
            break

    # 3. Map About Us Videos
    about_videos = ["aboutV1", "sportswearsAB1", "gymandfitnessAB2", "streetwearsAB3", "jacketsAB4"]
    for name in about_videos:
        for f in PUBLIC.rglob(f"{name}.webm"):
            copy_if_exists(f, about_v / f"{name}.webm")
            copy_if_exists(f, PUBLIC / "videos" / f"{name}.webm")
            copy_if_exists(f, PUBLIC / f"{name}.webm")
            break

    # 4. Map Quality & Process Videos
    quality_videos = ["qualityprocess1", "LeatherBG"]
    for name in quality_videos:
        for f in PUBLIC.rglob(f"{name}.webm"):
            copy_if_exists(f, quality_v / f"{name}.webm")
            copy_if_exists(f, PUBLIC / "videos" / f"{name}.webm")
            copy_if_exists(f, PUBLIC / f"{name}.webm")
            break

    # 5. Map Services Videos
    services_videos = ["design_customization_SR1", "brand_customization_SR2", "customize_product_3d_SR3", "sample_development_SR4", "bulk_production_SR5"]
    for name in services_videos:
        for f in PUBLIC.rglob(f"{name}.webm"):
            copy_if_exists(f, services_v / f"{name}.webm")
            copy_if_exists(f, PUBLIC / "videos" / f"{name}.webm")
            copy_if_exists(f, PUBLIC / f"{name}.webm")
            break

    # 6. Map Support Videos
    support_videos = ["shipping_policy_SQ1", "return_refund_policy_SQ2", "terms_conditions_SQ3", "moq_lead_time_SQ4", "order_process_SQ5"]
    for name in support_videos:
        for f in PUBLIC.rglob(f"{name}.webm"):
            copy_if_exists(f, support_v / f"{name}.webm")
            copy_if_exists(f, PUBLIC / "videos" / f"{name}.webm")
            copy_if_exists(f, PUBLIC / f"{name}.webm")
            break

    # 7. Map Global Logos
    for logo_name in ["trylogo", "trylogo_transparent", "logo"]:
        for f in PUBLIC.rglob(f"{logo_name}.webp"):
            copy_if_exists(f, global_dir / f"{logo_name}.webp")
            copy_if_exists(f, home_i / f"{logo_name}.webp")
            copy_if_exists(f, PUBLIC / "images" / f"{logo_name}.webp")
            break

    # 8. Map Category Products into media/products/
    for cat in ["sports-wears", "gym-fitness", "street-wears", "leather-jackets"]:
        cat_dir = PUBLIC / f"media/products/{cat}"
        ensure_dir(cat_dir)
        for f in (PUBLIC / f"products/{cat}").glob("*.webp"):
            copy_if_exists(f, cat_dir / f.name)
            copy_if_exists(f, PUBLIC / f"images/{cat}" / f.name)

    # 9. Map Home Images
    for f in list(PUBLIC.rglob("*.webp")):
        if any(f.name.startswith(prefix) for prefix in ["cp", "b2b_factory", "gloves", "shorts", "tracksuit", "robe", "shin_guards", "sports_bg", "gym_bg", "street_bg", "leather_bg"]):
            copy_if_exists(f, home_i / f.name)

    print("ALL MEDIA ORGANIZED ACCORDING TO PAGES AND FORMATS (.webm / .webp)!")

if __name__ == "__main__":
    main()
