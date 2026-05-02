import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPlaces } from '../features/places/placesSlice';
import { useAppSelector } from '../hooks/useAppSelector';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
    const dispatch = useDispatch();
    const places = useAppSelector((state) => state.places.items);

    useEffect(() => {
        dispatch(fetchPlaces() as any);
    }, []);

    return (
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {places.map((p) => (
                <Card key={p._id} style={{ width: 250 }}>
                    <Link to={`/places/${p._id}`}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={`http://localhost:8000/uploads/${p.mainImage}`}
                        />
                    </Link>

                    <CardContent>
                        <Typography>
                            <Link to={`/places/${p._id}`}>
                                {p.title}
                            </Link>
                        </Typography>

                        <Typography variant="body2">
                            {p.description}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default Home;