import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const SignupView = () => {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {

        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };
        
        fetch("https://ga3lvkvqynglokokkhtrad65jy0rsexv.lambda-url.eu-central-1.on.aws/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            if (response.ok) {
                alert("Signup successful");
                window.open('/', '_self');
            } else {
                alert("Signup failed");
            }
        })
        .catch((e) => {
            alert("Authentication proccess failed")
        });
    }
    
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="forUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    className="form-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="5"
                    placeholder="At least 5 characters long"
                />
            </Form.Group>

            <Form.Group controlId="forPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    className="form-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="8"
                    placeholder="At least 8 characters long"
                />
            </Form.Group>

            <Form.Group controlId="forEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                    className="form-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="forBirthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                    className="form-input"
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    max={new Date().toISOString().substring(0, 10)}
                    required
                />
            </Form.Group>
            <Button className="mt-3 form-button" variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};