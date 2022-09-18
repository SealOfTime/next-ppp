import ItemTeam from '../../components/PageTeams/ItemTeam';
import MainLayout from '../../layouts/MainLayout';
// import styles from '../styles/Home.module.css';

interface Team {
  id: string,
  name: string,
  members: string[],
}

export const getStaticProps = async () => {
  const teams:Team[] = [
    {
      id: '1',
      name: 'team1',
      members: ['Иванов Иван', 'Боба Алекс', 'Биба Степа', 'ДонДон Александрович', 'Покемон Гоша', 'Традиционные отношения'],
    },
    {
      id: '3',
      name: 'team2',
      members: ['Иванов Иван', 'Боба Алекс', 'Биба Степа', 'ДонДон Александрович', 'Покемон Гоша', 'Традиционные отношения'],
    },
    {
      id: '4',
      name: 'team2',
      members: ['Иванов Иван', 'Боба Алекс', 'Биба Степа', 'ДонДон Александрович', 'Покемон Гоша', 'Традиционные отношения'],
    },
    {
      id: '5',
      name: 'team2',
      members: ['Иванов Иван', 'Боба Алекс', 'Биба Степа', 'ДонДон Александрович', 'Покемон Гоша', 'Традиционные отношения'],
    },
    {
      id: '6',
      name: 'team2',
      members: ['Иванов Иван', 'Боба Алекс', 'Биба Степа', 'ДонДон Александрович', 'Покемон Гоша', 'Традиционные отношения'],
    },
    {
      id: '7',
      name: 'team2',
      members: ['Иванов Иван', 'Боба Алекс', 'Биба Степа', 'ДонДон Александрович', 'Покемон Гоша', 'Традиционные отношения'],
    },
    {
      id: '8',
      name: 'team2',
      members: ['Иванов Иван', 'Боба Алекс', 'Биба Степа', 'ДонДон Александрович', 'Покемон Гоша', 'Традиционные отношения'],
    },
    {
      id: '9',
      name: 'team2',
      members: ['Иванов Иван', 'Боба Алекс', 'Биба Степа', 'ДонДон Александрович', 'Покемон Гоша', 'Традиционные отношения'],
    },

  ];
  return {
    props: {
      teams,
    },
  };
};

interface Props {
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
