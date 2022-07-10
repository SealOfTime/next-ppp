import Image from 'next/image';

const StepPlay = ({ img, step, children }) => (
  <div className="how-to-play__cart-step cart-step">
    <div className="cart-step__label">
      <div className="cart-step__number">
        {step}
        .
      </div>
      <div className="cart-step__img">
        <Image
          alt="step img"
          src={img}
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
    <div className="cart-step__box-text box-gradient">
      <div className="box-gradient__inner">
        {children}
      </div>
    </div>
  </div>
);

export default StepPlay;
