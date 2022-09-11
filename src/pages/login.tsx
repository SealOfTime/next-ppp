import { useSession, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';

const Login = () => {
  const { data: session, status } = useSession();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (status === 'loading') return;
    if (authenticated) return;
    if (session) {
      setAuthenticated(true);
      window.opener.postMessage('close buddy');
      window.close();
    } else {
      signIn('vk');
    }
  }, [session]);
};

export default Login;
