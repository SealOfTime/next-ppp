import { FC, useState } from 'react';
import FullScreenImage from '../../components/HomePage/HomePageFullScreenImage';
import MainLayout from '../../layouts/MainLayout';
import Prisma from '../../Prisma';
import Background from '../assets/background3.jpg';
import { GetServerSideProps, GetStaticProps } from 'next'
import { Team as PrismaTeam } from '@prisma/client';


type Person = {
  name: string
  vkUrl: string
}

type Team = {
  name: string
  code?: string
  participationDate: Date
  captain: Person
  members: Person[]
}
export const getServerSideProps: GetServerSideProps<Props> = async ({params}) => {
  const id = params.id as string
  const team = await Prisma.team.findFirst({
    where: {
      id: id,
    },
    include: {
      members: true,
    }
  })
  const captain = team.members.filter(m=>m.role==='CAPTAIN')[0];
  const members = team.members.filter(m=>m.role!=='CAPTAIN');
  
  return {
    props: {
      team: {
        name: team.name,
        participationDate: team.participationDate,
        captain: {
          name: `${captain.firstName} ${captain.lastName}`,
          vkUrl: captain.vkUrl,
        },
        members: members.map(m=>({
          name: `${m.firstName} ${m.lastName}`,
          vkUrl: m.vkUrl,
        })),
      },
    },
  };
};

type Props =  {
  team: Team,
}

const TeamCard: FC<Props> = ({ team }) => (
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
                {team.name}
              </div>
              <div className="teamCart__members">
                <h4 className="teamCart__title-h4 gradient-title">Участники:</h4>
                <ul className="teamCart__list">
                  {
                    team.members.map((member) => (
                      <li key={member.name} className="teamCart__list-item">
                        <a href={member.vkUrl}>{member.name}</a>
                      </li>
                    ))
                  }
                </ul>

              </div>
              <div className="teamCart__captain">
                <h4 className="teamCart__title-h4 gradient-title">Капитан:</h4>
                <a href={team.captain.vkUrl}>{team.captain.name}</a>
              </div>
              {/* <div className="teamCart__next-station">
                <h4 className="teamCart__title-h4 gradient-title">Следующая станция:</h4>
                {team.nextStation}
              </div> */}
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

export default TeamCard;
