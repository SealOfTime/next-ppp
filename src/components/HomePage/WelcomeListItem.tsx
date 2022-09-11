import { useState } from 'react';

export interface Props {
  children: React.ReactNode;
}

const WelcomListItem: React.FC<Props> = ({ children }) => {
  const [isHover, setIsHover] = useState(false);
  const handleMouseOver = () => {
    setIsHover(true);
  };
  const handleMouseOut = () => {
    setIsHover(false);
  };
  return (
    <li
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className={`welcome__item ${isHover ? 'whiteBtn' : ''}`}
    >
      <a href="#about" className=" welcome__link">
        {children}
      </a>
    </li>
  );
};

export default WelcomListItem;
