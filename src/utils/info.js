export const createProductErrorInfo = (product) => {
  return `
  One or more properties are incomplete or invalid.
  List of required properties:
        * title: ${product.}
        *description: ${product.}
        *category: ${product.}
        *status: ${product.}
        *price: ${product.}
        *thumbnail:${product.}
        *code: ${product.}
        *stock: ${product.}
    `;
};
