import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../features/auth/authSlice';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');

    const submit = async () => {
        const res = await dispatch(
            registerUser({ email, password, displayName }) as any
        );

        if (res.payload) {
            navigate('/');
        }
    };

    return (
        <Container style={{ marginTop: 50 }}>
            <Typography variant="h4">Register</Typography>

            <TextField
                fullWidth
                label="Display name"
                margin="normal"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
            />

            <TextField
                fullWidth
                label="Email"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <Button variant="contained" onClick={submit}>
                Register
            </Button>
        </Container>
    );
};

export default Register;