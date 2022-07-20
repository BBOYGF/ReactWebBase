import React from 'react';
import Login from "./pages/login/Login";
import ErrorPage from './pages/error/ErrorPage'
import {
    HashRouter, Route, Routes
} from "react-router-dom";
import Home from "./pages/home/Home";
import PermPage from './pages/permission/PermPage';
import DataImportPage from "./pages/data_import/DataImportPage";

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route exact path="/login" element={<Login/>}/>
                <Route exact path="/" element={<Home/>}>
                    <Route exact path="/prem" element={<PermPage></PermPage>}/>
                    <Route exact path="/dataImport" element={<DataImportPage></DataImportPage>}/>
                </Route>
                <Route exact path="*" element={<ErrorPage/>}/>
            </Routes>
        </HashRouter>
    );
}

export default App;
