import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './EmailPassword.scss'
import { resetPasswordStart, resetUserState } from '../../redux/User/actions';
import AuthWrapper from '../AuthWrapper/AuhWrapper';
import { FormInput, Button } from '../Forms';

const mapState = ({ user }) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    userErr: user.userErr
})

const EmailPassword = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { resetPasswordSuccess, userErr } = useSelector(mapState);
    const [ email, setEmail ] = useState("");
    const [ errors, setErrors ] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPasswordStart({ email }));
    }

    const configAuthWrapper = { headline: "Email Password" };

    useEffect(() => {
        if (resetPasswordSuccess) {
            dispatch(resetUserState())
            history.push("/login")
        }
    },[dispatch, history, resetPasswordSuccess]);

    useEffect(() => {
        if (Array.isArray(userErr)  && userErr.length > 0) {
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
                        type="email" name="email"
                        value={email} placeholder="Email"
                        handleChange={e => setEmail(e.target.value)}
                    />
                    <Button type="submit">
                        Reset password
                    </Button>
                </form>
            </div>
        </AuthWrapper>
    )
}

export default EmailPassword
