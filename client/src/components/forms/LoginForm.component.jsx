import { useState } from 'react';
import { Container, Button, Form, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../util/mutations';
import Auth from '../../util/Auth';


const LoginForm = () => {
    // Component logic goes here
    const [loginUser, { error }] = useMutation(LOGIN_USER);
    const [ loginSuccess, setLoginSuccess ] = useState(false);
    const [ loginForm, setLoginForm ] = useState({
        email: '',
        password: '',
    });

    const { email, password } = loginForm;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginForm({
            ...loginForm,
            [name]: value,
        });
    };
    
    const [validated] = useState(false);
    

    
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const user = await loginUser({
                variables: { ...loginForm }
            });
            Auth.login(user.data.loginUser.token);
            setLoginSuccess(true);
            setLoginForm({
                email: '',
                password: '',
            });
            } catch (e) {
                console.error(e);
            }

            
    }

    

    return (

            <Form noValidate 
                    validated={validated} 
                    onSubmit={handleLogin} 
                    style={{
                        padding: "20px", 
                        backgroundColor: "var(--alviesBlue)",
                        borderRadius: "3px"
                    }
            }>

            <Container>
                {error && <Alert variant='danger'>{error?.message}</Alert>}
                {loginSuccess && <Alert variant='success'>Logging you in...</Alert>}
            </Container>

            <Form.Group className='mb-3'>
            <Form.Label htmlFor='email' visuallyHidden>Email</Form.Label>
            <Form.Control
                type='text'
                placeholder='email'
                name='email'
                onChange={handleInputChange}
                value={email}
                autoComplete='current-email'
                required
            />
            <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3'>
            <Form.Label htmlFor='password'visuallyHidden>Password</Form.Label>
            
            <Form.Control
                type='password'
                placeholder='password'
                name='password'
                onChange={handleInputChange}
                value={password}
                autoComplete='current-password'
                required
            />
            <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
            </Form.Group>
            <Button
                disabled={!(email && password)}
                type='submit'
                className='formButtom'>
                log in
            </Button>
            

        
        </Form>


    );
};

export default LoginForm;
