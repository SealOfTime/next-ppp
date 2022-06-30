import { useState } from 'react';

import HeaderMenuBody from './HeaderMenuBody';
import HeaderBurger from "./HeaderBurger";

const HeaderMenu = () => {
	let [isOpen, setIsOpen] = useState(false);

	const atctiveMenu = () => {
		setIsOpen(!isOpen);
		document.body.classList.toggle('fix-position');
	}

	return(
		<header className='header'>
			<div className="header__container container">
				<div className='header__logo'>
					<img src="/mainLogo.png" alt="logo" />
				</div>
				<nav className="header__menu menu">
					<HeaderMenuBody classActive='active-menu' isOpen={isOpen}/>
				</nav>
				<HeaderBurger onClick={() => atctiveMenu()}/>
			</div>
		</header>
	)
}

export default HeaderMenu;