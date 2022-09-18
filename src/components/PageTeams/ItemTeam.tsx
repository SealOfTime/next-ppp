import Link from 'next/link';

type Props = {
  item: any;
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
            <li key={member}>
              {member.firstName} {member.lastName}
            </li>
          ))
        }
      </ul>
    </div>
  </Link>
);

export default ItemTeam;
