export const getProductFromLocalStorage = (sku :string) => {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    return products.find((product: any) => product.sku === sku);
}

export const saveProductToLocalStorage = (product: any) => {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const existingProductIndex = products.findIndex((p: any) => p.sku === product.sku);
    
    if(existingProductIndex !== -1){
        products[existingProductIndex] = product;
    } else{
        products.push(product);
    }

    localStorage.setItem('products', JSON.stringify(products));
};

export const deleteProductFromLocalStorage = (sku: string) => {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const updatedProducts = products.filter((product: any) => product.sku !== sku);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
};