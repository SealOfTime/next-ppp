import '../styles/_nullstyle.css'
import '../styles/_fonts.css'
import '../styles/globals.css'
import '../styles/header/header.css'

import '../styles/buttons/whiteBtn.css'
import '../styles/buttons/gradientBtn.css'

import '../styles/PageHome/PageHome.css'


import {SessionProvider} from 'next-auth/react'

function MyApp({ 
	Component, 
	pageProps: { session, ...pageProps },
	}) {
	return (
		<SessionProvider session={session}>
		<Component {...pageProps} />
		</SessionProvider>
	)
}

export default MyApp
