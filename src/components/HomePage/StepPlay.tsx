export interface Props {
  children: React.ReactNode;
}

const StepPlay: React.FC<Props> = ({ children }) => (
  <div className="how-to-play__cart-step cart-step">
    <div className="cart-step__box-text">
      <div className="box-gradient__inner">
        {children}
      </div>
    </div>
  </div>
);

export default StepPlay;
