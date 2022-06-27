import styles from '../styles/Home.module.css'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'

export const getStaticProps: GetStaticProps = (context) => {
    return {
        props: {
            teams: [],
        },
    }
}

type Team = {
    Id: Number,
    Name: string,
}

type TeamsPageProps = {
    teams: Team[],
}

export default function TeamsPage({ teams }: TeamsPageProps) {
    return (
        <div className={styles.container}>
            <main>
                {teams.map((team, i) => (
                    <div key={i}>
                        { String(team) }
                    </div>
                ))}
            </main>
        </div>
    )
}