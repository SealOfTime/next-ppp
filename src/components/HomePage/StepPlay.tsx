import { useEffect, useRef, useState } from 'react';

export interface Props {
  children: React.ReactNode;
}

const StepPlay: React.FC<Props> = ({ children }) => {
  const [height, setHeight] = useState();
  const block = useRef(null);

  useEffect(() => {
    setHeight(block.current.clientHeight);
  }, [height]);

  return (
    <div className="cart-step">
      <div className="cart-step__label" />
      <div className="cart-step__label-line" />
      <p ref={block} className="cart-step__box-text">
        {children}
      </p>
    </div>
  );
};

export default StepPlay;
