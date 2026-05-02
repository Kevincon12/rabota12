import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

interface Place {
    _id: string;
    title: string;
    description: string;
    mainImage: string;
}

interface PlacesState {
    items: Place[];
}

const initialState: PlacesState = {
    items: [],
};

export const fetchPlaces = createAsyncThunk(
    'places/fetchPlaces',
    async () => {
        const res = await api.get('/places');
        return res.data;
    }
);

const placesSlice = createSlice({
    name: 'places',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPlaces.fulfilled, (state, action) => {
            state.items = action.payload;
        });
    },
});

export default placesSlice.reducer;