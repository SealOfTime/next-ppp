import React, {FC} from "react"

interface IRadioBtn {
	date: number,
	groupName: string,
	onChecked?: () => number;
}

const RegistrationRadioBtn:FC<IRadioBtn> = ({date,groupName, onChecked}) => {
	return (
		<>
		<span className="">
			{date}
		</span>
		<label >
			<input className="" type='radio' name={groupName} onChange={onChecked}>
			
			</input>
		</label>
		</>
		
	) 
}

export default RegistrationRadioBtn