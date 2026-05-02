import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submit = async () => {
        const res = await dispatch(loginUser({ email, password }) as any);

        if (res.payload) {
            navigate('/');
        }
    };

    return (
        <Container style={{ marginTop: 50 }}>
            <Typography variant="h4">Login</Typography>

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
                Login
            </Button>
        </Container>
    );
};

export default Login;