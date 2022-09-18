import { GetStaticProps } from 'next';
import styles from '../styles/Home.module.css';

export const getStaticProps: GetStaticProps = () => ({
  props: {
    teams: [],
  },
});

type Team = {
    Id: Number,
    Name: string,
}

type TeamsPageProps = {
    teams: Team[],
}

const TeamsPage = ({ teams }: TeamsPageProps) => (
  <div className={styles.container}>
    <main>
      {teams.map((team) => (
        <div key={String(team.Id)}>
          { String(team) }
        </div>
      ))}
    </main>
  </div>
);

export default TeamsPage;