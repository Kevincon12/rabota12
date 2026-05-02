import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddPlace from "./pages/AddPlace.tsx";
import Place from "./pages/Place.tsx";

const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/add-place" element={<AddPlace />} />
                    <Route path="/places/:id" element={<Place />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
};

export default App;