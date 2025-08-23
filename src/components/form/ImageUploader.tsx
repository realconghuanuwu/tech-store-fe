import { Upload, Avatar, Spin } from "antd";
import type { UploadFile, RcFile } from "antd/es/upload/interface";
import { Camera, PencilLine } from "lucide-react";
import React, { useState, useEffect } from "react";

interface ImageUploaderProps {
  onFileSelect: (file: File) => void;
  title?: string;
  accept?: string;
  multiple?: boolean;
  defaultImageUrl?: string;
  size?: number;
}

export default function ImageUploader({
  onFileSelect,
  title = "Tải ảnh lên",
  accept = "image/*",
  multiple = false,
  defaultImageUrl,
  size = 168, // Default size for avatar
}: ImageUploaderProps) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(
    defaultImageUrl
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  useEffect(() => {
    if (defaultImageUrl) {
      setPreviewUrl(defaultImageUrl);
      setIsLoading(true);
      // Create a mock file for preview when URL is provided
      const mockFile: UploadFile = {
        uid: `-${Date.now()}`,
        name: defaultImageUrl.split("/").pop() || "image.jpg",
        status: "done",
        url: defaultImageUrl,
        thumbUrl: defaultImageUrl,
      };
      setFileList([mockFile]);
    }
  }, [defaultImageUrl]);

  const handleImageLoad = () => {
    setIsLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setImageError(true);
  };

  const props = {
    accept,
    multiple,
    beforeUpload: (file: File) => {
      onFileSelect(file);
      // Create object URL for preview
      const objectUrl = URL.createObjectURL(file);
      setIsLoading(true);
      setImageError(false);
      setPreviewUrl(objectUrl);

      const uploadFile: UploadFile = {
        uid: `-${Date.now()}`,
        name: file.name,
        size: file.size,
        type: file.type,
        originFileObj: file as RcFile,
        thumbUrl: objectUrl,
      };
      setFileList([uploadFile]);
      return false;
    },
    fileList,
    onRemove: () => {
      setFileList([]);
      setPreviewUrl(undefined);
      onFileSelect(null as unknown as File);
      return true; // Return true to satisfy the boolean return type requirement
    },
    showUploadList: false,
  };

  return (
    <div className="image-uploader-container">
      <Upload {...props} showUploadList={false} className="cursor-pointer">
        <div
          className="relative"
          style={{ width: size, height: size }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm z-10 rounded-full">
              <Spin size="large" />
            </div>
          )}

          {previewUrl && !imageError ? (
            <>
              <Avatar
                src={previewUrl}
                alt="Avatar"
                size={size}
                onLoad={handleImageLoad}
                onError={handleImageError}
                className="object-cover"
              />

              <div
                className={`absolute inset-0 bg-black rounded-full transition-opacity duration-200 flex items-center justify-center ${
                  isHovered ? "opacity-50" : "opacity-0"
                }`}
              >
                <div className="text-white text-center">
                  <PencilLine className="mx-auto mb-1" size={24} />
                  <span className="text-sm font-medium">Chỉnh sửa</span>
                </div>
              </div>
            </>
          ) : (
            <div
              className={`flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors duration-200`}
              style={{ width: size, height: size }}
            >
              <Camera size={32} className="text-gray-400 mb-2" />
              <span className="text-sm text-gray-500 text-center px-3">
                {imageError ? "Lỗi tải ảnh" : title}
              </span>
            </div>
          )}
        </div>
      </Upload>
    </div>
  );
}
