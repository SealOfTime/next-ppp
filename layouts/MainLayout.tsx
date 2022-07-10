import Head from 'next/head'

//Components
import HeaderMenu from '../components/header/HeaderMenu'

export default function MainLayout({children, title = 'title'}) {
	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<HeaderMenu/>
			<main>
				{children}
			</main>
		</>
	)
}