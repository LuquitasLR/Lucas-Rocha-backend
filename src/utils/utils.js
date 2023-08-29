import { faker } from "@faker-js/faker";

export const generateID =()=>{
  const a =Date.now().toString(30)
  const b =Math.random().toString(30).substring(2)
  return a+b
};
export const generateCode =()=>{
  const a =Math.random().toString(30).substring(2)
  return a
};
export const generateProduct = () => {
  let body = {
    title: faker.commerce.productName(),
    description:faker.commerce.productDescription(),
    code: generateCode(),
    price: faker.commerce.price(),
    status: true,
    thumbnail: faker.image.urlPicsumPhotos(),
    stock: faker.number.int(40),
    category: faker.commerce.department()
  }
  return body;
};
