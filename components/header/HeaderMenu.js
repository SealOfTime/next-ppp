// import mainLogo from '/mainLogo.png'

export default function HeaderMenu() {
	return(
		<header className='header'>
			<div className="header__container container">
				<div className='header__logo'>
					<img src="/mainLogo.png" alt="logo" />
				</div>
				<nav className="header__menu menu">
					<ul className='menu__list'>
						<li className='menu__item'><a className="menu__link" href="">Профиль</a></li>
						<li className='menu__item'><a className="menu__link" href="">Участники</a></li>
						<li className='menu__item'><a className="menu__link" href="">Вход</a></li>
						<li className='menu__item '>
							<div className="whiteBtn">
								<a className="menu__link" href="">Регистрация</a>
							</div>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	)
}