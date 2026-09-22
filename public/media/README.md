# Try Wears — Media & Video Directory Structure

This folder contains all images, 3D assets, and videos used across the entire website.
Organized by sections and pages:

```
public/media/
├── branding/
│   ├── trylogo.png               <- Main brand header & footer logo
│   ├── logo.png                  <- High-res primary brand crest
│   └── logo_transparent.png      <- Transparent crest for customizer
│
├── home-page/
│   ├── hero-section/
│   │   ├── sports-wears/         <- Slide 1: Sports Wears
│   │   │   ├── bg-sports.jpg     <- Full hero background image
│   │   │   ├── slot-1.jpg        <- 3D Slot 1 (Match Jersey)
│   │   │   ├── slot-2.jpg        <- 3D Slot 2 (Tracksuit)
│   │   │   ├── slot-3.jpg        <- 3D Slot 3 (Match Shorts)
│   │   │   └── slot-4.jpg        <- 3D Slot 4 (Compression Layer)
│   │   │
│   │   ├── gym-fitness/          <- Slide 2: Gym & Fitness Wears
│   │   │   ├── bg-gym.jpg        <- Full hero background image
│   │   │   ├── slot-1.jpg        <- 3D Slot 1 (Seamless Set)
│   │   │   ├── slot-2.jpg        <- 3D Slot 2 (Stringer Tank)
│   │   │   ├── slot-3.jpg        <- 3D Slot 3 (Gym Shorts)
│   │   │   └── slot-4.jpg        <- 3D Slot 4 (MMA Rashguard)
│   │   │
│   │   ├── street-wears/         <- Slide 3: Street Wears
│   │   │   ├── bg-street.jpg     <- Full hero background image
│   │   │   ├── slot-1.jpg        <- 3D Slot 1 (Heavy Hoodie)
│   │   │   ├── slot-2.jpg        <- 3D Slot 2 (Acid-Wash Tee)
│   │   │   ├── slot-3.jpg        <- 3D Slot 3 (Cargo Joggers)
│   │   │   └── slot-4.jpg        <- 3D Slot 4 (Quarter-Zip Pullover)
│   │   │
│   │   ├── leather-jackets/      <- Slide 4: Leather Jackets
│   │   │   ├── bg-leather.jpg    <- Full hero background image
│   │   │   ├── slot-1.jpg        <- 3D Slot 1 (Cowhide Biker)
│   │   │   ├── slot-2.jpg        <- 3D Slot 2 (Wool/Leather Varsity)
│   │   │   ├── slot-3.jpg        <- 3D Slot 3 (Cafe Racer Moto)
│   │   │   └── slot-4.jpg        <- 3D Slot 4 (Aviator Shearling)
│   │   │
│   │   └── 3d-videos/            <- Hero 3D Video background clips (.mp4)
│   │
│   ├── catalog-section/          <- Main 9-Product Catalog Grid
│   │   ├── prod-1-jersey.jpg     <- Pro Sublimated Match Jersey
│   │   ├── prod-2-gymset.jpg     <- Seamless Compression Fitness Set
│   │   ├── prod-3-hoodie.jpg     <- Heavyweight 450GSM Boxy Hoodie
│   │   ├── prod-4-leather-biker.jpg <- Full-Grain Biker Leather Jacket
│   │   ├── prod-5-varsity.jpg    <- Heritage Wool & Leather Varsity
│   │   ├── prod-6-rashguard.jpg  <- Vanguard MMA Compression Rashguard
│   │   ├── prod-7-tracksuit.jpg  <- Corner Crew Warmup Tracksuit
│   │   ├── prod-8-tee.jpg        <- Acid-Wash Oversized Heavy Tee
│   │   └── prod-9-shorts.jpg     <- Apex Quick-Dry Fight Shorts
│   │
│   ├── b2b-calculator-section/   <- B2B Tier & Price Calculator
│   │   ├── boxing-gloves.jpg
│   │   ├── team-tracksuit.jpg
│   │   ├── fight-robe.jpg
│   │   └── shin-guards.jpg
│   │
│   ├── factory-section/          <- Factory Floor & Machinery
│   │   └── factory-overview.jpg
│   │
│   └── customizer-section/       <- Interactive 3D Customizer Templates
│
└── videos/                       <- Global video reel storage (.mp4 / .webm)
```

## How Automatic Media Updates Work:
1. **Direct File Replacement**: Whenever you replace any `.jpg`, `.png`, or `.mp4` file in these folders using the same filename, the website will automatically load and display your new image or video.
2. **Video in 3D Slot**: You can place an MP4 file or upload it directly via the card's hover button. It will immediately play in full looping 3D simulation.
3. **No Text Clutter**: The 4-slot 3D showcase cards display pure visuals (video / render) without any text overlays.
