import React, { createContext, useState } from 'react'

export const ProductDetailContext = createContext();
const ProductDetailProvider = ({children}) => {
    const [productPurchased, setProductPurchased] = useState({
      product:'',
      total: 0
    });
  return (
    <ProductDetailContext.Provider value={[productPurchased, setProductPurchased]}>
        {children}
    </ProductDetailContext.Provider>
  )
}

export default ProductDetailProvider