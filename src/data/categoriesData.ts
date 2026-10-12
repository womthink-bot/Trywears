import customCategories from "./custom_categories_override.json";

export interface SubCategoryItem {
  id: string;
  name: string;
  tagline?: string;
}

export interface CategoryProduct {
  id: string;
  sampleNum: number;
  name: string;
  subtitle: string;
  image: string;
  badge: string;
  subCategory: string;
  subCategoryId: string;
  gsm: string;
  fabric: string;
  accentColor: string;
  moq: string;
  colorways: { name: string; hex: string }[];
  specs: string[];
  description?: string;
  seoTitle?: string;
  seoSummary?: string;
  seoKeywords?: string[];
}

export interface CategoryData {
  id: string;
  index: number;
  code: string;
  name: string;
  tagline: string;
  badge: string;
  subCategories: SubCategoryItem[];
  themeColor: string;
  heroImage: string;
  heroImageAlt: string;
  heroVideo?: string;
  bgImage: string;
  bgAlt: string;
  description: string;
  stats: { label: string; value: string }[];
  highlights: string[];
  alignImageLeft: boolean;
  products: CategoryProduct[];
}

// Export the real categories and products permanently sourced from custom categories
export const CATEGORIES_DATA: CategoryData[] = customCategories as unknown as CategoryData[];
