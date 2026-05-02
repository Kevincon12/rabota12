import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { useAppSelector } from '../hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { Link } from 'react-router-dom';

const Header = () => {
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    return (
        <AppBar position="static">
            <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">
                    <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                        All Places
                    </Link>
                </Typography>

                <div style={{ display: 'flex', gap: 10 }}>
                    {!user && (
                        <>
                            <Button color="inherit" component={Link} to="/login">
                                Login
                            </Button>
                            <Button color="inherit" component={Link} to="/register">
                                Sign up
                            </Button>
                        </>
                    )}

                    {user && (
                        <>
                            <Typography style={{ marginTop: 8 }}>
                                Hello, {user.displayName}
                            </Typography>

                            <Button color="inherit" component={Link} to="/add-place">
                                Add new place
                            </Button>

                            <Button color="inherit" onClick={() => dispatch(logout())}>
                                Logout
                            </Button>
                        </>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Header;