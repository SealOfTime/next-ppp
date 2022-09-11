import Image from 'next/image';

const DateItem = ({ urlLogo, date, children }) => (
  <div className="date-item">
    <div className="date-item__logo">
      <Image
        alt="icon"
        src={urlLogo}
        layout="fill"
        objectFit="cover"
      />
    </div>
    <div className="date-item__title">
      {children}
    </div>
    <div className="date-item__date">
      {date}
    </div>
  </div>
);

export default DateItem;
