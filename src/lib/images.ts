import fs from 'node:fs';
import path from 'node:path';

export interface ImageInfo {
  src: string;
  filename: string;
}

export function getImagesFromDirectory(imgDir: string): ImageInfo[] {
  const publicDir = path.join(process.cwd(), 'public', imgDir);

  if (!fs.existsSync(publicDir)) {
    return [];
  }

  const files = fs.readdirSync(publicDir);

  return files
    .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
    .sort() // Sort alphabetically for consistent order
    .map((filename) => ({
      src: `/${imgDir}${filename}`,
      filename,
    }));
}
