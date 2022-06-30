import React,{FC} from "react"

interface IBurger {
	onClick: () => void;
}

const Burger: FC<IBurger> = ({
		onClick,
	}) => {
	return (
		<div onClick={onClick} className="header__burger burger">
			<span className="burger__line"></span>
		</div>
	)
}

export default Burger; 

// export default function Burger<Burger>({onClick}):React.FunctionComponent {
//     return(
//         <div className="header__burger burger">
//             <span className="burger__line"></span>
//         </div>
//     )
// }

