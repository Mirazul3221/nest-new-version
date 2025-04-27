export const convertImagesToBase64 = async (container) => {
    if (!container) return;
  
    const imgElements = container.querySelectorAll('img');
  
    await Promise.all(
      Array.from(imgElements).map(async (img) => {
        const src = img.getAttribute('src');
  
        if (!src || src.startsWith('data:image')) return; // Skip already base64
  
        try {
          const response = await fetch(src);
          const blob = await response.blob();
          const reader = new FileReader();
  
          const base64 = await new Promise((resolve, reject) => {
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
  
          img.setAttribute('src', base64); // Replace the src with base64
        } catch (error) {
          console.error(`Failed to convert image: ${src}`, error);
        }
      })
    );
  };
  