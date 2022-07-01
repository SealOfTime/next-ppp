import React, {FC} from "react"

interface IRadioBtn {
	date: number,
	groupName: string,
	onChecked?: () => number;
}

const RegistrationRadioBtn:FC<IRadioBtn> = ({date,groupName, onChecked}) => {
	return (
		<label className="registration-radion-btn">
			<input className="registration-radion-btn__input" type='radio' name={groupName} onChange={onChecked}/>
			<span className="registration-radion-btn__text">
				{date}
			</span>
		</label>
	) 
}

export default RegistrationRadioBtn