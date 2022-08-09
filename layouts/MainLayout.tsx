import Head from 'next/head';

// Components
import NavMenu from '../components/menu/NavMenu';

const MainLayout = ({ children, title = 'title' }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    <NavMenu />
    <main>
      {children}
    </main>
  </>
);

export default MainLayout;
