import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import AddProgress from './AddProgress';
import ViewProgress from './ViewProgress';

function Pages() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="add" element={<AddProgress />} />
                    <Route path="view" element={<ViewProgress />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Pages