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

    // eslint-disable-next-line react/jsx-props-no-spreading
    <Slider {...settings}>
      {
        imgList.map((item) => (
          <div key={item}>
            {/* <img src={item} /> */}
            <h1 style={{ color: 'white' }}>123</h1>
          </div>
        ))
      }
    </Slider>

  );
};

export default Gallery;
