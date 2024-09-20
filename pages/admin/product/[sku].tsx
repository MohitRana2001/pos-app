import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/app/ui/dialog"
import { Button } from "@/app/ui/button";
// import axios from 'axios';
import { getProductFromLocalStorage, saveProductToLocalStorage, deleteProductFromLocalStorage } from '@/app/lib/localStorage';

const ProductPage = () => {
    const router = useRouter();
    const { sku } = router.query;
    const [productData, setProductData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(true);
    // console.log("page rendered")
    useEffect(() => {
        if(sku === "COF001" || sku === "BOT002" || sku === "EAR003" || sku === "YOG004") {
            const product = getProductFromLocalStorage(sku as string);
            if(product){
                setProductData(product);
            }else {
                console.error('Product not found');
            }
        }
    }, [sku]);
    
    console.log(productData);
    const handleAddProduct = () => {
        saveProductToLocalStorage(sku as string);
        setIsModalOpen(false);
    }

    const handleDeleteProduct = () => {
        deleteProductFromLocalStorage(sku as string);
        setIsModalOpen(false);
    }

    const handleClose = () => {
        setIsModalOpen(false);
        router.push('/admin');
    };

    if(!productData) {
        return <p>Loading...</p>
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>
                        Product Information
                    </DialogTitle>
                </DialogHeader>
                <div className='py-4'>
                    <p><strong>Name:</strong>{productData.name}</p>
                    <p><strong>Price:</strong>${productData.price}</p>
                    <p><strong>SKU:</strong>{productData.sku}</p>
                </div>
                <DialogFooter>
                    <Button variant="secondary" onClick={handleAddProduct}>Add Product</Button>
                    <Button variant="destructive" onClick={handleDeleteProduct}>Delete Product</Button>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ProductPage;