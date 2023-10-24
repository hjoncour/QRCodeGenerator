import React, { useState, useRef } from 'react';

const DragDropImage: React.FC = () => {
  const [image, setImage] = useState<any>(null);
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
      reader.onload = (event) => setImage(event.target?.result);
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
        {image ? (
          <img src={image} alt="Dropped" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        ) : (
          <p>{isDragging ? 'Release to drop' : 'Drag & Drop an image here'}</p>
        )}
      </div>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
};

export default DragDropImage;
