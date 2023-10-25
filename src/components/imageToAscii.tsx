import React, { useState, useEffect } from 'react';

const ImageToAscii: React.FC<{ image: string }> = ({ image }) => {
  const [asciiArt, setAsciiArt] = useState('');

  useEffect(() => {
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const width = img.width;
      const height = img.height;
      canvas.width = width;
      canvas.height = height;

      ctx?.drawImage(img, 0, 0, width, height);

      const asciiChars = '@%#*+=-:. ';
      let asciiResult = '';

      for (let y = 0; y < height; y += 6) {
        for (let x = 0; x < width; x += 3) {
          const pixelData = ctx?.getImageData(x, y, 3, 6).data;
          const grayValue = pixelData
            ? 0.2126 * pixelData[0] + 0.7152 * pixelData[1] + 0.0722 * pixelData[2]
            : 0;
          const asciiIndex = Math.round((asciiChars.length - 1) * grayValue / 255);
          asciiResult += asciiChars[asciiIndex];
        }
        asciiResult += '\n';
      }

      setAsciiArt(asciiResult);
    };
  }, [image]);

  return (
    <pre style={{ fontFamily: 'Courier, monospace', fontSize: '6px', lineHeight: '6px' }}>
      {asciiArt}
    </pre>
  );
};

export default ImageToAscii;
