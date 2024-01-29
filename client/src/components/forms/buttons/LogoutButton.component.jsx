import Auth from '../../../util/Auth';


const LogoutButton = () => {
    const handleLogout = () => {
        
        Auth.logout();
    };

    return (
        <button onClick={handleLogout}>
            logout
        </button>
    );
};

export default LogoutButton;
