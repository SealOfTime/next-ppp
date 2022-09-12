import { useCallback, useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

import Image from 'next/image';

import HeaderMenuBody from './HeaderMenuBody';
import HeaderBurger from './Burger';

interface modalWindow {
  width: Number;
  height: Number;
}

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navList, setNavList] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  const settingsWindows: modalWindow = {
    width: 600,
    height: 400,
  };

  const toggleMenu = useCallback(() => {
    // setIsOpen((s) => !s);
    document.body.classList.toggle('fix-position');
  }, []);

  useEffect(() => {
    const onAuth = () => {
      if (session) {
        signOut();
      } else {
        const w = window.open(
          '/login',
          'login',
          `width=${settingsWindows.width}, height=${
            settingsWindows.height
          }, top=${
            window.screen.availHeight / 2 - +settingsWindows.height / 2
          }, left=${window.screen.availWidth / 2 - +settingsWindows.width / 2}`,
        );
        w.addEventListener('message', () => {
          // console.log('bruh');
          router.reload();
        });
      }
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
          name: 'Регистрация',
          callback: () => {
            router.push('/registration');
          },
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
        <div
          tabIndex={0}
          role="button"
          className="header__logo"
          onClick={() => {
            router.push('/');
          }}
          onKeyDown={() => {}}
        >
          <Image src="/mainLogo.svg" alt="logo" width={65} height={64} />
        </div>
        <nav className="header__menu menu">
          <HeaderMenuBody
            // classActive="active-menu"
            // isOpen={isOpen}
            items={navList}
          />
        </nav>
        <HeaderBurger onClick={toggleMenu} />
      </div>
    </header>
  );
};

export default NavMenu;
