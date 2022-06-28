// import Head from 'next/head'

import MainLayout from '../layouts/MainLayout'


export async function getStaticProps() {
	return {
		props: {}
	}
}



export default function LandingPage() {
	return (
		<MainLayout title='Первому Перваку Приготовиться!'>
			<section className="welcome">
				<div className="welcome__container container">
					<h1 className='welcome__title main__title'>Добро пожаловать в игру!</h1>
					<ul className='welcome__list'>
						<li className="welcome__item whiteBtn">
							<div className="whiteBtn__inner">
								<a href="" className=" welcome__link whiteBtn_black-text">О проекте</a>	
							</div>
						</li>
						<li className="welcome__item"><a href="" className="welcome__link">Как играть?</a></li>
						<li className="welcome__item"><a href="" className="welcome__link">Важные даты</a></li>
					</ul>

					<button className='welcome__btn gradientBtn'>
						<span className='gradientBtn__text'>Регистрация</span>
					</button>
				</div>
			</section>
		</MainLayout>

	// <div className={styles.container}>
	// <Head>
	// 	<title>Первому Перваку Приготовиться!</title>
	// 	<meta name="description" content={
	// 	"Первому Перваку Приготовиться - студенческий квест, организуемый на базе Университета ИТМО. " +
	// 	"Нескольким командам студентов предстоит сразиться за право называть себя победителями! " +
	// 	"Зови своих друзей и присоединяйся!"
	// 	} />
	// 	<link rel="icon" href="/favicon.ico" />
	// </Head>

	
	
	// <main className={styles.main}>
	// 	<section className="welcome">
	// 	<h1>Добро пожаловать в игру!</h1>
	// 	<ul>
	// 		<li>
	// 		<a href="#about-project">О проекте</a>
	// 		</li>
	// 		<li>
	// 		<a href="#how-to-play">Как играть?</a>
	// 		</li>
	// 		<li>
	// 		<a href="#dates">Важные даты</a>
	// 		</li>
	// 	</ul>
	// 	</section>

	// 	<section id="about-project">

	// 	</section>

	// 	<section id="how-to-play">

	// 	</section>

	// 	<section className="dates">

	// 	</section>

	// 	<section className="call-to-action">
	// 	<CallToAction/>
	// 	</section>
	// </main>

	  
	// </div>
	)
}
