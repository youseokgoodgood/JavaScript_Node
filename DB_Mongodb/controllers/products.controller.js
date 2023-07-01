const productModel = require("../models/products.model");

async function createProduct(req, res, next) {
  try {
    const createProduct = await productModel.create(req.body);
    res.status(201).json(createProduct);
  } catch (error) {
    next(error);
  }
}

async function getProducts(req, res, next) {
  try {
    const allProducts = await productModel.find({});
    res.status(200).json(allProducts);
  } catch (error) {
    next(error);
  }
}

async function getProductById(req, res, next) {
  try {
    const Product = await productModel.findById(req.params.productId);
    if (Product) {
      res.status(200).json(Product);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
}

async function updateProduct(req, res, next) {
  try {
    let updateProduct = await productModel.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true }
    );

    if (updateProduct) {
      res.status(200).json(updateProduct);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
}

async function deleteProduct(req, res, next) {
  try {
    let deleteProduct = await productModel.findOneAndDelete(
      req.params.productId
    );
    if (deleteProduct) {
      res.status(200).json(deleteProduct);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
