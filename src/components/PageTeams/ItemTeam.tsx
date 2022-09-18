import Link from 'next/link';

type itemType = {
  id: string,
  name: string,
  members: string[]
}

type Props = {
  item: itemType;
}

const ItemTeam = ({ item }: Props) => (
  <Link href={`/teams/${item.id}`}>
    <div className="team-item">
      <span>
        {item.name.toUpperCase()}
      </span>
      <ul>
        {
          item.members.map((member) => (
            <li key={member}>
              {member}
            </li>
          ))
        }
      </ul>
    </div>
  </Link>
);

export default ItemTeam;
