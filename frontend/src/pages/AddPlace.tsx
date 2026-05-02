import { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const AddPlace = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [agree, setAgree] = useState(false);

    const submit = async () => {
        const formData = new FormData();

        formData.append('title', title);
        formData.append('description', description);
        formData.append('agree', String(agree));

        if (file) {
            formData.append('mainImage', file);
        }

        await api.post('/places', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        navigate('/');
    };

    return (
        <Container style={{ marginTop: 50 }}>
            <Typography variant="h4">Add new place</Typography>

            <TextField
                fullWidth
                label="Title"
                margin="normal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <TextField
                fullWidth
                label="Description"
                margin="normal"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
            />

            <div style={{ marginTop: 20 }}>
                <label>
                    <input
                        type="checkbox"
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                    />
                    {' '}
                    I understand that this information will be public
                </label>
            </div>

            <Button
                variant="contained"
                style={{ marginTop: 20 }}
                onClick={submit}
                disabled={!agree}
            >
                Submit the place
            </Button>
        </Container>
    );
};

export default AddPlace;