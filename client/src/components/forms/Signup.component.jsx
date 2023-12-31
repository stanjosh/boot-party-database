import React, { useState } from 'react';
import { Container, Button, Form, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../util/mutations';
import Auth from '../../util/Auth';


const Login = () => {
    // Component logic goes here
    const [loginUser, { error }] = useMutation(LOGIN_USER);
    const [ loginSuccess, setLoginSuccess ] = useState(false);
    const [ signupForm, setSignupForm ] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSignupForm({
            ...signupForm,
            [name]: value,
        });
    };
    
    const [validated] = useState(false);
    const [passwordCheck, setPasswordCheck] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const user = await loginUser({
                variables: { ...signupForm }
            });
            Auth.login(user.data.loginUser.token);
            } catch (e) {
                console.error(e);
            }
                setSignupForm({
                    email: '',
                    password: '',
                });
            setLoginSuccess(true);
    }

    

    return (
        <>
            <Form noValidate 
                    validated={validated} 
                    onSubmit={handleLogin} 
                    style={{
                        padding: "20px", 
                        backgroundColor: "var(--alviesBlue)",
                        borderRadius: "3px"
                        }}>
            <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
            Something went wrong with your login credentials!
            </Alert>
            <Form.Group className='mb-3'>
            <Form.Label htmlFor='email'>Email</Form.Label>
            <Form.Control
                type='text'
                placeholder='Your email'
                name='email'
                onChange={handleInputChange}
                value={signupForm.email}
                required
                autoComplete='off'
            />
            <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3'>
            <Form.Label htmlFor='password'>Password</Form.Label>
            <Form.Control
                type='password'
                name='password'
                onChange={handleInputChange}
                value={signupForm.password}
                required
                autoComplete='new-password'
            />
            <Form.Control.Feedback type='invalid'>Password is required</Form.Control.Feedback>
            </Form.Group>


            <Form.Group className='mb-3'>
            <Form.Label htmlFor='password'>Check Password</Form.Label>

                        <Form.Control
                type='password'

                name='passwordCheck'
                onChange={(e) => setPasswordCheck(e.target.value)}
                value={passwordCheck}
                required
                isInvalid={signupForm.password !== passwordCheck}
                autoComplete='new-password'
            />
            <Form.Control.Feedback type='invalid'>Passwords don't match!</Form.Control.Feedback>
            </Form.Group>



            <Button
                disabled={!(signupForm.email && signupForm.password == passwordCheck)}
                type='submit'
                className='formButtom'>
                log in
            </Button>
            {error && <Alert variant='danger'>Error logging in!</Alert>}
            {loginSuccess && <Alert variant='success'>Success!</Alert>}
        </Form>
        
    </>
    );
};

export default Login;
