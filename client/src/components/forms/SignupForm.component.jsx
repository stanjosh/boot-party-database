import { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../util/mutations';
import Auth from '../../util/Auth';



const SignupForm = () => {
    // Component logic goes here
    const [createUser, { error }] = useMutation(CREATE_USER);
    const [validated] = useState(false);
    const [passwordCheck, setPasswordCheck] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [ signupForm, setSignupForm ] = useState({
        email: '',
        password: '',
        name: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSignupForm({
            ...signupForm,
            [name]: value,
        });
    };
    


    
    const handleSignup = async (e) => {
        e.preventDefault();

        // check if form has everything (as per react-bootstrap docs)
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
          e.preventDefault();
          e.stopPropagation();
        }
    
        try {
          const user = await createUser({
            variables: {
                userInput : signupForm
            }
            
          });
          Auth.login(user.data.createUser.token);
        } catch (err) {
          console.error(err);

        }
        setSignupForm({
          email: '',
          password: '',
          name: '',
        });
        setPasswordCheck('');

    }

    

    return (
        <>
            <Form noValidate 
                    validated={validated} 
                    onSubmit={handleSignup} 
                    style={{
                        padding: "20px", 
                        backgroundColor: "var(--alviesBlue)",
                        borderRadius: "3px"
                        }}>
            <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                Something went wrong with your login credentials!

            </Alert>

            <Form.Group className='mb-3'>
            <Form.Label htmlFor='name' visuallyHidden>Name</Form.Label>
            <Form.Control
                type='text'
                placeholder='Your name'
                name='name'
                onChange={handleInputChange}
                value={signupForm.name}
                required
                autoComplete='off'
            />
            <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3'>
            <Form.Label htmlFor='email' visuallyHidden>Email</Form.Label>
            <Form.Control
                type='text'
                placeholder='Your email'
                name='email'
                onChange={handleInputChange}
                value={signupForm.email}
                required
                autoComplete='off'
            />
            <Form.Control.Feedback type='invalid' >Email is required!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3'>
            <Form.Label htmlFor='password' visuallyHidden>Password</Form.Label>
            <Form.Control
                type='password'
                name='password'
                placeholder='password'
                onChange={handleInputChange}
                value={signupForm.password}
                required
                autoComplete='new-password'
            />
            <Form.Control.Feedback type='invalid'>Password is required</Form.Control.Feedback>
            </Form.Group>


            <Form.Group className='mb-3'>
            <Form.Label htmlFor='password' visuallyHidden>Confirm Password</Form.Label>

                        <Form.Control
                type='password'

                name='passwordCheck'
                placeholder='confirm password'
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

            {error && (
                <div className='my-3 p-3 bg-danger text-white'>
                {error.message}
                </div>
            )}
        </Form>
        
    </>
    );
};

export default SignupForm;
