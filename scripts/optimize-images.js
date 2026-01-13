import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.resolve(__dirname, '../public');
const files = fs.readdirSync(publicDir);

const imageExtensions = ['.png', '.jpg', '.jpeg'];

async function optimizeImages() {
    for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        if (imageExtensions.includes(ext)) {
            const filePath = path.join(publicDir, file);
            const fileName = path.basename(file, ext);
            const newFilePath = path.join(publicDir, `${fileName}.webp`);

            console.log(`Optimizing ${file}...`);

            try {
                await sharp(filePath)
                    .resize(1920, null, { // Resize to max width 1920, maintain aspect ratio
                        withoutEnlargement: true
                    })
                    .webp({ quality: 80 })
                    .toFile(newFilePath);

                console.log(`Generated ${fileName}.webp`);

                // Optional: Remove original if successful? 
                // For now, let's keep them until we update code, or we can just do it manually.
                // fs.unlinkSync(filePath); 
            } catch (err) {
                console.error(`Error processing ${file}:`, err);
            }
        }
    }
}

optimizeImages();
