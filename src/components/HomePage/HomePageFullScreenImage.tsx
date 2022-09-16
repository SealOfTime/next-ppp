import Image from 'next/image';

export interface Props {
  className?: string;
  backGroundImg: any;
}

const FullScreenImage: React.FC<Props> = ({ className, backGroundImg }) => (
  <div className={`${className}`}>
    <Image
      alt="bg"
      src={backGroundImg}
      layout="fill"
      objectFit="cover"
      placeholder="blur"
      blurDataURL="url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkOAMAANIAzr59FiYAAAAASUVORK5CYII=)"
      priority
    />
  </div>
);

export default FullScreenImage;
