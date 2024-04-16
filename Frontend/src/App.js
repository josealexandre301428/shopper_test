import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './Pages/notFound/NotFound';
import UpdateProducts from './Pages/products/UpdateProducts';

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path='/' element={<UpdateProducts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
