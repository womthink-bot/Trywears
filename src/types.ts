export interface SeoConfig {
  title: string;
  description: string;
}

export interface GlobalConfig {
  brandName: string;
  tagline: string;
  accentColor: string;
  logo?: string;
  phone: string;
  email: string;
  address: string;
  socials: {
    instagram: string;
    twitter: string;
    youtube: string;
  };
}

export interface Hero3DSlot {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  videoUrl?: string;
  badge?: string;
  specs?: string;
}

export interface HeroSlide {
  id: string;
  category?: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  tag: string;
  slots3D?: Hero3DSlot[];
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  rating: number;
  image: string;
  description: string;
  specs: string[];
  customizable: boolean;
  inStock: boolean;
}

export interface TechFeature {
  id: string;
  title: string;
  desc: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export interface HeroConfig {
  slides: HeroSlide[];
  mediaMode?: "3d-video" | "slides" | "hologram";
  active3DVideoUrl?: string;
  enable3DTilt?: boolean;
}

export interface WebsiteConfig {
  seo: SeoConfig;
  global: GlobalConfig;
  hero: HeroConfig;
  products: Product[];
  technology: {
    title: string;
    subtitle: string;
    features: TechFeature[];
  };
  testimonials: Testimonial[];
}

export interface MediaItem {
  name: string;
  relativePath: string;
  type: "image" | "video";
  size?: number;
  updatedAt?: string;
}

export interface MediaFolderManifest {
  [folderKey: string]: MediaItem[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  customization?: Record<string, string>;
}
