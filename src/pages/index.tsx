// import Head from 'next/head'
import { GetStaticProps } from 'next';
import Image from 'next/image';
import MainLayout from '../layouts/MainLayout';
import FullScreenImage from '../components/HomePage/HomePageFullScreenImage';
import Gallery from '../components/HomePage/Gallery';
import StepPlay from '../components/HomePage/StepPlay';
import DateItem from '../components/HomePage/DateItem';

type Dates = {registration: string, event: string, rewards: string}
type LandingPageProps = {
  dates: Dates,
}

export const getStaticProps: GetStaticProps<LandingPageProps> = () => {
  const dates = {
    registration: '11.11 - 11.11',
    event: '11.11 - 11.11',
    rewards: '11.11 - 11.11',
  };

  return {
    props: {
      dates,
    },
  };
};

const CallToActionBtn = () => (
  <button type="button" className="welcome__btn gradientBtn">
    <span className="gradientBtn__text">Регистрация</span>
  </button>
);

const WelcomeSection = () => (
  <section className="welcome">
    <FullScreenImage className="welcome__bg" />
    <div className="welcome__container container">
      <h1 className="welcome__title main-title">
        Добро пожаловать
        <br />
        в игру!
      </h1>
      <ul className="welcome__list">
        <li className="welcome__item whiteBtn">
          <div className="whiteBtn__inner">
            <a href="#about" className=" welcome__link whiteBtn_black-text">О проекте</a>
          </div>
        </li>
        <li className="welcome__item"><a href="#how-to-play" className="welcome__link">Как играть?</a></li>
        <li className="welcome__item"><a href="#dates" className="welcome__link">Важные даты</a></li>
      </ul>
      <div className="welcome__block-btn">
        <CallToActionBtn />
      </div>
    </div>
  </section>
);

const AboutSection = () => (
  <section className="about-project">
    <div className="about-project__container container">
      <h2 className="about-project__title title-section">О проекте</h2>
      <div className="about-project__text">
        <p className="">
          {`Квест "Первому перваку приготовиться" уже традиционное осеннее 
                  мероприятие для первокурсников Университета ИТМО. Это погружение 
                  в атмосферу Санкт-Петербургаи приключение по его самым интересным местам. 
                  Захватывающие и увлекательные задания приведут тебя к победе. ППП - это 
                  замечательный повод выбраться из дома и провести чудесные выходные.`}
        </p>
        <p className="box-gradient__text">Так исторически сложилось, что раньше квест проводился только для первокурсников КТУ. Но в этом году мы решились расширить свои рамки. Поэтому будем рады открыть свои двери для ВСЕХ первокурсников университета.</p>
      </div>

      <div className="about-project__gallery">
        <Gallery imgList={['/content/gallery/1.jpg', '/content/gallery/2.jpg', '/content/gallery/3.jpg']} />
      </div>
    </div>
  </section>
);

const HowToPlaySection = () => (
  <section className="how-to-play">
    <div className="how-to-play__container container">
      <h2 className="how-to-play__title title-section">
        Как играть?
      </h2>
      <ul className="how-to-play__content">
        <li>
          <StepPlay>
            {`Собрал команду из 4-6 человек? Тогда приготовься - мы начинаем игру. 
            Наверху справа кнопка регистрации. Смело нажимай на нее и заполняй все данные о 
            своей команде. Важно указать свой действительный номер телефона. Если твоя команда 
            потеряется, мы сможем с вами связаться.Поторопись, ведь количество мест ограничено.
            Регистрируйся и становись одним из участников нашей большой игры.`}
          </StepPlay>
        </li>
        <li>
          <StepPlay step="2" img="/content/gallery/step-2.jpg">
            {`Информация о стартовой точке и времени начала будут доступны в личном кабинете команды 
            в день игры. Не опаздывай и не теряй членов своей команды. Вас ждет захватывающая игра. 
            И пусть удача всегда будет с вами.`}
          </StepPlay>
        </li>
        <li>
          <StepPlay step="3" img="/content/gallery/step-3.jpg">
            {`На каждой станции хранитель четко фиксирует время, за которое вы смогли выполнить его задания. 
            Но помни, что отсчет начинается с указанного в личном кабинете времени начала станции. 
            Во время переходов между точками вам будут доступны к выполнению дополнительные задания. 
            Они сократят ваше итоговое время в зачёте.`}
          </StepPlay>
        </li>

        <StepPlay step="4" img="/content/gallery/step-4.jpg">
          {`Помни - это игра. И в ней будет победитель. Будет ли это твоя команда? 
            Все зависит только от вас. Кто же заберет главный приз, узнаем на награждении 
            25 октября.`}
        </StepPlay>
      </ul>
    </div>
  </section>
);

const DatesSection: React.FC<{dates: Dates}> = ({ dates }) => (
  <section className="dates">
    <div className="dates__container container">
      <h2 className="datas__title title-section">Важные даты</h2>
      <div className="dates__content">
        <DateItem urlLogo="/content/icons/reg.png" date={dates.registration}>
          Регистрация
        </DateItem>
        <DateItem urlLogo="/content/icons/Event.png" date={dates.event}>
          Квест
        </DateItem>
        <DateItem urlLogo="/content/icons/reward.png" date={dates.rewards}>
          Награждение
        </DateItem>
      </div>
    </div>
  </section>
);

const CallToActionSection = () => (
  <section className="call-to-action">
    <div className="call-to-action__container container">
      <h2 className="call-to-action__title title-section">Начни свое приключение сейчас!</h2>
      <div className="call-to-action__inner">
        <CallToActionBtn />
      </div>
    </div>
  </section>
);

const ContactsSection = () => (
  <footer className="contacts">
    <div className="contacts__container container">
      <span className="contacts__text">Наши контакты:</span>
      <div className="contactas__img">
        <a href="https://vk.com/first_student_ready">
          <Image
            alt="vk-icon"
            src="/content/icons/vk.png"
            layout="fill"
            objectFit="cover"
          />
        </a>
      </div>
    </div>
  </footer>
);

const LandingPage: React.FC<LandingPageProps> = ({ dates }) => (
  <MainLayout title="Первому Перваку Приготовиться!">
    <WelcomeSection />
    <AboutSection />
    <HowToPlaySection />
    <DatesSection dates={dates} />
    <CallToActionSection />
    <ContactsSection />
  </MainLayout>
);

export default LandingPage;
