import { FC, useState } from 'react';
import FullScreenImage from '../components/HomePage/HomePageFullScreenImage';
import MainLayout from '../layouts/MainLayout';
import Background from '../assets/background3.jpg';

interface ITeam {
  id: number,
  nameTeam: string,
  captain: string,
  nextStation: string, // Изменить!!!
  inviteLink: string,
  members: string[], // изменить? yes
}

export const getStaticProps = async () => {
  const team:ITeam = {
    id: 1,
    nameTeam: 'Супер-пупер котики',
    captain: 'Иван Иванов',
    nextStation: 'Александровский парк',
    inviteLink: 'https://ppps.live/',
    members: ['Петров Николай', 'Николаев Владислав', 'Смирнова Ангелина', 'Синицына Екатерина', 'Королев Валерий'],
  };
  return {
    props: {
      team,
    },
  };
};

interface Props {
  team: ITeam,
  // auth: any,
}

const teamCart: FC<Props> = ({ team }) => (
// const [team, setTeam] = useState<ITeam>();
  <MainLayout>
    <section className="page-cart-team">
      <FullScreenImage className="background__big" backGroundImg={Background} />
      <div className="page-cart-team__container container">
        <div className="page-cart-item__body teamCart">
          <div className="teamCart__title-box">
            <h3 className="teamCart__title title-section-white">
              Карточка команды
            </h3>
          </div>
          <div className="teamCart__inner">
            <div className="teamCart__item">
              <div className="teamCart__team-name">
                <h4 className="teamCart__title-h4">Название команды:</h4>
                {team.nameTeam}
              </div>
              <div className="teamCart__members">
                <h4 className="teamCart__title-h4 gradient-title">Участники:</h4>
                <ul className="teamCart__list">
                  {
                    team.members.map((item: string) => (
                      <li className="teamCart__list-item">
                        {item}
                      </li>
                    ))
                  }
                </ul>

              </div>
              <div className="teamCart__captain">
                <h4 className="teamCart__title-h4 gradient-title">Капитан:</h4>
                {team.captain}
              </div>
              <div className="teamCart__next-station">
                <h4 className="teamCart__title-h4 gradient-title">Следующая станция:</h4>
                {team.nextStation}
              </div>
              {/* <div className="teamCart__invite-link">
                <h4 className="teamCart__title-h4 gradient-title">Ссылка-приглашение:</h4>
                <div className="teamCart__invite-link-box">
                  <span className="teamCart__link whiteBtn_black-text">
                    {team.inviteLink}
                  </span>
                  <button type="button" className="teamCart__btn-invite gradientBtn">Поделиться</button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  </MainLayout>
);
export default teamCart;
teamCart.auth = true;
