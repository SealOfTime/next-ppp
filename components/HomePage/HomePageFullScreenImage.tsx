import Image from 'next/image';
import background from '../../public/content/backgroung.jpg';

const FullScreenImage = ({ className }) => (
  <div className={`${className}`}>
    <Image
      alt="bg"
      src={background}
      layout="fill"
      objectFit="cover"
      placeholder="blur"
      blurDataURL="url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkOAMAANIAzr59FiYAAAAASUVORK5CYII=)"
      priority
    />
  </div>
);

export default FullScreenImage;
