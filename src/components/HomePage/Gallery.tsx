/* eslint-disable react/jsx-props-no-spreading */
import Slider from 'react-slick';
import Image from 'next/image';

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
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <div className="Slider">
      <Slider {...settings}>
        {
          imgList.map((item) => (
            <div key={item}>
              <Image src={item} width={1170} height={627} loading="lazy" />
            </div>
          ))
        }
      </Slider>
    </div>

  );
};

export default Gallery;
