import React, { useState, useCallback } from 'react';
import { Box, Button, IconButton, Typography, Paper } from '@mui/material';
import Image from 'next/image';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export type ImageFile = {
  file: File;
  preview: string;
};

export interface AppImagesProps {
  images: ImageFile[];
  setImages: React.Dispatch<React.SetStateAction<ImageFile[]>>;
}

const AppImages: React.FC<AppImagesProps> = ({ images, setImages }) => {
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (images.length + acceptedFiles.length > 1) {
        alert('Max 3 files!');
        return;
      }

      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImages((prevImages) => [...prevImages, { file, preview: reader.result as string }]);
        };
        reader.readAsDataURL(file);
      });
    },
    [images, setImages]
  );

  const handleDelete = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      handleDrop(Array.from(event.target.files));
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    const items = event.clipboardData.items;
    const files: File[] = [];
  
    // Przekształć DataTransferItemList na tablicę
    const itemsArray = Array.from(items);
  
    for (const item of itemsArray) {
      if (item.type.indexOf('image') === 0) {
        const file = item.getAsFile();
        if (file) {
          files.push(file);
        }
      }
    }
  
    if (files.length > 0) {
      handleDrop(files);
    }
  };
  

  return (
    <Box 
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}
      onPaste={handlePaste}
    >
      <Paper
        sx={{
          border: '1px dashed grey',
          padding: '20px',
          width: '100%',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2, 
          mb:10
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleDrop(Array.from(e.dataTransfer.files));
        }}
      >
        <CloudUploadIcon sx={{ fontSize: 42 }} />
        <Typography>Drag images here or click below to select from file explorer, or paste from clipboard.</Typography>
        <Button variant="contained" component="label" sx={{ mt: 2 }}>
          Choose images
          <input type="file" hidden multiple accept="image/*" onChange={handleInputChange} />
        </Button>
      </Paper>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', mb:10}}>
        {images.map((image, index) => (
          <Box key={index} sx={{ position: 'relative', width: 100, height: 100 }}>
            <Image src={image.preview} alt="Przesłany obraz" layout="fill" objectFit="cover" />
            <IconButton
              sx={{ position: 'absolute', top: 0, right: 0, color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
              onClick={() => handleDelete(index)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AppImages;
