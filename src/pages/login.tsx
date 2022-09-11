import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';

const Login = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      window.close();
    } else {
      signIn('vk');
    }
  }, [session]);
};

export default Login;
