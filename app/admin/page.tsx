"use client";

import { useState, useEffect } from "react";
import { Button } from "@/app/ui/button";
import { Input } from "@/app/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/ui/card";
import { Badge } from "@/app/ui/badge";
import { Search, Plus, BarChart2, Package, DollarSign } from "lucide-react";
import QRCodeModal from "./components/qr-code-modal";
import ProductInfoModal from "./components/product-info-modal";

export default function AdminDashboardComponent() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Organic Coffee Beans",
      price: 12.99,
      sku: "COF001",
      quantity: 50,
    },
    {
      id: 2,
      name: "Stainless Steel Water Bottle",
      price: 24.99,
      sku: "BOT002",
      quantity: 100,
    },
    {
      id: 3,
      name: "Wireless Earbuds",
      price: 79.99,
      sku: "EAR003",
      quantity: 30,
    },
    { id: 4, name: "Yoga Mat", price: 29.99, sku: "YOG004", quantity: 75 },
  ]);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isProductInfoModalOpen, setIsProductInfoModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  interface Product {
    id: number;
    name: string;
    price: number;
    sku: string;
    quantity: number;
  }

  interface QRCodeModalProps {
    isOpen: boolean;
    onClose: () => void;
    addToInventory: (newProduct: Product) => void;
    productData: Product | null;
  }

  interface ProductInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    addToInventory: (newProduct: Product) => void;
    productData: Product | null;
    onDelete: () => void;
  }

  const handleDelete = (id: number): void => {
    setProducts(products.filter((product) => product.id !== id));
    setIsProductInfoModalOpen(false);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleSave = (id, updatedProduct) => {
    setProducts(
      products.map((product) => (product.id === id ? updatedProduct : product))
    );
    setEditingProduct(null);
  };

  const handleScan = (product) => {
    setSelectedProduct(product);
    setIsProductInfoModalOpen(true);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalProducts = products.length;
  const totalValue = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );
  const lowStockProducts = products.filter(
    (product) => product.quantity < 20
  ).length;

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     fetch('/api/scanned-product')
  //       .then(res => res.json())
  //       .then(data => {
  //         if (data.product) {
  //           setSelectedProduct(data.product)  // Show modal when product is scanned
  //           setIsProductInfoModalOpen(true)
  //         }
  //       })
  //   }, 5000)
  //   return () => clearInterval(intervalId)
  // }, []);

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Inventory Management Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Inventory Value
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Low Stock Items
            </CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockProducts}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 w-[300px]"
          />
        </div>
        <Button onClick={() => setIsQRModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add New Product
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  {editingProduct?.id === product.id ? (
                    <Input
                      value={editingProduct.name}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          name: e.target.value,
                        })
                      }
                    />
                  ) : (
                    product.name
                  )}
                </TableCell>
                <TableCell>
                  {editingProduct?.id === product.id ? (
                    <Input
                      type="number"
                      value={editingProduct.price}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          price: parseFloat(e.target.value),
                        })
                      }
                    />
                  ) : (
                    `${Number(product.price).toFixed(2)}`
                  )}
                </TableCell>
                <TableCell>
                  {editingProduct?.id === product.id ? (
                    <Input
                      value={editingProduct.sku}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          sku: e.target.value,
                        })
                      }
                    />
                  ) : (
                    product.sku
                  )}
                </TableCell>
                <TableCell>
                  {editingProduct?.id === product.id ? (
                    <Input
                      type="number"
                      value={editingProduct.quantity}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          quantity: parseInt(e.target.value),
                        })
                      }
                    />
                  ) : (
                    <>
                      {product.quantity}
                      {product.quantity < 20 && (
                        <Badge variant="destructive" className="ml-2">
                          Low Stock
                        </Badge>
                      )}
                    </>
                  )}
                </TableCell>
                <TableCell>
                  {editingProduct?.id === product.id ? (
                    <Button
                      onClick={() => handleSave(product.id, editingProduct)}
                    >
                      Save
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => handleEdit(product)}
                        className="mr-2"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(product.id)}
                        className="mr-2"
                      >
                        Delete
                      </Button>
                      <Button variant="secondary" onClick={() => handleScan(product)}>Scan QR</Button>
                      {/* <Button
                        variant="secondary"
                        onClick={() => setIsQRModalOpen(true)}
                      >
                        Show QR
                      </Button> */}
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <QRCodeModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        addToInventory={(newProduct) =>
          setProducts((prevProducts) => [...prevProducts, newProduct])
        }
        productData={selectedProduct}
      />

      {selectedProduct && (
        <ProductInfoModal
          isOpen={isProductInfoModalOpen}
          onClose={() => setIsProductInfoModalOpen(false)}
          addToInventory={(newProduct) =>
            setProducts((prevProducts) => [...prevProducts, newProduct])
          }
          productData={selectedProduct}
          onDelete={() => handleDelete(selectedProduct.id)}
        />
      )}
    </div>
  );
}
