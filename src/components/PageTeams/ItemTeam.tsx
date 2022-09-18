import Link from 'next/link';
import { Team } from '../../pages/teams';

type Props = {
  item: Team;
}

const ItemTeam = ({ item }: Props) => (
  <Link href={`/teams/${item.id}`}>
    <div className="team-item">
      <h4 className='team-item__title'>
        {item.name.toUpperCase()}
      </h4>
      <span className='team-item__date'>Дата старта: {item.participationDate} </span>
      <h5>Участники:</h5>
      <ul>
        {
          item.members.map((member) => (
            <li key={member.vkId}>
              <a href={member.vkUrl}>
                {member.isCaptain && (<span role="img" aria-label="crown">👑</span>)} {member.name}
              </a>
            </li>
          ))
        }
      </ul>
    </div>
  </Link>
);

export default ItemTeam;
