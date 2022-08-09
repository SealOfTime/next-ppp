import { useCallback, useState } from 'react';

import Image from 'next/image';

import HeaderMenuBody from './HeaderMenuBody';
import HeaderBurger from './Burger';

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsOpen((s) => !s);
    document.body.classList.toggle('fix-position');
  }, []);

  return (
    <header className="header">
      <div className="header__container container">
        <div className="header__logo">
          <Image src="/mainLogo.png" alt="logo" width={105} height={60}/>
        </div>
        <nav className="header__menu menu">
          <HeaderMenuBody classActive="active-menu" isOpen={isOpen} items={[{ name: 'Войти', link: '/login' }]} />
        </nav>
        <HeaderBurger onClick={toggleMenu} />
      </div>
    </header>
  );
};

export default NavMenu;
