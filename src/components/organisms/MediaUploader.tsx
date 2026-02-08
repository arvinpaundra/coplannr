import type { HTMLAttributes } from 'react';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';

export interface MediaUploaderProps extends HTMLAttributes<HTMLDivElement> {
  accept?: string;
  multiple?: boolean;
  onUpload?: (files: File[]) => void;
  files?: File[];
  onRemove?: (index: number) => void;
  maxSize?: number; // in MB
}

export const MediaUploader = ({
  className,
  accept = 'image/*,video/mp4',
  multiple = true,
  onUpload,
  files = [],
  onRemove,
  maxSize = 50,
  ...props
}: MediaUploaderProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && onUpload) {
      const fileArray = Array.from(selectedFiles);
      // Check file sizes
      const validFiles = fileArray.filter((file) => {
        const sizeInMB = file.size / (1024 * 1024);
        return sizeInMB <= maxSize;
      });
      onUpload(validFiles);
    }
  };

  return (
    <div className={cn('space-y-4', className)} {...props}>
      <label className="block w-full p-8 border-2 border-dashed border-black bg-neutral-50 hover:bg-white hover:border-solid hover:border-brand-red hover:shadow-hard-sm transition-all duration-200 cursor-pointer text-center group relative overflow-hidden">
        {/* Decorative background pattern on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-200">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, black 10px, black 20px)'
          }}></div>
        </div>
        
        <input
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="relative z-10">
          <Icon
            icon="solar:cloud-upload-linear"
            className="text-5xl mb-3 text-neutral-400 group-hover:text-brand-red transition-all duration-200 mx-auto group-hover:scale-110"
          />
          <p className="font-bold text-sm group-hover:text-brand-red transition-colors duration-200">
            Drop assets here
          </p>
          <p className="font-mono text-xs text-neutral-500 mt-1 group-hover:text-neutral-700 transition-colors duration-200">
            JPG, PNG, MP4 up to {maxSize}MB
          </p>
          <div className="mt-4 inline-block px-4 py-2 border-2 border-black bg-white text-xs font-mono uppercase font-bold hover:bg-brand-red hover:text-white hover:shadow-hard-sm hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all duration-200">
            Browse Files
          </div>
        </div>
      </label>

      {files.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b-2 border-dashed border-neutral-300">
            <Icon icon="solar:gallery-bold" className="text-sm text-neutral-500" />
            <span className="font-mono text-xs text-neutral-500 uppercase">
              Uploaded Media ({files.length})
            </span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="relative w-28 h-28 border-2 border-black shrink-0 bg-white hover:shadow-hard-sm hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all duration-200 group"
              >
                {file.type.startsWith('image/') ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-200"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-neutral-100 group-hover:bg-neutral-200 transition-colors">
                    <Icon icon="solar:video-frame-play-vertical-linear" className="text-3xl text-neutral-500 group-hover:text-brand-red transition-colors" />
                  </div>
                )}
                {onRemove && (
                  <button
                    onClick={() => onRemove(index)}
                    className="absolute -top-2 -right-2 w-7 h-7 bg-brand-red border-2 border-black text-white flex items-center justify-center hover:bg-black hover:scale-110 hover:shadow-hard-sm transition-all duration-200"
                    title="Remove file"
                  >
                    <Icon icon="solar:trash-bin-minimalistic-linear" className="text-sm" />
                  </button>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-1">
                  <p className="font-mono text-[10px] truncate px-1">
                    {file.name.length > 15 ? `${file.name.substring(0, 15)}...` : file.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
