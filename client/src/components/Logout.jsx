import Auth from '../utils/auth';

export default function Logout() {

    const logoutHandler = () => {
        Auth.logout();
    };

    return (
        <>
            <button onClick={logoutHandler}>Logout</button>
        </>
    )
}