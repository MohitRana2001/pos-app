import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/app/ui/dialog"
import { Button } from "@/app/ui/button"
import { QRCodeSVG } from 'qrcode.react'

export default function ProductInfoModal({ isOpen, onClose, productData, onDelete }) {

  const API_ENDPOINT = "http://localhost:3000/admin/product";

  // Generate QR code data URL
  const qrData = `${API_ENDPOINT}/${productData.sku}`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Product Information</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p><strong>Name:</strong> {productData.name}</p>
          <p><strong>Price:</strong> ${productData.price}</p>
          <p><strong>SKU:</strong> {productData.sku}</p>
        </div>
        <div className="mt-4 flex justify-center">
          {/* Render QR Code */}
          <QRCodeSVG value={qrData} size={200} />
        </div>
        <DialogFooter>
          <Button variant="destructive" onClick={onDelete}>Delete Product</Button>
          <Button variant="secondary" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}