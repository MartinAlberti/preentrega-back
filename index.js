const express = require("express");
const apiProducts = require("./routers/products");
const apiCart = require("./routers/cart");
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


app.use("/api/productos", apiProducts);
app.use("/api/carrito", apiCart);

const connectedServer = app.listen(PORT, () => {
  console.log(`🚀Server is connected and listing in the PORT: ${PORT}`);
});

connectedServer.on("error", (error) => {
  console.log(`error:`, error.message);
});
