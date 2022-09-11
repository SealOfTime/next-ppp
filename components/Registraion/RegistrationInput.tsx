import React, { FC } from 'react';

export enum InputType {
  text='text',
  number='number',
  phone='tel',
  url='url',
  email='email',
}

interface Iinput {
  placeholder?: string;
  type: InputType,
  defaultValue: string | number | '',
  name: string,
}

const RegistrationInput: FC<Iinput> = ({
  placeholder, type, defaultValue, name,
}) => (
  <input className="form-registration__input input-gradient" placeholder={placeholder} type={type} required name={name} defaultValue={defaultValue} />
);

export default RegistrationInput;
