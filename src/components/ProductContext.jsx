import React, { createContext, useEffect, useState } from 'react';
import { db } from '../config/Config';

export const ProductContextProvider = createContext();
const ProductContext = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    db.collection('Products').onSnapshot((snapshot) => {
      let changes = snapshot.docChanges();
      changes.forEach((change) => {
        if (change.type === 'added') {
          setProducts((pre) => [
            ...pre,
            {
              ProductID: change.doc.id,
              ProductName: change.doc.data().ProductName,
              ProductCategory: change.doc.data().ProductCategory,
              ProductPrice: change.doc.data().ProductPrice,
              ProductImg: change.doc.data().ProductImg,
            },
          ]);
        }
      });
    });
  }, []);

  return (
    <ProductContextProvider.Provider value={{ products: products }}>
      {props.children}
    </ProductContextProvider.Provider>
  );
};

export default ProductContext;
