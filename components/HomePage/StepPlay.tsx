import Image from "next/image"


export default function StepPlay({urlImg, numberStep,children}) {
	return(
		<div className="how-to-play__cart-step cart-step">
			<div className="cart-step__label">
				<div className="cart-step__number">
					{numberStep}.
				</div>
				<div className="cart-step__img">
					<Image
						alt='step img'
						src={urlImg}
						layout='fill'
						objectFit='cover'
					/>
				</div>
			</div>
			<div className="cart-step__box-text box-gradient">
				<div className="box-gradient__inner">
					{children}
				</div>
			</div>
		</div>
	)
}