import Head from 'next/head'
import CallToAction from '../components/Call-To-Action'
import styles from '../styles/Home.module.css'

export async function getStaticProps() {

}

export default function LandingPage() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Первому Перваку Приготовиться!</title>
        <meta name="description" content={
          "Первому Перваку Приготовиться - студенческий квест, организуемый на базе Университета ИТМО. " +
          "Нескольким командам студентов предстоит сразиться за право называть себя победителями! " +
          "Зови своих друзей и присоединяйся!"
        } />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>

        <ul>
          <li>Профиль</li>
          <li>Участники</li>
          <li>Вход</li>
          <li>Регистрация </li>
        </ul>
      </header>

      <main className={styles.main}>
        <section className="welcome">
          <h1>Добро пожаловать в игру!</h1>
          <ul>
            <li>
              <a href="#about-project">О проекте</a>
            </li>
            <li>
              <a href="#how-to-play">Как играть?</a>
            </li>
            <li>
              <a href="#dates">Важные даты</a>
            </li>
          </ul>
        </section>

        <section id="about-project">

        </section>

        <section id="how-to-play">

        </section>

        <section className="dates">

        </section>

        <section className="call-to-action">
          <CallToAction/>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>Наши контакты: </p>
      </footer>
    </div>
  )
}
