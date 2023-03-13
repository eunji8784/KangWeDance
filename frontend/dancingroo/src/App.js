import React from "react";
import './App.css';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";


import HBLayout from './layout/HBLayout'
// Pages
import MainPage from './pages/MainPage';
import PhotosPage from './pages/PhotosPage';
import StatusPage from './pages/StatusPage';
import UserPage from './pages/UserPage';
import DancesPage from './pages/DancesPage';
import GamesPage from './pages/GamesPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* 헤더 있음 */}
                <Route element={<HBLayout/>}>
                  <Route path="" element={<MainPage/>} />
                  <Route path="/photos" element={<PhotosPage />} />
                  <Route path="/status" element={<StatusPage />} />
                  <Route path="/users" element={<UserPage />} />
                  <Route path="/dances" element={<DancesPage />} />
                  <Route path="/games" element={<GamesPage />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;