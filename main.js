class ProductManager {
    constructor() {
    this.products = [];
    this.productContador = 1;
    }

addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.error("Todos los campos son obligatorios.");
        return;
    }

    if (this.products.some(product => product.code === code)) {
        console.error("Ya existe un producto con el mismo código.");
        return;
    }

    const newProduct = {
        id: this.productContador++,
        title,
        description,
        price,
        thumbnail,
        code,
        stock
    };

    this.products.push(newProduct);
    console.log(`Producto agregado: ${newProduct.title}`);
    }

    getProducts() {
    return this.products;
    }

    getProductById(id) {
    const foundProduct = this.products.find(product => product.id === id);

    if (foundProduct) {
        return foundProduct;
    } else {
        console.error("Not Found");
        return null;
    }
    }
}