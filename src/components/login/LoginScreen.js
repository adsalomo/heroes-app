import React, { useContext } from 'react'
import { AuthContext } from '../../auth/AuthContext'
import { types } from '../../types/types';

export const LoginScreen = ({ history }) => {

    const { dispatch } = useContext(AuthContext);

    const handleOnClick = () => {
        // history.push('/');
        //history.replace('/'); // no guarda la pagina anterior

        const lastPath = localStorage.getItem('lastPath') || '/';

        const action = {
            type: types.login,
            payload: {
                name: 'Elena'
            }
        };

        dispatch(action);

        history.replace(lastPath);
    }

    return (
        <div className="container mt-5">
            <h1>Login</h1>
            <hr />
            <button
                className="btn btn-primary"
                onClick={handleOnClick}
            >
                Login
            </button>
        </div>
    )
}
