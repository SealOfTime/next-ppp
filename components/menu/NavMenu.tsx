import { useCallback, useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

import Image from 'next/image';

import HeaderMenuBody from './HeaderMenuBody';
import HeaderBurger from './Burger';

interface modalWindow {
  width: Number,
  height: Number,
}

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navList, setNavList] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  const settingsWindows:modalWindow = {
    width: 600,
    height: 400,
  };

  const toggleMenu = useCallback(() => {
    setIsOpen((s) => !s);
    document.body.classList.toggle('fix-position');
  }, []);

  useEffect(() => {
    const onAuth = () => {
      if (session) {
        signOut();
      } else window.open('/login', 'login', `width=${settingsWindows.width}, height=${settingsWindows.height}, top=${window.screen.availHeight / 2 - (+settingsWindows.height / 2)}, left=${window.screen.availWidth / 2 - (+settingsWindows.width / 2)}`);
    };
    if (session) {
      setNavList([
        {
          name: 'Профиль',
        },
        {
          name: 'Участники',
        },
        {
          name: 'Выход',
          callback: onAuth,
        },
        {
          name: 'Крутая кнопка зарегестрироваться',
          callback: () => { router.push('/registration'); },
        },
      ]);
    } else {
      setNavList([
        {
          name: 'Вход ',
          callback: onAuth,
        },
      ]);
    }
  }, [session]);

  return (
    <header className="header">
      <div className="header__container container">
        <div className="header__logo" onClick={() => { router.push('/'); }}>
          <Image src="/mainLogo.png" alt="logo" width={105} height={60} />
        </div>
        <nav className="header__menu menu">
          <HeaderMenuBody classActive="active-menu" isOpen={isOpen} items={navList} />
        </nav>
        <HeaderBurger onClick={toggleMenu} />
      </div>
    </header>
  );
};

export default NavMenu;
