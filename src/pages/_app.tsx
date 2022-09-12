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

import { SessionProvider, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Auth = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isUser = !!session?.user;
  useEffect(() => {
    if (status === 'loading') return;
    if (!isUser) router.push('/');
  }, [isUser, status, router]);
  if (isUser) {
    return children;
  }
  return null;
};

const App = ({
  Component,
  pageProps: { session, ...pageProps },
}) => (
  <SessionProvider session={session}>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    {
      Component.auth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )
    }

  </SessionProvider>
);

export default App;
