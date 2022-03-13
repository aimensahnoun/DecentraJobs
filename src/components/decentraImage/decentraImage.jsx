//NextJs import
import Image from "next/image";

const DecentraImage = ({ src, className, width, height, alt , layout }) => {
  return (
    <Image
      src={`/api/imageproxy?url=${src}`}
      className={className}
      width={width}
      height={height}
      unoptimized
      alt={alt}
      layout={layout}
    />
  );
};

export default DecentraImage;
