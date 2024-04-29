import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import GenEvm from '../pages/GenEvm.jsx';
import EvmBalance from '../pages/EvmBalance.jsx';
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/genevm' element={<GenEvm />} />
        <Route path='/evmbalance' element={<EvmBalance />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
