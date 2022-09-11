import React, { FC } from 'react';

interface IBurger {
  onClick: () => void;
}

const Burger: FC<IBurger> = ({
  onClick,
}) => (
  <button
    type="button"
    className="header__burger burger"
    onClick={onClick}
  >
    <span className="burger__line" />
  </button>
);

export default Burger;
