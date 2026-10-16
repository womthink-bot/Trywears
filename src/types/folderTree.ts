export interface FolderFileItem {
  fileId: string;
  name: string;
  filePath: string;
  url: string;
  thumbnail: string;
  width?: number;
  height?: number;
  size?: number;
  description?: string;
  seoTitle?: string;
  seoSummary?: string;
  seoKeywords?: string[];
  category?: string;
  subCategory?: string;
  tags?: string[];
  pricing?: any;
  gsm?: string;
  fabric?: string;
  moq?: string;
}

export interface FolderNode {
  name: string;
  path: string;
  type: "folder";
  fileCount: number;
  totalFiles: number;
  files: FolderFileItem[];
  children: FolderNode[];
}
