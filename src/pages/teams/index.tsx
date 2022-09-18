import ItemTeam from '../../components/PageTeams/ItemTeam';
import MainLayout from '../../layouts/MainLayout';
import { GetServerSideProps } from 'next';
import Prisma from '../../Prisma';
import { formatDate } from '../../Util';

export const getServerSideProps: GetServerSideProps<Props> = async({params}) => {
  const teams = await Prisma.team.findMany({
    include: {
      members: true,
    }
  });
  return {
    props: {
      teams: teams.map(team => ({
        id: team.id,
        name: team.name,
        participationDate: formatDate(team.participationDate),
        members: team.members.map(m=>({
          name: `${m.firstName} ${m.lastName}`,
          vkUrl: m.vkUrl,
          vkId: m.vkId,
          isCaptain: m.role === 'CAPTAIN',
        })),
      })), 
    }
  }
}

type Person = {
  name: string
  vkUrl: string
  vkId: string
  isCaptain: boolean
}

export type Team = {
  id: string,
  name: string
  code?: string
  participationDate: string
  members: Person[]
}

type Props = {
  teams: Team[],
}

const TeamsPage: React.FC<Props> = ({ teams }) => (
  <MainLayout>
    <section className="teams">
      <div className="teams__container container">
        <h3 className="teams__title title-section-white">Команды</h3>
        <div className="teams__content">
          <ul className="teams__list">
            {
              teams.map((item) => (
                <li key={item.id} className="teams__item">
                  <ItemTeam item={item} />
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </section>
  </MainLayout>
);

export default TeamsPage;
// TeamsPage.auth = true;
