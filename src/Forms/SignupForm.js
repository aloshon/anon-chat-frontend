import React, {useContext} from "react";
import {useHistory} from "react-router-dom";
import useFields from '../Hooks/useFields';
import "./Forms.css";
import UserContext from "../UserContext";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const SignupForm = () => {
    const history = useHistory();
    const {signup} = useContext(UserContext);
    const [formData, handleChange] = useFields({
        username: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            let res = await signup(formData);
            if(res){
                history.push('/');
            }
        }catch(e){
            console.log(`Error signing up!:${e}`)
            alert(e)
        }
    }

    return (
        <Container className="postform">
            <h1>Sign Up</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control name="username" maxLength="30" type="text" value={formData.username} onChange={handleChange} placeholder="Username" />
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

export default SignupForm;