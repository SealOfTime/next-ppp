import { useCallback, useEffect, useState } from 'react';
import { useSession, signOut } from "next-auth/react";

import Image from 'next/image';

import HeaderMenuBody from './HeaderMenuBody';
import HeaderBurger from './Burger';

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const {data: session} = useSession();

  const settingsWindows = {
    width: 600,
    height: 400,
  }

  const toggleMenu = useCallback(() => {
    setIsOpen((s) => !s);
    document.body.classList.toggle('fix-position');
  }, []);

  const onAuth = () => {

    if(session) signOut()
    else window.open("/login", 'login', `width=${settingsWindows.width}, height=${settingsWindows.height}, top=${window.screen.availHeight / 2 - (settingsWindows.height / 2)}, left=${window.screen.availWidth / 2 - (settingsWindows.width / 2)}`);
    
  }

  return (
    <header className="header">
      <div className="header__container container">
        <div className="header__logo">
          <Image src="/mainLogo.png" alt="logo" width={105} height={60}/>
        </div>
        <nav className="header__menu menu">
          <HeaderMenuBody classActive="active-menu" isOpen={isOpen} items={[{ name: session? 'Выход ': 'Войти', callback: onAuth }]} />
        </nav>
        <HeaderBurger onClick={toggleMenu} />
      </div>
    </header>
  );
};

export default NavMenu;
