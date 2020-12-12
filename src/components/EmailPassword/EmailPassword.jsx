import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './EmailPassword.scss'
import AuthWrapper from '../AuthWrapper/AuhWrapper';
import { FormInput, Button } from '../Forms';

const EmailPassword = () => {
    const history = useHistory();

    const [ email, setEmail ] = useState("");
    const [ errors, setErrors ] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const configAuthWrapper = { headline: "Email Password" };

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
                        Email password
                    </Button>
                </form>
            </div>
        </AuthWrapper>
    )
}

export default EmailPassword
