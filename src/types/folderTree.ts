export interface FolderFileItem {
  fileId: string;
  name: string;
  filePath: string;
  url: string;
  thumbnail: string;
  width?: number;
  height?: number;
  size?: number;
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
