'use client';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ImagePlus, X, Loader2, Link as LinkIcon } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, onRemove, label = 'Upload Image' }: ImageUploadProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [useUrl, setUseUrl] = useState(false);
  const [tempUrl, setTempUrl] = useState('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setIsProcessing(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const img = document.createElement('img');
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 800;
            const MAX_HEIGHT = 800;
            let width = img.width;
            let height = img.height;

            if (width > height) {
              if (width > MAX_WIDTH) {
                height = Math.round((height * MAX_WIDTH) / width);
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width = Math.round((width * MAX_HEIGHT) / height);
                height = MAX_HEIGHT;
              }
            }
            
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            
            // Draw white background to prevent transparent PNGs from turning black
            if (ctx) {
              ctx.fillStyle = '#FFFFFF';
              ctx.fillRect(0, 0, width, height);
              ctx.drawImage(img, 0, 0, width, height);
            }
            
            // Compress heavily for firestore base64 storage
            const dataUrl = canvas.toDataURL('image/jpeg', 0.6);
            onChange(dataUrl);
            setIsProcessing(false);
          };
          img.onerror = () => {
            console.error("Image failed to load onto canvas");
            setIsProcessing(false);
          };
          img.src = event.target.result as string;
        } else {
           setIsProcessing(false);
        }
      };
      reader.readAsDataURL(file);
    }
  }, [onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.svg']
    },
    maxFiles: 1
  });

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempUrl) {
      onChange(tempUrl);
      setTempUrl('');
      setUseUrl(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        {label && <label className="text-sm font-medium text-gray-300">{label}</label>}
        {!value && (
          <button 
            type="button" 
            onClick={() => setUseUrl(!useUrl)}
            className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1"
          >
            <LinkIcon size={12} />
            {useUrl ? 'Upload File' : 'Provide URL'}
          </button>
        )}
      </div>
      
      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-[#D4AF37]/30 group aspect-video bg-[#071A3D] flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={value} 
            alt="Uploaded" 
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              type="button"
              onClick={onRemove}
              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      ) : useUrl ? (
        <div className="flex gap-2">
          <input 
            type="url" 
            placeholder="https://example.com/image.jpg" 
            value={tempUrl}
            onChange={(e) => setTempUrl(e.target.value)}
            className="flex-1 bg-[#0B1020] border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-[#D4AF37]"
          />
          <button type="button" onClick={handleUrlSubmit} className="bg-[#D4AF37] text-[#0B1020] font-bold px-4 rounded-md">
            Apply
          </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
            isDragActive 
              ? 'border-[#D4AF37] bg-[#D4AF37]/5' 
              : 'border-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:bg-white/5'
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center space-y-3">
            {isProcessing ? (
              <Loader2 className="animate-spin text-[#D4AF37]" size={32} />
            ) : (
              <ImagePlus className="text-[#D4AF37]" size={32} />
            )}
            <div className="text-sm text-gray-400">
              <span className="text-[#D4AF37] font-semibold">Click to upload</span> or drag and drop
            </div>
            <p className="text-xs text-gray-500">SVG, PNG, JPG or WEBP will be saved locally</p>
          </div>
        </div>
      )}
    </div>
  );
}
