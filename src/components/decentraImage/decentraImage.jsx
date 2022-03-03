//NextJs import
import Image from "next/image";

const DecentraImage = ({ src, className, width, height, alt }) => {
  return (
    <Image
      src={`/api/imageproxy?url=${src}`}
      className={className}
      width={width}
      height={height}
      unoptimized
      alt={alt}
    />
  );
};

export default DecentraImage;
