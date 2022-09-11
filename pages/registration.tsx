import { useSession } from 'next-auth/react';
import MainLayout from '../layouts/MainLayout';
import RegistrationInput, { InputType } from '../components/Registraion/RegistrationInput';
import RegistrationRadioBtn from '../components/Registraion/RegistrationRadioBtn';

export const getStaticProps = async () => {
  const data1 = {
    dates: [11, 12, 13],
  };
  return {
    props: {
      data1,
    },
  };
};

const Registration = ({ data1 }) => {
  const { data: session } = useSession();
  const submitForm = (e) => {
    e.preventDefault();
  };
  const datesItem = data1.dates.map((date: number, index:number) => <RegistrationRadioBtn key={index} date={date} groupName="dates" />);

  return (
    <MainLayout>
      <div className="registration">
        <div className="registartion__container container">
          <h2 className="registration__title title-section">Регистрация</h2>
          <form className="registration__form form-registration" action="">
            <div className="form-registration__inputs">
              <RegistrationInput type={InputType.text} placeholder="Название команды" defaultValue="" name="name_team" />
              <RegistrationInput type={InputType.text} placeholder="ФИ капитана команды" defaultValue={session.user.name} name="name_captain" />
              <RegistrationInput type={InputType.phone} placeholder="Телеофн капитана команды" defaultValue="" name="phone" />
              <RegistrationInput type={InputType.url} placeholder="vk.com/капитана команды" defaultValue="" name="urlVK" />
            </div>

            <div className="form-registration__dates">
              <span className="form-registration__text">Выберите дату:</span>
              <div className="form-registration__dates-radio">
                {datesItem}
              </div>
            </div>
            <div className="form-registration__box-btn">
              <button type="submit" onClick={submitForm} className="form-registration__btn-submit gradientBtn">
                <span>Готово</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default Registration;
Registration.auth = true;
