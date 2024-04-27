import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import GenEvm from '../pages/GenEvm.jsx';
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/genevm' element={<GenEvm />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
