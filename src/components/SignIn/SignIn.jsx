import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './SignIn.scss';
import AuthWrapper from '../AuthWrapper/AuhWrapper';
import { FormInput, Button } from '../Forms/index';

const SignIn = () => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
    }

    const configAuthWrapper = { headline: 'Login' }

    return (
        <AuthWrapper {...configAuthWrapper}>
            <div className="formWrap">
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
                            <Button>
                                Sign in with Google
                            </Button>
                        </div>
                    </div>
                    <div className="links">
                        <Link to="/recovery">
                            Reset Password
                        </Link>
                    </div>
                </form>
            </div>
        </AuthWrapper>
    )
}

export default SignIn
