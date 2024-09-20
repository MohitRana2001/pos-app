"use client"

import AdminDashboardComponent from "@/app/admin/page";
import { useEffect } from 'react';

export default function Page() {
  console.log("Page component rendered");

  const populateLocalStorage = () => {
    console.log("populateLocalStorage called");

    // Sample product data
    const products = [
      { id: 1, name: 'Organic Coffee Beans', price: 12.99, sku: 'COF001', quantity: 50 },
      { id: 2, name: 'Stainless Steel Water Bottle', price: 24.99, sku: 'BOT002', quantity: 100 },
      { id: 3, name: 'Wireless Earbuds', price: 79.99, sku: 'EAR003', quantity: 30 },
      { id: 4, name: 'Yoga Mat', price: 29.99, sku: 'YOG004', quantity: 75 },
    ];

    // Save products to local storage
    localStorage.setItem('products', JSON.stringify(products));

    console.log("Products have been added to localStorage");
  };

  useEffect(() => {
    console.log("useEffect called");
    populateLocalStorage();
  }, []);

  return (
    <div>
      <AdminDashboardComponent />
      <h1>Admin Page</h1>
    </div>
  );
}