import { FC } from 'react';

type MenuItem = {
  name: string;
  link?: string;
  callback?: () => void;
  className?: string;
}

interface IMenuBody {
  classActive: string;
  isOpen: boolean;
  items: MenuItem[];
}

const HeaderMenuBody: FC<IMenuBody> = ({ classActive, isOpen, items }) => (
  <div className={`menu__body ${isOpen && classActive}`}>
    <ul className="menu__list">
      { items.map((item) => (
        <li key={item.name} className="menu__item">
          <a className="menu__link" href={item.link} onClick={item.callback}>
            {item.name}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default HeaderMenuBody;
