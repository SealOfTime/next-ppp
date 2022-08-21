import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";

const login = () => {
	const {data: session, status} = useSession();
	useEffect(() => {
		if(session) {
			window.close();
		} else {
			signIn();
		}	
	}, [session])
	return null;
}

export default login