import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchComponent from './pages/SearchComponent';
import PackageDetailsPage from './pages/PackageDetailsPage';

const App: React.FC = () => {
  return (

      <BrowserRouter>


      <Routes>
        <Route path="/" element={<SearchComponent />} />
        <Route path="/details/:packageName" element={<PackageDetailsPage />} />
      </Routes>

      </BrowserRouter>


  );
};

export default App;