import Image from 'next/image';

export interface Props {
  children: React.ReactNode;
  imageURL: string;
}

const Background: React.FC<Props> = ({ children, imageURL }) => (
  <div className="background">
    <Image src={imageURL} layout="fill" alt="bg" />
    {children}
  </div>
);

export default Background;
