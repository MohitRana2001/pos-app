import React, { useEffect } from 'react';
import { saveProductToLocalStorage } from '@/app/lib/localStorage';

const SampleComponent = () => {
  useEffect(() => {
    // Sample product data
    const products = [
      { id: 1, name: 'Organic Coffee Beans', price: 12.99, sku: 'COF001', quantity: 50 },
      { id: 2, name: 'Stainless Steel Water Bottle', price: 24.99, sku: 'BOT002', quantity: 100 },
      { id: 3, name: 'Wireless Earbuds', price: 79.99, sku: 'EAR003', quantity: 30 },
      { id: 4, name: 'Yoga Mat', price: 29.99, sku: 'YOG004', quantity: 75 },
    ];

    // Save each product to local storage
    products.forEach(product => saveProductToLocalStorage(product));
  }, []);

  return (
    <div>
      <h1>Sample Component</h1>
      <p>Products saved to local storage.</p>
    </div>
  );
};

export default SampleComponent;