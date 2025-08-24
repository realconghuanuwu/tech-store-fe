import { Image, type ImageProps } from "antd";
import { useState, useEffect } from "react";
import defaultImage from "../assets/images/default.png";

type CImageProps = ImageProps & {
  src: string | File;
  className?: string;
  errorSrc?: string;
  fallback?: string;
  showPreview?: boolean;
};

export default function CImage({
  src,
  alt,
  errorSrc,
  fallback = defaultImage,
  className = "",
  showPreview = false,
  ...props
}: CImageProps) {
  const [isError, setIsError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>(src as string);

  // Reset error state when src changes
  useEffect(() => {
    setIsError(false);
    setCurrentSrc(src as string);
  }, [src]);

  // Handle image load error
  const handleError = () => {
    setIsError(true);
    // Use errorSrc if provided, otherwise use fallback
    setCurrentSrc(errorSrc || fallback);
  };

  // If no src provided, show fallback immediately
  if (!src || isError) {
    return (
      <Image
        src={fallback}
        alt={alt || "Default image"}
        preview={showPreview}
        className={` ${className}`}
        {...props}
      />
    );
  }

  return (
    <Image
      src={currentSrc}
      alt={alt || "Product image"}
      preview={showPreview}
      onError={handleError}
      className={`${className}`}
      {...props}
    />
  );
}
