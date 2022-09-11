import Slider from 'react-slick';
import Image from 'next/image';

// import GalleryItem from './GalleryItem';

export interface Props {
  imgList: string[]
}

const Gallery: React.FC<Props> = ({ imgList }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      <Slider {...settings}>
        {
          imgList.map((item) => (
            <div key={item}>
              <Image src={item} layout="fill" />
            </div>
          ))
        }
      </Slider>
    </div>
  );
};

export default Gallery;
