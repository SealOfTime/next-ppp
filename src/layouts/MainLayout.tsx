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
      <div className="wrapper">
        {children}
      </div>
    </main>
  </>
);

export default MainLayout;
