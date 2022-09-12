/* eslint-disable react/jsx-props-no-spreading */
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

    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,

  };
  return (
    <div className="Slider">
      <Slider {...settings}>
        {
          imgList.map((item) => (
            <div key={item}>
              {/* <img src={item} alt={item} /> */}
              <Image src={item} width={1170} height={627} />
            </div>
          ))
        }
      </Slider>
    </div>

  );
};

export default Gallery;
