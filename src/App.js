import React from "react";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home/Home";
import Video from "./pages/Video/Video";
// import { Counter } from './features/counter/Counter';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />}></Route>

        <Route path="/videos/:videoId" element={<Video />}></Route>

      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
