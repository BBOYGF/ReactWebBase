import React from 'react';
import Login from "./pages/login/Login";
import ErrorPage from './pages/ErrorPage'
import {
    BrowserRouter, Route, Routes
} from "react-router-dom";
import Home from "./pages/home/Home";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/login" element={<Login/>}/>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="*" element={<ErrorPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
