import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// components
import Home from "./components/Home"
import Anime from "./components/Anime"
import NotFound from "./components/NotFound"
import Header from "./components/Header";

// styles
import { GlobalStyle } from "./GlobalStyles";

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/anime/:animeId' element={<Anime />} />
      <Route path='/*' element={<NotFound />} />
    </Routes>
    <GlobalStyle />
  </Router>
)

export default App;
