import Image from 'next/image';

const GalleryItem = ({ imgUrl }) => (
  <div className="gallery__item">
    <Image
      alt="gallery image"
      className="gallery__image"
      src={imgUrl}
      layout="fill"
      placeholder="blur"
      blurDataURL="url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkOAMAANIAzr59FiYAAAAASUVORK5CYII=)"
    />
  </div>
);

export default GalleryItem;
