import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/app/ui/dialog"
import { Button } from "@/app/ui/button"
import { Input } from "@/app/ui/input"
import { Label } from "@/app/ui/label"
import { QRCodeSVG } from 'qrcode.react'

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  addToInventory: (product: { id: number; name: string; price: string; sku: string; quantity: number }) => void;
}

export default function QRCodeModal({ isOpen, onClose, addToInventory }: QRCodeModalProps) {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    sku: '',
    quantity: 0
  })
  const [qrCode, setQRCode] = useState('')

  const API_ENDPOINT = "http://localhost:3000/admin";

  const handleAddToInventory = () => {
    // Check if all fields are filled
    if (productData.name && productData.price && productData.sku ) {
      addToInventory({
        id: Date.now(),  // Generate a unique id
        ...productData
      })
      alert("Product added to inventory successfully!")
      onClose()  // Close the modal after adding
    } else {
      alert("Please fill in all product details before adding to the inventory.")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProductData(prev => ({ ...prev, [name]: value }))
  }

  const generateQRCode = () => {
    const qrData = JSON.stringify({
        product: productData,
        // apiEndpoint: `${API_ENDPOINT}/${productData.sku}`
      });
    setQRCode(qrData)
    localStorage.setItem(`qrCode_${productData.sku}`, qrData)
  }

  const getSavedQRCode = () => {
    const savedQRCode = localStorage.getItem(`qrCode_${productData.sku}`);
    if (savedQRCode) {
      setQRCode(savedQRCode);
    } else {
      alert('No QR code found for this SKU.');
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generate QR Code for Product</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              value={productData.name}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={productData.price}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="sku" className="text-right">
              SKU
            </Label>
            <Input
              id="sku"
              name="sku"
              value={productData.sku}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <Input
              id="quantity"
              name="quantity"
              value={productData.quantity}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={generateQRCode}>Generate QR Code</Button>
          <Button variant="secondary" onClick={handleAddToInventory}>Add to Inventory</Button>
          {/* <Button type="button" onClick={getSavedQRCode}>Load Saved QR Code</Button> */}
        </DialogFooter>
        {qrCode && (
          <div className="mt-4 flex justify-center">
            <QRCodeSVG value={qrCode} size={200} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}