import Auth from '../utils/auth';

export default function Logout() {

    const logoutHandler = () => {
        Auth.logout();
        document.location.replace('/');
    };

    return (
        <>
            <button onClick={logoutHandler}>Logout</button>
        </>
    )
}