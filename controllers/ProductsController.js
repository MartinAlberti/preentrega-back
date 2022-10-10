const utils = require("../models/utils");

const getAllProducts = (req, res) => {
  const allProducts = utils.getAll();
  res.status(200).json({ status: "OK", data: allProducts });
};

const getById = (req, res) => {
  const { id } = req.params;
  const product = utils.getById(id);

  if (!product) {
    return;
  }

  res.json({ status: "OK", data: product });
};

const createProduct = (req, res) => {
  const { title, description, thumbnail, price, stock } = req.body;

  if (!title || !description || !thumbnail || !price || !stock) {
    res.status(404).json({
      status: "False",
      result: "Wrong body format",
    });
    return;
  }

  const newPorduct = {
    id: utils.getAll().length + 1,
    timestamp: new Date().toUTCString(),
    title,
    description,
    code: Math.floor(Math.random() * 100),
    thumbnail,
    price : +(price),
    stock: +(stock),
  };

  const createNewProduct = utils.createProduct(newPorduct);

  if (!createNewProduct) {
    res.status(404).json({
      status: "False",
      result: `Product with name '${title}' created succesfuly.`,
    });
    return;
  }
  res.status(201).json({ status: "OK", data: createNewProduct });
};

const updateProduct = (req, res) => {
  const { id } = req.params;
  const { body } = req;

  if (!id) {
    return;
  }

  const updateOneProduct = utils.updateProduct(id, body);
  res.json({ statu: "OK", result: updateOneProduct });
};

const deleteProduct = (req, res) => {
  const { id } = req.params;

  const deleteOneProduct = utils.deleteOneProduct(id);
  res.json({ status: "OK", result: deleteOneProduct });
};

module.exports = {
  getAllProducts,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
};
