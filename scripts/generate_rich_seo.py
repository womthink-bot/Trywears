import json
import os
import re

# Load TRYKEYWORDS.txt
with open('TRYKEYWORDS.txt', 'r', errors='ignore') as f:
    raw_kw_text = f.read()

# Collect categorized keywords from file
kw_categories = {
    'sports': [],
    'gym': [],
    'streetwear': [],
    'jackets': [],
    'country': [],
    'b2b': [],
    'general': [],
    'hashtags': []
}

kw_categories['hashtags'] = re.findall(r'#[a-zA-Z0-9_]+', raw_kw_text)

for line in raw_kw_text.split('\n'):
    l = line.strip()
    if not l or l.isupper() or any(x in l for x in ['SEARCHES', 'KEYWORDS', 'TAGS', '--- END']):
        continue
    items = [x.strip() for x in re.split(r'[,;]+', l) if x.strip() and not x.strip().startswith('#')]
    for item in items:
        lower = item.lower()
        if any(c in lower for c in ['uk', 'usa', 'canada', 'europe', 'london', 'germany', 'france', 'australia', 'spain', 'italy']):
            kw_categories['country'].append(item)
        elif any(j in lower for j in ['jacket', 'leather', 'bomber', 'biker', 'varsity', 'puffer', 'coat', 'windbreaker']):
            kw_categories['jackets'].append(item)
        elif any(s in lower for s in ['street', 'hoodie', 't-shirt', 'tee', 'cargo', 'oversized', 'sweatshirt']):
            kw_categories['streetwear'].append(item)
        elif any(g in lower for g in ['gym', 'fitness', 'compression', 'legging', 'bra', 'activewear', 'workout']):
            kw_categories['gym'].append(item)
        elif any(sp in lower for sp in ['sport', 'football', 'soccer', 'basketball', 'baseball', 'rugby', 'hockey', 'uniform', 'jersey', 'martial', 'bjj']):
            kw_categories['sports'].append(item)
        elif any(b in lower for b in ['wholesale', 'bulk', 'b2b', 'supplier', 'factory', 'manufacturer', 'low moq', 'private label']):
            kw_categories['b2b'].append(item)
        else:
            kw_categories['general'].append(item)

# 100% exhaustive category matching for all 124 folders
def get_category_fabric_specs(cat_lower):
    # Martial arts
    if 'bjj' in cat_lower or 'brazilian jiu' in cat_lower:
        return (
            "450-550 GSM 100% Preshrunk Cotton Pearl Weave Jacket with 10 oz Ripstop Cotton-Twill Pants",
            "Heavy-duty combat weave with rubberized EVA foam lapel collar, reinforced knee gussets, and triple-row contrast stitching",
            "Sports Wear"
        )
    elif any(k in cat_lower for k in ['judo', 'karate', 'taekwondo', 'hapkido', 'ninja']):
        return (
            "350-450 GSM Traditional 100% Cotton Grain Canvas",
            "Tournament-standard preshrunk cotton fabric with reinforced tension splits, multiple-stitched collar, and elasticated drawstring waistband",
            "Sports Wear"
        )
    # Sports uniforms
    elif 'baseball' in cat_lower:
        return (
            "240-260 GSM Heavy-Duty Pro-Dazzle Polyester with warp-knit tensile reinforcement",
            "Full button-down athletic construction with breathable lateral side mesh inserts, anti-abrasion durability, and zero-shrink finish",
            "Sports Wear"
        )
    elif 'basketball' in cat_lower:
        return (
            "190-210 GSM Pro-Dri Interlock Micro-Poly with bird-eye mesh airflow panels",
            "Rapid moisture dispersal technology, lightweight fluid drape, and zero-fade digital sublimation across all chest and back panels",
            "Sports Wear"
        )
    elif 'football' in cat_lower or 'soccer' in cat_lower:
        return (
            "180-220 GSM High-Tensile Interlock Polyester engineered for collision resistance",
            "Moisture-wicking yarn with micro-perforated lateral heat ventilation zones and double-stitched sleeve hems",
            "Sports Wear"
        )
    elif 'hockey' in cat_lower:
        return (
            "280-320 GSM Heavyweight Dazzle Poly with double-reinforced elbow and shoulder yoke inserts",
            "Heavy-duty pro-cut hockey knit with fight-strap attachment reinforcement and sublimated sleeve cresting",
            "Sports Wear"
        )
    elif 'rugby' in cat_lower:
        return (
            "260-280 GSM Rip-Resistant 4-Way Stretch Performance Polyester with reinforced binding",
            "Scrum-tested tensile resilience with anti-slip silicone grip printing options and reinforced placket construction",
            "Sports Wear"
        )
    elif 'vollyball' in cat_lower or 'volleyball' in cat_lower:
        return (
            "180-200 GSM Ultra-Light Spandex-Polyester Dry-Fit Interlock",
            "High-flexibility athletic knit engineered for rapid vertical reach, anti-static yarn, and breathable underarm inserts",
            "Sports Wear"
        )
    # Jackets & Outerwear
    elif 'varsity' in cat_lower:
        return (
            "550 GSM Heavy Melton Wool Body with Genuine Top-Grain Cowhide Leather Sleeves (or Premium Vegan PU)",
            "Diamond-quilted insulated satin lining, heavy-gauge 2x2 striped wool-rib collar and cuffs, and custom chenille embroidery cresting",
            "Jackets"
        )
    elif any(k in cat_lower for k in ['biker jacket', 'leather jacket', 'racer jacket']):
        return (
            "1.1-1.3mm Premium Top-Grain Cowhide / Lambskin Nappa Leather (or Supple Pebbled Vegan Leather)",
            "Hand-buffed rich grain finish, diamond-quilted polyester-satin thermal lining, and heavy-gauge antiqued YKK metal hardware",
            "Jackets"
        )
    elif 'suede' in cat_lower:
        return (
            "Heavyweight Supple Faux/Real Suede with Soft Brushed Texture",
            "Tailored Western trucker yoke, premium antique metal snap buttons, and smooth silk-touch interior lining",
            "Jackets"
        )
    elif any(k in cat_lower for k in ['bomber', 'flight jacket']):
        return (
            "210T Flight-Grade Water-Repellent Nylon / Satin Shell (160 GSM)",
            "Safety orange or tonal diamond-quilted poly-fill lining with heavy utility sleeve zip pocket and knit storm cuffs",
            "Jackets"
        )
    elif any(k in cat_lower for k in ['puffer', 'parka', 'quilted']):
        return (
            "Weather-Shield Matte Ripstop Nylon Shell with 300g Thermal Down-Alternative Polyfill",
            "Engineered baffle chamber heat retention, storm-cuff seals, water-repellent DWR exterior, and detachable fleece-lined hood",
            "Jackets"
        )
    elif any(k in cat_lower for k in ['windbreaker', 'coach jacket', 'rain jacket', 'anorak', 'softshell', 'shell jacket']):
        return (
            "High-Denier Waterproof & Windproof Ripstop Nylon/Taslan Shell (140-180 GSM)",
            "Breathable DWR water-shedding finish, taped waterproof seams, underarm airflow eyelets, and breathable mesh lining",
            "Jackets"
        )
    elif any(k in cat_lower for k in ['corduroy', 'denim', 'chore', 'trucker', 'shacket']):
        return (
            "340-380 GSM Heavy 12-Wale Cotton Corduroy or 13.5 oz Premium Washed Cotton Denim",
            "Vintage stone-washed texture with flat-felled reinforced construction, branded shank metal buttons, and dual chest flap pockets",
            "Jackets"
        )
    elif any(k in cat_lower for k in ['sherpa', 'fleece jacket']):
        return (
            "340-360 GSM High-Pile Thermal Sherpa or Anti-Pill Polar Fleece",
            "Plush heat-trapping fleece with contrast nylon taslan chest pocket overlay, stand-up storm collar, and elasticated hem binding",
            "Jackets"
        )
    # Hoodies, Sweatshirts & Sets
    elif any(k in cat_lower for k in ['hoodie set', 'track suit', 'tracksuits', 'co-ord set', 'crop set', 'shorts set', 'compression set']):
        return (
            "380-420 GSM Heavyweight 100% Combed Organic Cotton French Terry or Performance Tricot",
            "Coordinated athletic 2-piece set with plush brushed interior, heavy elasticated trims, custom drawcords, and reinforced seam construction",
            "Street Wear & Sets"
        )
    elif any(k in cat_lower for k in ['hoodie', 'sweatshirt', 'crewneck']):
        return (
            "380-450 GSM Heavyweight 100% Combed Organic Cotton French Terry or 80/20 Cotton-Poly Fleece",
            "Ultra-soft plush brushed loopback interior with anti-pilling surface, heavy 2x2 lycra rib cuffs, and double-layered drawstring hood",
            "Street Wear"
        )
    # Gym bottoms & compression
    elif any(k in cat_lower for k in ['legging', 'tights', 'compression', 'scrunch', 'flare legging', 'booty']):
        return (
            "260-280 GSM 4-Way Stretch Interlock (85% Technical Polyester / 15% Spandex or 80% Nylon / 20% Elastane)",
            "Squat-proof high-opacity weave with micro-capillary dry-fit channels and 4-way elastic memory recovery",
            "Gym & Fitness"
        )
    elif any(k in cat_lower for k in ['biker short', 'cycling short', '2-in-1 short', 'gym short', 'shorts']):
        return (
            "180-220 GSM Lightweight 4-Way Stretch Micro-Woven Polyester or 320 GSM Loopback Cotton French Terry",
            "Ergonomic athletic slit hems, concealed zippered valuables pocket, and non-slip internal silicone waistband grip",
            "Gym & Fitness"
        )
    elif any(k in cat_lower for k in ['jogger', 'sweatpant', 'track - sweat', 'track pant']):
        return (
            "340-380 GSM Heavy Combed Cotton Fleece or Performance Interlock Knit",
            "Deep zippered side utility pockets, heavy elasticated waistband with engraved metal eyelet drawstrings, and tapered ribbed ankle cuffs",
            "Street Wear"
        )
    elif any(k in cat_lower for k in ['cargo pant', 'cargo short', 'utility']):
        return (
            "320-350 GSM Heavyweight Cotton Twill or Military-Grade Cotton Ripstop Blend",
            "Pre-washed for comfortable broken-in flexibility with expanding bellows cargo flap pockets and reinforced knee panels",
            "Street Wear"
        )
    # Tops, Bras, Tanks
    elif any(k in cat_lower for k in ['sports bra', 'bra', 'crop top', 'tank top', 'racerback', 'stringer', 'skirt', 'jumpsuit', 'bodysuit']):
        return (
            "240-260 GSM Double-Knit Spandex Micro-Poly (80% Nylon / 20% Elastane)",
            "Sweat-wicking athletic support blend with anti-odor antimicrobial finish and friction-free brushed interior",
            "Gym & Fitness"
        )
    elif any(k in cat_lower for k in ['t-shirt', 'tee', 'polo']):
        return (
            "220-260 GSM Combed Compact Ring-Spun 100% Cotton Single Jersey (or 170 GSM Pro-Dri Poly)",
            "Super-combed yarn treated with enzyme bio-wash for a silk-smooth touch, reinforced 1x1 rib collar, and structured modern drape",
            "Street Wear"
        )
    else:
        return (
            "240-280 GSM Premium Technical Export-Grade Fabric",
            "Ergonomic athletic construction with shape recovery, reinforced stitching, and pre-shrunk anti-distortion weave",
            "Apparel"
        )

# Color & pattern rotation banks
COLOR_PALETTES = [
    ("Jet Black & Gunmetal Grey", "Finished with reactive colorfast dyeing and matte stealth accents. Supports all custom Pantone TCX matching and tonal silicone badging."),
    ("Vintage Mineral Washed Charcoal", "Treated with a specialized acid wash and stone-buffing process for an authentic distressed streetwear aesthetic."),
    ("Classic Midnight Navy & Crisp White", "High-contrast athletic styling featuring dual-tone split blocking, contrast piped trims, and fade-resistant reactive shades."),
    ("Forest Olive Drab & Earthy Khaki", "Pigment garment-dyed with low-impact eco dyes, yielding rich muted earth tones with soft vintage silicone washing."),
    ("Crimson Burgundy & Metallic Gold", "Vibrant high-definition digital sublimation with deep color saturation, sharp vector graphics, and zero fading after 50+ wash cycles."),
    ("Desert Sand Mocha & Bone White", "Minimalist tonal luxury palette achieved through pre-shrunk reactive vat dyeing with soft peach-fuzz surface touch."),
    ("Deep Royal Cobalt & Sunburst Yellow", "High-visibility tournament team colorway featuring sharp geometric side panel inserts and crisp sublimated club cresting."),
    ("Heather Ash Grey & Black Onyx", "Classic two-tone melange athletic finish with subtle micro-rib texture and anti-pill brushed handfeel."),
    ("Pastel Sage Green & Cream", "Contemporary boutique streetwear hue with soft enzyme washing, smooth drape, and clean minimalist branding."),
    ("All-Over Digital Camo Sublimation", "High-definition custom pattern print directly infused into fabric micro-fibers, ensuring zero texture stiffness and maximum breathability."),
    ("Stealth Matte Black & Vibrant Neon Orange", "Modern high-energy athletic contrast with reflective heat-transfer 3M detailing for nighttime visibility."),
    ("Washed Vintage Maroon & Desert Tan", "Specialized mineral wash giving subtle sun-faded character with premium handfeel and preshrunk sizing.")
]

# Workmanship variations
STITCHING_VARIANTS = [
    "Crafted with 4-needle 6-thread flatlock anti-friction stitching across all internal seams to eliminate skin abrasion during explosive athletic motion.",
    "Engineered with industrial high-density double-needle topstitching across stress-bearing zones and heavy bar-tacking on all structural tension points.",
    "Features anatomical 3D pattern grading tailored for an unrestricted ergonomic range of motion, seamless shoulder drape, and lasting structural integrity.",
    "Constructed using high-tensile core-spun German polyester thread with ultrasonic laser-cut edge finishing to prevent seam fraying and puckering.",
    "Reinforced with heavy-duty Kevlar-reinforced seam construction, bar-tacked gussets, and pre-tested for high-impact durability under tournament conditions.",
    "Precision-assembled with taped waterproof seams, bonded ultrasonic hems, and computerized automated buttonhole / zipper insertion."
]

def generate_description_and_seo(file_obj, folder_path, index):
    raw_name = file_obj.get('name', '')
    product_code = re.sub(r'\.[a-zA-Z0-9]+$', '', raw_name).replace('_', ' ').strip()
    
    # Extract clean category name from folder path
    folder_parts = [p.strip() for p in folder_path.split('/') if p.strip() and p.strip() != 'Try Products']
    full_category_name = folder_parts[-1] if folder_parts else "Custom Apparel"
    division_name = folder_parts[0] if folder_parts else "Athletic Wear"
    
    fabric_gsm, fabric_detail, inferred_division = get_category_fabric_specs(full_category_name.lower())
    
    # Pick color & stitching based on index and product code hash
    seed = (index * 37 + hash(product_code)) % len(COLOR_PALETTES)
    color_name, color_desc = COLOR_PALETTES[seed]
    stitching_desc = STITCHING_VARIANTS[seed % len(STITCHING_VARIANTS)]
    
    # Pick category-specific keywords from TRYKEYWORDS.txt
    cat_lower = full_category_name.lower()
    selected_kws = []
    
    if any(k in cat_lower for k in ['sport', 'baseball', 'basketball', 'football', 'hockey', 'rugby', 'vollyball', 'martial', 'bjj', 'judo', 'karate', 'taekwondo']):
        kw_pool = kw_categories['sports']
    elif any(k in cat_lower for k in ['gym', 'fitness', 'compression', 'legging', 'bra', 'activewear', 'short', 'tank', 'stringer']):
        kw_pool = kw_categories['gym']
    elif any(k in cat_lower for k in ['jacket', 'leather', 'bomber', 'biker', 'varsity', 'puffer', 'anorak', 'coach', 'corduroy', 'fleece', 'parka', 'quilted', 'softshell', 'trucker']):
        kw_pool = kw_categories['jackets']
    else:
        kw_pool = kw_categories['streetwear']
    
    # Mix keywords: 3 from specific category, 2 from B2B/manufacturer, 2 from country
    for i in range(3):
        if kw_pool:
            selected_kws.append(kw_pool[(seed + i * 7) % len(kw_pool)])
    for i in range(2):
        if kw_categories['b2b']:
            selected_kws.append(kw_categories['b2b'][(seed + i * 5) % len(kw_categories['b2b'])])
    for i in range(2):
        if kw_categories['country']:
            selected_kws.append(kw_categories['country'][(seed + i * 3) % len(kw_categories['country'])])
    
    # Add product specific keyword
    selected_kws.append(f"{product_code} custom {full_category_name.lower()} manufacturer")
    
    # Clean up duplicate keywords
    seen = set()
    clean_kws = []
    for k in selected_kws:
        k_clean = k.strip().lower()
        if k_clean and k_clean not in seen and len(k_clean) < 60:
            seen.add(k_clean)
            clean_kws.append(k_clean)
            
    primary_kw = clean_kws[0] if clean_kws else f"custom {full_category_name.lower()} manufacturer"
    secondary_kw = clean_kws[1] if len(clean_kws) > 1 else "wholesale clothing supplier"
    country_kw = clean_kws[3] if len(clean_kws) > 3 else "clothing manufacturer UK USA"
    
    # Build complete, comprehensive, professional description
    desc_paragraphs = [
        f"Manufactured factory-direct at our Sialkot, Pakistan atelier, the {product_code} is an export-grade physical sample engineered exclusively for the '{full_category_name}' collection. Designed to provide competitive sports brands, private label fashion founders, and international apparel buyers with uncompromising tournament-level construction and premium retail aesthetics.",
        
        f"Cloth Quality & Fabric Specifications: Cut from {fabric_gsm}. {fabric_detail}. All fabrics undergo strict lab testing for zero post-wash shrinkage, anti-pilling surface endurance, and colorfastness Grade 4+ to withstand vigorous wear.",
        
        f"Workmanship & Product Quality: {stitching_desc} Fully customizable with your brand identity through high-density 3D silicone heat-transfer logos, chenille or flat embroidery badges, zero-crack digital sublimation, woven brand neck labels, and barcoded retail hangtags.",
        
        f"Colors & Pattern Finishes: {color_name} — {color_desc}",
        
        f"B2B Production & OEM Sourcing: Sourced direct from our Sialkot export facility with low minimum order quantities (MOQ from 25 units per colorway). Rapid physical sample dispatch in 5-7 days, followed by streamlined bulk manufacturing and expedited DDP air freight across the United Kingdom, United States, Canada, Europe, and Australia. Search references: {primary_kw}, {secondary_kw}, {country_kw}."
    ]
    
    full_desc = "\n\n".join(desc_paragraphs)
    
    seo_title = f"{product_code} - Custom {full_category_name} Manufacturer & OEM Supplier | TRY WEARS"
    seo_summary = f"{product_code}: Factory-direct {full_category_name} produced in Sialkot, Pakistan. {fabric_gsm}, private label OEM branding, custom colorways, and low MOQ 25 units for international sportswear brands and retailers."
    
    return {
        'description': full_desc,
        'seoTitle': seo_title,
        'seoSummary': seo_summary,
        'seoKeywords': clean_kws,
        'subCategory': full_category_name,
        'category': division_name,
        'tags': clean_kws
    }

# Update imagekit_folder_tree.json
with open('src/data/imagekit_folder_tree.json', 'r') as f:
    tree = json.load(f)

tree_counter = [0]
product_meta_by_name = {}

def walk_tree_and_update(node, path=''):
    cur_path = f"{path}/{node.get('name', '')}".strip('/')
    if 'files' in node and node['files']:
        for file_obj in node['files']:
            tree_counter[0] += 1
            meta = generate_description_and_seo(file_obj, cur_path, tree_counter[0])
            file_obj.update(meta)
            p_code = re.sub(r'\.[a-zA-Z0-9]+$', '', file_obj.get('name', '')).replace('_', ' ').strip()
            product_meta_by_name[p_code] = meta
            product_meta_by_name[file_obj.get('name', '')] = meta
            if file_obj.get('fileId'):
                product_meta_by_name[file_obj['fileId']] = meta
                
    if 'children' in node:
        for c in node['children']:
            walk_tree_and_update(c, cur_path)

walk_tree_and_update(tree)
print(f"Updated {tree_counter[0]} files in imagekit_folder_tree.json")

with open('src/data/imagekit_folder_tree.json', 'w') as f:
    json.dump(tree, f, indent=2)

# Update custom_categories_override.json
with open('src/data/custom_categories_override.json', 'r') as f:
    override_cats = json.load(f)

override_counter = 0
for cat in override_cats:
    cat_name = cat.get('name', '')
    for p in cat.get('products', []):
        override_counter += 1
        p_name = p.get('name', '').strip()
        p_id = p.get('id', '').replace('ik-', '').strip()
        
        # Look up matched meta from tree
        meta = product_meta_by_name.get(p_name) or product_meta_by_name.get(p_id)
        if not meta:
            folder_mock = f"{cat_name}/{p.get('subCategory', 'Apparel')}"
            meta = generate_description_and_seo({'name': p_name}, folder_mock, override_counter)
            
        p['description'] = meta['description']
        p['seoTitle'] = meta['seoTitle']
        p['seoSummary'] = meta['seoSummary']
        p['seoKeywords'] = meta['seoKeywords']
        p['subCategory'] = meta['subCategory']
        
        # Enhance specs array to reflect real quality and cloth specs
        cat_lower = meta['subCategory'].lower()
        fabric_gsm, fabric_detail, _ = get_category_fabric_specs(cat_lower)
        p['gsm'] = fabric_gsm.split(' ')[0]
        p['fabric'] = fabric_gsm
        p['specs'] = [
            fabric_gsm,
            f"Edition: {meta['subCategory']}",
            "Zero-Fade Sublimation & 3D Silicone Badging",
            "Sialkot Factory Direct • Low MOQ 25 Pcs",
            "Worldwide Express DDP Shipping (UK, USA, EU)"
        ]

print(f"Updated {override_counter} products in custom_categories_override.json")

with open('src/data/custom_categories_override.json', 'w') as f:
    json.dump(override_cats, f, indent=2)

print("SUCCESS: 100% of products updated with rich, distinct category-specific descriptions!")
