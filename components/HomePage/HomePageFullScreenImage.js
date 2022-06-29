import Image from "next/image";
import background from '../../public/content/backgroung.jpg'

const FullScreenImage = ({className}) => {
	return(
		<div className = {`${className}`}>
			<Image  
				alt='bg'
				src = {background}
				layout='fill'
				objectFit='cover'
				priority
			/>
		</div>
	)
}

export default FullScreenImage