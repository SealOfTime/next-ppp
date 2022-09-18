/* eslint-disable react/jsx-props-no-spreading */
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import '../styles/_vars.css';
import '../styles/_nullstyle.css';
import '../styles/_fonts.css';
import '../styles/globals.css';

import '../styles/header/header.css';
import '../styles/header/burger.css';

import '../styles/buttons/whiteBtn.css';
import '../styles/buttons/gradientBtn.css';

import '../styles/PageHome/PageHome.css';
import '../styles/boxGradient.css';
import '../styles/PageHome/Gallery.css';
import '../styles/PageHome/CartSteps.css';
import '../styles/PageHome/DateItem.css';

import '../styles/PageRegistration/Registration.css';
import '../styles/PageRegistration/RegistrationInput.css';
import '../styles/PageRegistration/RegistrationRadioBtn.css';

import '../styles/PageTeam/Team.css';

import { useEffect, useState } from 'react';
import { AuthProvider, Session } from '../Auth.client';

const App = ({
  Component,
  pageProps,
}) => {
  const [session, setSession] = useState<Session>();

  useEffect(() => {
    (window as any).OnLoggedIn = () => {

    };
  });

  return (
    <AuthProvider value={{ session, setSession }}>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default App;
