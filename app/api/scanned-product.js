export default function handler(req, res) {
    const scannedProduct = {
      name: 'Sample Product',
      price: 29.99,
      sku: 'SAMP001'
    }
  
    res.status(200).json({ product: scannedProduct })
  }
  