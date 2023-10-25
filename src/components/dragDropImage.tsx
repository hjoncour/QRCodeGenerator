import React, { useState } from 'react';
import ImageToAscii from './imageToAscii';  // Importing the ImageToAscii component

const DragDropImage: React.FC = () => {
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');

  const onDragEnter = () => setIsDragging(true);
  const onDragLeave = () => setIsDragging(false);

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => setImageDataUrl(event.target?.result as string);
      reader.readAsDataURL(file);
      setError('');
    } else {
      setError('Please drop a valid image file.');
    }
  };

  const dragDropStyles = {
    border: isDragging ? '4px dashed #007bff' : '4px dashed gray',
    borderRadius: '5px',
    borderWidth: '4px',
    borderStyle: 'dashed',
    borderColor: isDragging ? '#007bff' : 'gray',
    height: '300px',
    width: '300px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: isDragging ? '#f8f9fa' : 'white',
    cursor: 'pointer',
  };

  return (
    <div>
      <div
        style={dragDropStyles}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        {imageDataUrl ? <ImageToAscii image={imageDataUrl} /> : <p>{isDragging ? 'Release to drop' : 'Drag & Drop an image here'}</p>}
      </div>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
};

export default DragDropImage;
