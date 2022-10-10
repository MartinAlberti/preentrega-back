const fs = require("fs");
const BD = require("./data.json");

const saveToDatabase = (DB) => {
  fs.writeFileSync("./models/data.json", JSON.stringify(DB, null, 2), {
    encoding: "utf-8",
  });
};

/* Funciones de url: /api/productos */
const getAll = () => {
  return BD.productos;
};

const getById = (id) => {
  const product = BD.productos.find((product) => product.id === +id);

  if (!product) {
    return `Producto con el id: '${id}' NO encontrado!`;
  }

  return product;
};

const createProduct = (newProduct) => {
  const findIndex =
    BD.productos.findIndex((product) => product.title === newProduct.title) >
    -1;

  if (findIndex) {
    return;
  }

  BD.productos.push(newProduct);
  saveToDatabase(BD);
  return newProduct;
};

const updateProduct = (id, changes) => {
  const index = BD.productos.findIndex((product) => product.id === +id);

  if (index == -1) {
    return `Producto con el id '${id}' NO encontrado`;
  }

  const newProduct = {
    ...BD.productos[index],
    ...changes,
    timestamp: new Date().toUTCString(),
  };

  BD.productos[index] = newProduct;
  saveToDatabase(BD);
  return newProduct;
};

const deleteOneProduct = (id) => {
  const indexDelete = BD.productos.findIndex((product) => product.id === +id);

  if (indexDelete < 0) return;

  const newList = BD.productos.filter((product) => product.id !== +id);
  BD.productos = newList;
  saveToDatabase(BD);
  return newList;
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteOneProduct,
};
