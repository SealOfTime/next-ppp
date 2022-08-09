import {FC, useState} from 'react'
import RegistrationButton from "../RegistrationButton";

interface IMenuBody {
	classActive: string;
	isOpen: boolean;
	onClickAuth?: (e) => void;
}

const HeaderMenuBody: FC<IMenuBody> = ({classActive, isOpen, onClickAuth}) => {
	return (	
		<div  className={isOpen ? `menu__body ${classActive}` : 'menu__body'}>
			<ul className='menu__list'>
				<li className='menu__item'><a className="menu__link" href="">Профиль</a></li>
				<li className='menu__item'><a className="menu__link" href="">Участники</a></li>
				<li className='menu__item'><a  onClick={onClickAuth} className="menu__link" href="#">Вход</a></li>
				<li className='menu__item '>
					<RegistrationButton className="whiteBtn">
						<div className="whiteBtn__inner">
							<span className="menu__link">Регистрация</span>
						</div>
					</RegistrationButton>
				</li>
			</ul>
		</div>
	)
}

export default HeaderMenuBody;