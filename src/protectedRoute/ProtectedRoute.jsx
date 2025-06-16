import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const userToken = localStorage.getItem('user-token');
    console.log("User Token:", localStorage.getItem('user-token'));


    if (!userToken) {
        return <Navigate to="/" />;
    }
    
    return children;
};

export default ProtectedRoute;
