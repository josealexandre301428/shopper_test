import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import ProductContext from './context';

function ProductProvider({ children }) {
  const [product, setProduct] = useState([]);

  const value = useMemo(() => ({
    product,
    setProduct
  }), [product]);

  return (
    <ProductContext.Provider value={ value }>
      { children }
    </ProductContext.Provider>
  );
}

export default ProductProvider;

ProductProvider.propTypes = {
  children: PropTypes.element,
}.isRequired;
