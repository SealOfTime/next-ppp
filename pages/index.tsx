// import Head from 'next/head'
import Image from 'next/image'

import MainLayout from '../layouts/MainLayout';
import RegistrationBtn from '../components/RegistrationButton';
import FullScreenImage from '../components/HomePage/HomePageFullScreenImage.js';
import Gallery from '../components/HomePage/Gallery.js'
import StepPlay from '../components/HomePage/StepPlay.js'
import DateItem from '../components/HomePage/DateItem.js'

// interface  IInedexPage{
// 	dates: object,

// }

export async function getStaticProps() {
	let dates = {
		'registration-time': '11.11 - 11.11',
		'event-time': '11.11 - 11.11',
		'rewarding-time': '11.11 - 11.11',
	}

	return {
		props: {
			dates,
		}
	}
}

export default function LandingPage({dates}) {

	return (
		<MainLayout title='Первому Перваку Приготовиться!'>		
				<section className="welcome">
					<FullScreenImage className="welcome__bg" />
					<div className="welcome__container container">
						<h1 className='welcome__title main-title'>Добро пожаловать в игру!</h1>
						<ul className='welcome__list'>
							<li className="welcome__item whiteBtn">
								<div className="whiteBtn__inner">
									<a href="#about" className=" welcome__link whiteBtn_black-text">О проекте</a>	
								</div>
							</li>
							<li className="welcome__item"><a href="#how-to-play" className="welcome__link">Как играть?</a></li>
							<li className="welcome__item"><a href="#dates" className="welcome__link">Важные даты</a></li>
						</ul>
						<div className="welcome__block-btn">
							<RegistrationBtn className="welcome__btn gradientBtn">
								<span className='gradientBtn__text'>Регистрация</span>
							</RegistrationBtn>
						</div>
						
					</div>
				</section>

				<section className="about-project">
					<a name='about'/>
					<div className="about-project__container container">
						<h2 className='about-project__title title-section'>О проекте</h2>
						<div className='about-project__text box-gradient'>
							<div className="box-gradient__inner">
								<p className='box-gradient__text'>Квест "Первому перваку приготовиться" уже традиционное осеннее мероприятиедля первокурсников Университета ИТМО. Это погружение в атмосферу Санкт-Петербургаи приключение по его самым интересным местам. Захватывающие и увлекательные задания приведут тебя к победе.
		ППП - это замечательный повод выбраться из дома и провести чудесные выходные.
								</p >
								<p className='box-gradient__text'>Так исторически сложилось, что раньше квест проводился только для первокурсников КТУ. Но в этом году мы решились расширить свои рамки. Поэтому будем рады открыть свои двери для ВСЕХ первокурсников университета.</p>
							</div>						
						</div>
						<div className="about-project__gallery">
							<Gallery imgUrls={['/content/gallery/1.jpg','/content/gallery/2.jpg','/content/gallery/3.jpg' ]}/>				
						</div>
					</div>
				</section>

				<section className="how-to-play">
					<a name='how-to-play'/>
					<div className="how-to-play__container container">
						<h2 className='how-to-plat__title title-section'>
							Как играть?
						</h2>
						<div className="how-to-play__content">
							<StepPlay urlImg={'/content/gallery/step-1.jpg'} numberStep='1'>
								<p>
								Собрал команду из 4-6 человек? Тогда приготовься - мы начинаем игру. Наверху справа кнопка регистрации. Смело нажимай на нее и заполняй все данные о своей команде. Важно указать свой действительный номер телефона. Если твоя команда потеряется, мы сможем с вами связаться.Поторопись, ведь количество мест ограничено.Регистрируйся и становись одним из участников нашей большой игры.
								</p>
							</StepPlay>
							<StepPlay urlImg={'/content/gallery/step-2.jpg'} numberStep='2'>
								<p>
								Информация о стартовой точке и времени начала будут доступны в личном кабинете команды в день игры. Не опаздывай и не теряй членов своей команды. Вас ждет захватывающая игра. И пусть удача всегда будет с вами.
								</p>
							</StepPlay>
							<StepPlay urlImg={'/content/gallery/step-3.jpg'} numberStep='3'>
								<p>
								На каждой станции хранитель четко фиксирует время, за которое вы смогли выполнить его задания. Но помни, что отсчет начинается с указанного в личном кабинете времени начала станции. Во время переходов между точками вам будут доступны к выполнению дополнительные задания. Они сократят ваше итоговое время в зачёте.
								</p>
							</StepPlay>
							<StepPlay urlImg={'/content/gallery/step-4.jpg'} numberStep='4'>
								<p>
								Помни - это игра. И в ней будет победитель. Будет ли это твоя команда? Все зависит только от вас. Кто же заберет главный приз, узнаем на награждении 25 октября.
								</p>
							</StepPlay>
						</div>
					</div>
				</section>
				<section className="dates">
					<a name="dates"/>
					<div className="dates__container container">
						<h2 className='datas__title title-section'>Важные даты</h2>
						<div className="dates__content">
							<DateItem urlLogo='/content/icons/reg.png' date={dates['registration-time']}>
								Регистрация
							</DateItem>
							<DateItem urlLogo='/content/icons/Event.png' date={dates['event-time']}>
								Квест
							</DateItem>
							<DateItem urlLogo='/content/icons/reward.png' date={dates['rewarding-time']}>
								Награждение
							</DateItem>
						</div>
					</div>
				</section>
				<section className="call-to-action">
					<div className="call-to-action__container container">
						<h2 className='call-to-action__title title-section'>Начни свое приключение сейчас!</h2>
						<div className="call-to-action__inner">
							<RegistrationBtn className="welcome__btn gradientBtn">
									<span className='gradientBtn__text'>Регистрация</span>
							</RegistrationBtn>
						</div>
					</div>
				</section>
				<div className='contacts'>
					<div className="contacts__container container">
						<a href="" className="contacts__link">
							<span className='contacts__text'>Наши контакты:</span>
							<div className='contactas__img'>
								<Image
									alt='vk-icon'
									src='/content/icons/vk.png'
									layout='fill'
									objectFit='cover'
								/>
							</div>
						</a>
					</div>
				</div>
				
		</MainLayout>
	)
}
