import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import './SignIn.scss';
import { emailSignInStart, googleSignInStart } from '../../redux/User/actions';
import AuthWrapper from '../AuthWrapper/AuhWrapper';
import { FormInput, Button } from '../Forms/index';

const mapState = ({ user }) => ({
    currentUser: user.currentUser,
    userErr: user.userErr
})

const SignIn = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { currentUser, userErr } = useSelector(mapState)

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ errors, setErrors ] = useState([]);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(emailSignInStart({ email, password }))
    }

    const handleGoogleSignIn = () => {
        dispatch(googleSignInStart())
    }

    const resetForm = () => {
        setEmail("")
        setPassword("")
        setErrors([])
    }

    const configAuthWrapper = { headline: 'Login' }

    useEffect(() => {
        if (currentUser) {
            resetForm();
            history.push("/")
        }
    },[currentUser, history])

    useEffect(() => {
        if (Array.isArray(userErr) && userErr.length > 0) {
            setErrors(userErr)
        }
    },[userErr])

    return (
        <AuthWrapper {...configAuthWrapper}>
            <div className="formWrap">
            {errors.length > 0 && (
                    <ul>
                        {errors.map((error, index) => {
                            return (
                                <li className="error" key={index}>
                                    {error}
                                </li>
                            )
                        })}
                    </ul>
                )}
                <form onSubmit={handleSubmit}>
                    <FormInput
                        type="email" name="email" value={email}
                        placeholder="Email"
                        handleChange={e => setEmail(e.target.value)}
                    />
                    <FormInput
                        type="password" name="password" value={password}
                        placeholder="Password"
                        handleChange={e => setPassword(e.target.value)}
                    />
                    <Button type="submit">
                        LogIn
                    </Button>
                    <div className="socialSignin">
                        <div className="row">
                            <Button onClick={handleGoogleSignIn}>
                                Sign in with Google
                            </Button>
                        </div>
                    </div>
                    <div className="links">
                        <Link to="/recovery">
                            Forget Password ?
                        </Link>
                    </div>
                </form>
            </div>
        </AuthWrapper>
    )
}

export default SignIn
