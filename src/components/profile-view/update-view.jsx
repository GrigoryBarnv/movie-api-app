import { useState } from "react";
import { ProfileView } from "./profile-view"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/actions/userActions";

export const UpdateView = ({ setShowForm }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const token = useSelector(state => state.user.token);
    const movies = useSelector(state => state.movies.movies);
    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);
    const [errors, setErrors] = useState([]); // new state to hold validation errors

    const validateForm = () => {
        let isValid = true;
        let errorMessage = "";

        // Check if username is at least 5 characters long
        if (username.length < 5) {
            isValid = false;
            errorMessage = "Username must be at least 5 characters long";
        }

        // Check if password is at least 8 characters long
        if (password && password.length < 8) {
            isValid = false;
            errorMessage = "Password must be at least 8 characters long";
        }

        // Check if email is valid
        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            isValid = false;
            errorMessage = "Please enter a valid email address";
        }

        // Check if birthday is selected
        if (!birthday) {
            isValid = false;
            errorMessage = "Please select a birthday";
        }

        // If form is not valid, display error message
        if (!isValid) {
            alert(errorMessage);
            return false;
        }

        return true;
    };

    const handleDelete = () => {
        fetch(`https://ga3lvkvqynglokokkhtrad65jy0rsexv.lambda-url.eu-central-1.on.aws/users/${user.Username}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.ok) {
                alert("Account successfully deleted");
                localStorage.clear();
                dispatch(setUser(null, null));
                window.open('/', '_self');
            } else {
                alert("Failed to delete");
            }
        })
        .catch((e) => {
            alert("Authentication proccess failed")
        });
    };

    const handleUpdateSubmit = (event) => {

        event.preventDefault();

        if (!validateForm()) return;

        const data = {
            Username: username,
            Email: email,
            Birthday: birthday
        };

        if (password) {
            data.Password = password;
          }

        fetch(`https://ga3lvkvqynglokokkhtrad65jy0rsexv.lambda-url.eu-central-1.on.aws/users/${user.Username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then((response) => response.json())
        .then((data) => {
            // console.log("Update response: ", data);
            if(data) {
                localStorage.setItem("user", JSON.stringify(data));
                dispatch(setUser(data, token));
                alert("Data updated");
            } else if(response.status === 422) {
                return response.json().then(err => {
                    setErrors(err.errors);
                    console.log(errors);
                });
            }
             else {
                alert("Failed to update user");
            }
        })
        .catch((e) => {
            alert("Authentication proccess failed")
        });

        setShowForm(false);
    };
    
    return (
        <Form onSubmit={handleUpdateSubmit}>
            <Form.Group controlId="forUsername" className="mb-3">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    className="form-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    minLength="5"
                    />
                <Form.Text className="text-muted">
                    At least 5 characters long
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="forPassword" className="mb-3">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    className="form-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength="8"
                />
                <Form.Text>
                    At least 8 characters long
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="forEmail" className="mb-3">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                    className="form-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="forBirthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                    className="form-input"
                    type="date"
                    value={birthday ? new Date(birthday).toISOString().substring(0, 10) : ''}
                    onChange={(e) => setBirthday(e.target.value)}
                    max={new Date().toISOString().substring(0, 10)}
                />
            </Form.Group>
            <div className="d-flex button-group-profile">
            <Button className="mt-3" variant="primary" type="submit">
                Submit
            </Button>
            <Button className="mt-3" variant="danger" onClick={() => { 
                if (window.confirm('Are you sure you want to delete your account?')) {
                    handleDelete()
                }
            }} >Delete Account</Button>
            </div>
        </Form>
    );
};