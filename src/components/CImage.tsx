import { Image, type ImageProps } from "antd";
import { useState } from "react";
import defaultImage from "../assets/images/default.png";

type CImageProps = ImageProps & {
  src: string | File;
  className?: string;
  errorSrc?: string;
};

export default function CImage({
  src,
  alt,
  errorSrc = defaultImage,
  className,
  ...props
}: CImageProps) {
  const [isError, setIsError] = useState(src ? false : true);
  // If Error Show image default
  const handleError = () => {
    setIsError(true);
  };

  return (
    <Image
      src={isError ? errorSrc : src}
      alt={alt}
      preview={props.preview || false}
      onError={handleError}
      className={`object-contain !size-16  rounded-md ${className}`}
      {...props}
    />
  );
}
