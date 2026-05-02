import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPlaces } from '../features/places/placesSlice';
import { useAppSelector } from '../hooks/useAppSelector';
import api from '../api/axios';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    Box,
    Rating,
    Stack,
} from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
    const dispatch = useDispatch();
    const places = useAppSelector((state) => state.places.items);
    const user = useAppSelector((state) => state.auth.user);

    useEffect(() => {
        dispatch(fetchPlaces() as any);
    }, []);

    const deletePlace = async (id: string) => {
        try {
            await api.delete(`/places/${id}`);
            dispatch(fetchPlaces() as any);
        } catch (e: any) {
            alert(e?.response?.data?.error || 'Delete error');
        }
    };

    return (
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {places.map((p: any) => (
                <Card key={p._id} sx={{ width: 260 }}>
                    <Link to={`/places/${p._id}`}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={`http://localhost:8000/uploads/${p.mainImage}`}
                        />
                    </Link>

                    <CardContent>
                        <Typography variant="h6">
                            <Link
                                to={`/places/${p._id}`}
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                                {p.title}
                            </Link>
                        </Typography>

                        <Typography variant="body2" sx={{ mb: 1 }}>
                            {p.description}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Rating value={p.rating?.overall || 0} readOnly size="small" />
                            <Typography variant="body2">
                                {p.rating?.overall || 0}
                            </Typography>
                        </Box>

                        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                            <Typography variant="caption">
                                Reviews: {p.rating?.reviewsCount || 0}
                            </Typography>

                            <Typography variant="caption">
                                Photos: {p.imagesCount || 0}
                            </Typography>
                        </Stack>

                        {user?.role === 'admin' && (
                            <Button
                                color="error"
                                size="small"
                                sx={{ mt: 1 }}
                                onClick={() => deletePlace(p._id)}
                            >
                                Delete
                            </Button>
                        )}
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default Home;