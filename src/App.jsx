/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";

import NavbarAndOffcanvas from './components/NavbarAndOffcanvas';
import Home from "./home/Home";
import LogIn from "./login/LogIn";
import Register from "./register/Register";
import BookDetails from "./details/BookDetails";
import FullPage from "./fullpage/FullPage";
import UserSettings from './usersettings/UserSettings';
import LibraryList from './librarylist/LibraryList';

function App() {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === '/' || currentPath === '/register') {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [location]);
  

  return (
    <>
      {showNavbar && <NavbarAndOffcanvas />}
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path='/books/:id' element={<BookDetails/>}/>
        <Route path='/books/full/:id' element={<FullPage/>}/>
        <Route path="/userSettings" element={<UserSettings />} />
        <Route path="/userLibrary" element={<LibraryList />} />
      </Routes>
    </>
  );
}

export default App;
