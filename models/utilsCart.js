const fs = require("fs");
const BD = require("./data.json");

const saveToDatabase = (DB) => {
  fs.writeFileSync("./models/data.json", JSON.stringify(DB, null, 2), {
    encoding: "utf-8",
  });
};

const getAll = () => {
  return BD.carrito;
};

const getById = (id) => {
  const cart = BD.carrito.find((cart) => cart.id === +id);
  if (!cart) {
    return;
  }
  return cart;
};

const createCart = (newCart) => {
  BD.carrito.push(newCart);
  saveToDatabase(BD);
  return newCart;
};

const deleteCart = (id) => {
  const indexCart = BD.carrito.findIndex((cart) => cart.id === +id);
  if (indexCart < 0) {
    return `El número de id: '${id}' NO existe`;
  }
  const newList = BD.carrito.filter((list) => list.id !== +id);
  BD.carrito = newList;
  saveToDatabase(BD);
  return newList;
};

const createProduct = (id, newProduct) => {
  const indexProduc = BD.carrito.findIndex((product) => product.id === +id);
  const cart = BD.carrito.find((product) => product.id === +id);

  //Validamos que el carrito con el ID exista
  if (indexProduc < 0) {
    return `Número de carrito: '${id}' NO existente!`;
  }

  const title = cart.productos.find(
    (product) => product.title === newProduct.title
  );

  
  if (title) {
    return `Product with name : '${newProduct.title}' already exist!`;
  }

  const newProductId = {
    id: cart.productos.length + 1,
    ...newProduct,
  };

  cart.productos.push(newProductId);
  BD.carrito[indexProduc] = cart;
  saveToDatabase(BD);
  return newProductId;
};

const deleteProduct = (id, id_prod) => {
  const indexCart = BD.carrito.findIndex((cart) => cart.id === +id);
  const indexProduct = BD.carrito[indexCart].productos.findIndex(
    (el) => el.id === +id_prod
  );

  if (indexCart < 0) return `Número de Carrito: '${id}' NO existe!`;

  if (indexProduct < 0) return `Número de Producto: '${id_prod}' NO existe! `;

  const newListProduct = BD.carrito[indexCart].productos.filter(
    (product) => product.id !== indexProduct + 1
  );

  BD.carrito[indexCart].productos = newListProduct;
  BD.carrito[indexCart].productos.map((el) => (el.id = 1));
  saveToDatabase(BD);
  return newListProduct;
};

module.exports = {
  getAll,
  getById,
  createCart,
  deleteCart,
  createProduct,
  deleteProduct,
};
