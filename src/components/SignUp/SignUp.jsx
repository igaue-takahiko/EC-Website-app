import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './SignUp.scss'
import AuthWrapper from '../AuthWrapper/AuhWrapper';
import { FormInput, Button } from '../Forms';

const mapState = ({ user }) => ({
    currentUser: user.currentUser,
    userErr: user.userErr
})

const SignUp = () => {
    const history = useHistory();

    const [ displayName, setDisplayName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ errors, setErrors ] = useState([]);

    const reset = () => {
        setDisplayName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setErrors("");
    };

    const configAuthWrapper = { headline: "Registration" }

    const handleFormSubmit = e => {
        e.preventDefault();
    }

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
                <form onSubmit={handleFormSubmit}>
                    <FormInput
                        type="text" name="DisplayName"
                        value={displayName} placeholder="Full name"
                        handleChange={e => setDisplayName(e.target.value)}
                    />
                    <FormInput
                        type="email" name="email"
                        value={email} placeholder="Email"
                        handleChange={e => setEmail(e.target.value)}
                    />
                    <FormInput
                        type="password" name="password"
                        value={password} placeholder="Password"
                        handleChange={e => setPassword(e.target.value)}
                    />
                    <FormInput
                        type="password" name="configPassword"
                        value={confirmPassword} placeholder="Confirm Password"
                        handleChange={e => setConfirmPassword(e.target.value)}
                    />
                    <Button type="submit">
                        Register
                    </Button>
                </form>
            </div>
        </AuthWrapper>
    )
}

export default SignUp
