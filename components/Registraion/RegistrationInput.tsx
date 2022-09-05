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
}

const RegistrationInput: FC<Iinput> = ({ placeholder, type }) => (
  <input className="form-registration__input input-gradient" placeholder={placeholder} type={type} />
);

export default RegistrationInput;
