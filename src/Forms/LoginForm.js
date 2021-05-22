import React, {useContext} from "react";
import {useHistory} from "react-router-dom";
import useFields from '../Hooks/useFields';
import "./Forms.css";
import UserContext from "../UserContext";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

/**
 * LoginForm component renders form for users to log in
 */
const LoginForm = () => {
    const history = useHistory();
    const {login} = useContext(UserContext);
    const [formData, handleChange] = useFields({
        username: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            let res = await login(formData);
            if(res){
                history.push('/');
            }
        }catch(e){
            console.log(`Error Logging in!:${e}`)
            alert(e)
        }
    }

    return (
        <Container className="postform" style={{marginTop: "20px"}}>
            <h1>Log In</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control name="username" type="text" value={formData.username} onChange={handleChange} placeholder="Username" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit" size="md" block>
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default LoginForm;