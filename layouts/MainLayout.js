import Head from 'next/head'

//Components
import HeaderMenu from '../components/header/HeaderMenu.tsx'

export default function MainLayout({children, title = 'title'}) {
	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
				<title>{title}</title>
			</Head>
			<HeaderMenu/>
			<main>
                <div className='wrapper'>
                    {children}
                </div>
			</main>
		</>
	)
}