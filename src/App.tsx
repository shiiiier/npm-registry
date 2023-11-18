import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchComponent from './pages/SearchComponent';
import PackageDetailsPage from './pages/PackageDetailsPage';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (

    

    <BrowserRouter>
    <Navbar />

    <Routes>
    <Route path="/" element={<SearchComponent />} />
    <Route path="/details/:packageName" element={<PackageDetailsPage />} />
    </Routes>

    </BrowserRouter>


  );
};

export default App;