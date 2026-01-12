import { Routes, Route } from 'react-router-dom';
import Index from '../pages/Index';
import CreateProduct from '../pages/createProduct';

function routing() {
  return (
        <Routes>
            <Route path="/" element={< Index />} />
            <Route path="/create_product" element={<CreateProduct />} />
        </Routes>
    
  )
}

export default routing