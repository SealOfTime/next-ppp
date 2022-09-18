import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Image from 'next/image';

import HeaderMenuBody from './HeaderMenuBody';
import HeaderBurger from './Burger';
import { useAuth } from '../../Auth.client';

interface modalWindow {
  width: Number;
  height: Number;
}

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navList, setNavList] = useState([]);
  const { session } = useAuth();
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const settingsWindows: modalWindow = {
    width: 600,
    height: 400,
  };

  const toggleMenu = useCallback(() => {
    setIsOpen((s) => !s);
    document.body.classList.toggle('fix-position');
  }, []);

  useEffect(() => {
    const login = () => {
      const w = window.open(
        '/api/auth/vk',
        'login',
        `width=${settingsWindows.width}, height=${
          settingsWindows.height
        }, top=${
          window.screen.availHeight / 2 - +settingsWindows.height / 2
        }, left=${window.screen.availWidth / 2 - +settingsWindows.width / 2}`,
      ); 
    }
  
    if (session) {
      setNavList([
        {
          name: 'Список участников',
          callback: ()=>{
            
            router.push('/teams');
          },
        },
        {
          name: 'Команда',
          callback: () => {
            
            router.push('/teams/my');
          },
        },
        {
          name: 'Выход',
          callback: login,
        },
      ]);
    } else {
      setNavList([
        {
          name: 'Список участников',
          callback: ()=>{
            setIsOpen(false);
            document.body.classList.remove('fix-position');
            router.push('/teams')
          },
        },
        {
          name: 'Регистрация',
          callback: () => {
            setIsOpen(false);
            document.body.classList.remove('fix-position');
            window.location.href = 'https://vk.com/im?sel=-171647377';
          },
        },
        {
          name: 'Вход ',
          callback: login,
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
            classActive="active-menu"
            isOpen={isOpen}
            items={navList}
          />
        </nav>
        <HeaderBurger onClick={toggleMenu} />
      </div>
    </header>
  );
};

export default NavMenu;
