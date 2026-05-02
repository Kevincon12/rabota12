import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import { useAppSelector } from '../hooks/useAppSelector';
import {
    Container,
    Typography,
    Card,
    CardMedia,
    TextField,
    Button,
    Paper,
    Stack,
    Box,
    Rating,
} from '@mui/material';

interface Review {
    _id: string;
    text: string;
    foodQuality: number;
    serviceQuality: number;
    interior: number;
    user: { _id: string; displayName: string };
}

interface Image {
    _id: string;
    image: string;
}

const Place = () => {
    const { id } = useParams();
    const user = useAppSelector((state) => state.auth.user);

    const [data, setData] = useState<any>(null);

    const [text, setText] = useState('');
    const [food, setFood] = useState(5);
    const [service, setService] = useState(5);
    const [interior, setInterior] = useState(5);

    const fetchPlace = async (placeId: string) => {
        const res = await api.get(`/places/${placeId}`);
        setData(res.data);
    };

    useEffect(() => {
        if (id) fetchPlace(id);
    }, [id]);

    const addReview = async () => {
        try {
            if (!id || !text.trim()) return;

            await api.post('/reviews', {
                place: id,
                text: text.trim(),
                foodQuality: food,
                serviceQuality: service,
                interior,
            });

            setText('');
            fetchPlace(id);
        } catch (e: any) {
            alert(e?.response?.data?.error || 'Error');
        }
    };

    const deleteReview = async (reviewId: string) => {
        try {
            await api.delete(`/reviews/${reviewId}`);
            if (id) fetchPlace(id);
        } catch (e: any) {
            alert(e?.response?.data?.error || 'Delete error');
        }
    };

    const uploadImage = async (e: any) => {
        if (!id) return;

        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('place', id);
        formData.append('image', file);

        await api.post('/images', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        fetchPlace(id);
    };

    if (!data) return null;

    const { place, reviews = [], images = [], ratings } = data;

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4">{place.title}</Typography>

            <Box sx={{ mt: 2 }}>
                <img
                    src={`http://localhost:8000/uploads/${place.mainImage}`}
                    width="400"
                />
            </Box>

            <Typography sx={{ mt: 2 }}>
                {place.description}
            </Typography>

            <Paper sx={{ p: 2, mt: 3 }}>
                <Typography variant="h6">Ratings</Typography>

                <Stack spacing={1} sx={{ mt: 1 }}>
                    <Box>
                        <Rating value={ratings.foodAvg} readOnly />
                        <Typography>Food: {ratings.foodAvg}</Typography>
                    </Box>

                    <Box>
                        <Rating value={ratings.serviceAvg} readOnly />
                        <Typography>Service: {ratings.serviceAvg}</Typography>
                    </Box>

                    <Box>
                        <Rating value={ratings.interiorAvg} readOnly />
                        <Typography>Interior: {ratings.interiorAvg}</Typography>
                    </Box>

                    <Box>
                        <Rating value={ratings.overall} readOnly />
                        <Typography>Overall: {ratings.overall}</Typography>
                    </Box>
                </Stack>
            </Paper>

            <Paper sx={{ p: 2, mt: 3 }}>
                <Typography variant="h6">Gallery</Typography>

                <Box sx={{ mt: 2 }}>
                    <input type="file" onChange={uploadImage} />
                </Box>

                <Stack direction="row" spacing={2} sx={{ mt: 2, flexWrap: 'wrap' }}>
                    {images.map((img: Image) => (
                        <Card key={img._id} sx={{ width: 150 }}>
                            <CardMedia
                                component="img"
                                height="120"
                                image={`http://localhost:8000/uploads/${img.image}`}
                            />
                        </Card>
                    ))}
                </Stack>
            </Paper>

            <Paper sx={{ p: 2, mt: 3 }}>
                <Typography variant="h6">Reviews</Typography>

                <Stack spacing={2} sx={{ mt: 2 }}>
                    {reviews.length === 0 ? (
                        <Typography>No reviews yet</Typography>
                    ) : (
                        reviews.map((r: Review) => {
                            const canDelete =
                                user &&
                                (user.role === 'admin' || user._id === r.user._id);

                            return (
                                <Paper key={r._id} sx={{ p: 2 }}>
                                    <Stack
                                        component="div"
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        <Typography sx={{ fontWeight: 700 }}>
                                            {r.user.displayName}
                                        </Typography>

                                        {canDelete && (
                                            <Button
                                                color="error"
                                                onClick={() => deleteReview(r._id)}
                                            >
                                                Delete
                                            </Button>
                                        )}
                                    </Stack>

                                    <Typography>{r.text}</Typography>
                                </Paper>
                            );
                        })
                    )}
                </Stack>
            </Paper>

            {user ? (
                <Paper sx={{ p: 2, mt: 3 }}>
                    <Typography variant="h6">Add Review</Typography>

                    <TextField
                        fullWidth
                        label="Review text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        sx={{ mt: 2 }}
                    />

                    <Stack spacing={2} sx={{ mt: 2 }}>
                        <Box>
                            <Typography>Food</Typography>
                            <Rating value={food} onChange={(_, v) => setFood(v || 1)} />
                        </Box>

                        <Box>
                            <Typography>Service</Typography>
                            <Rating value={service} onChange={(_, v) => setService(v || 1)} />
                        </Box>

                        <Box>
                            <Typography>Interior</Typography>
                            <Rating value={interior} onChange={(_, v) => setInterior(v || 1)} />
                        </Box>
                    </Stack>

                    <Button
                        variant="contained"
                        sx={{ mt: 3 }}
                        onClick={addReview}
                        disabled={!text.trim()}
                    >
                        Submit review
                    </Button>
                </Paper>
            ) : (
                <Typography sx={{ mt: 3 }} color="text.secondary">
                    Login to leave a review
                </Typography>
            )}
        </Container>
    );
};

export default Place;