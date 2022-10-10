const route = require("express").Router();
const {
  getAllCart,
  getById,
  createCart,
  deleteOneCart,
  createOneProduct,
  deleteProduct,
} = require("../controllers/CartController");

/* Endpoints Cart  */
route.post("/", createCart);
route.delete("/:id", deleteOneCart);
route.get("/", getAllCart);
route.get("/:id/productos", getById);
route.post("/:id/productos", createOneProduct);
route.delete("/:id/productos/:id_prod", deleteProduct);

module.exports = route;
