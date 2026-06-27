/**
 * Compresses an image file client-side using HTML5 Canvas to fit comfortably under Firestore size limits.
 * Downscales the image to a maximum of 800px on either side and saves as JPEG with optimized quality.
 */
export function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      reject(new Error('Selected file is not an image'));
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const MAX_SIZE = 800; // Optimal for crisp rendering and tiny file sizes (~20-40KB)

        // Maintain aspect ratio while sizing down
        if (width > height) {
          if (width > MAX_SIZE) {
            height *= MAX_SIZE / width;
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width *= MAX_SIZE / height;
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas 2D context'));
          return;
        }

        // Draw image on canvas with high-quality rendering options
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Export as JPEG with 0.75 quality factor
        const dataUrl = canvas.toDataURL('image/jpeg', 0.75);
        resolve(dataUrl);
      };
      img.onerror = (error) => reject(new Error('Error loading image object: ' + error));
    };
    reader.onerror = (error) => reject(new Error('Error reading file: ' + error));
  });
}
