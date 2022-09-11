import GalleryItem from './GalleryItem';

const Gallery = ({ imgUrls }) => (
  <div className="gallery">
    {imgUrls.map((img) => (
      <GalleryItem key={img} imgUrl={img} />
    ))}
  </div>
);

export default Gallery;
