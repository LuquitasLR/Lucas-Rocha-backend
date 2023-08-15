export const createProductErrorInfo = (product) => {
  return `
  One or more properties are incomplete or invalid.
  List of required properties:
        * title: Must be a string! ${product.title}
        * description: Must be a string! ${product.description}
        * category: Must be a string! ${product.category}
        * status: Must be a string! ${product.status}
        * price: Must be a number! ${product.price}
        * thumbnail:Must be a string! ${product.thumbnail}
        * code: Must be a string! ${product.code}
        * stock: Must be a number! ${product.stock}
    `;
};
