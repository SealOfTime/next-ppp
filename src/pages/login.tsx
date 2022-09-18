import { useEffect } from 'react';

const Login = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    console.log(code);
    fetch(`/api/auth/code?code=${code}`, {
      method: 'POST',
    })
      .then(window.opener.OnLoggedIn)
      .then(window.close);
  }, []);
};

export default Login;
