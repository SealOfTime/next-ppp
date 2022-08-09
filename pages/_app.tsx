import '../styles/_nullstyle.css';
import '../styles/_fonts.css';
import '../styles/globals.css';
import '../styles/_vars.css';

import '../styles/header/header.css';
import '../styles/header/burger.css';

import '../styles/buttons/whiteBtn.css';
import '../styles/buttons/gradientBtn.css';

import '../styles/PageHome/PageHome.css';
import '../styles/boxGradient.css';
import '../styles/PageHome/Gallery.css';
import '../styles/PageHome/CartSteps.css';
import '../styles/PageHome/DateItem.css';

import { SessionProvider } from 'next-auth/react';

const App = ({
  Component,
  pageProps: { session, ...pageProps },
}) => (
  <SessionProvider session={session}>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Component {...pageProps} />
  </SessionProvider>
);

export default App;
