import React from 'react'
import { Button } from '@material-ui/core'
import './login.css'
import { auth, provider } from './firebase'
import { useStateValue } from './StateProvider'
import { actionType } from './reducer'

function Login() {
    const [{}, dispatch] = useStateValue();
    const signIn = () => {
        auth
            .signInWithPopup(provider)
            .then((result) => {
                dispatch({
                    type: actionType.SET_USER,
                    user: result.user,
                })
            })
            .catch((error) => alert(error.message));
    }
    return (
        <div className="login">
            <div className="login__container">
                <div className="login__text">
                    <h2 className="Login__h2">Sign in to WhAt's ChAt</h2>
                </div>
                <Button className="login-btn" type="submit" onClick={signIn}>
                    Sign in with Google
                </Button>
            </div>
        </div>
    )
}

export default Login
