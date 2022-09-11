export interface Props {
  children: React.ReactNode;
}

const StepPlay: React.FC<Props> = ({ children }) => (
  <div className=" cart-step">
    <p className="cart-step__box-text">
      {children}
    </p>
  </div>
);

export default StepPlay;
