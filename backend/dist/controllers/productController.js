"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.createProduct = exports.getProductById = exports.getProducts = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const getProducts = async (req, res) => {
    try {
        const { categoryId, search } = req.query;
        // Build query dynamically
        const where = { isActive: true };
        if (categoryId)
            where.categoryId = categoryId;
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } }
            ];
        }
        const products = await prisma_1.default.product.findMany({
            where,
            include: { category: true },
            orderBy: { createdAt: 'desc' }
        });
        res.status(200).json({ products });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};
exports.getProducts = getProducts;
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await prisma_1.default.product.findUnique({
            where: { id: id },
            include: { category: true }
        });
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        res.status(200).json({ product });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
};
exports.getProductById = getProductById;
const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, categoryId, imageUrl } = req.body;
        if (!name || price === undefined) {
            res.status(400).json({ error: 'Name and price are required' });
            return;
        }
        const product = await prisma_1.default.product.create({
            data: {
                name,
                description,
                price: parseFloat(price),
                stock: parseInt(stock) || 0,
                categoryId,
                imageUrl
            }
        });
        res.status(201).json({ product });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create product' });
    }
};
exports.createProduct = createProduct;
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, stock, categoryId, imageUrl, isActive } = req.body;
        const updateData = {};
        if (name !== undefined)
            updateData.name = name;
        if (description !== undefined)
            updateData.description = description;
        if (price !== undefined)
            updateData.price = parseFloat(price);
        if (stock !== undefined)
            updateData.stock = parseInt(stock);
        if (categoryId !== undefined)
            updateData.categoryId = categoryId;
        if (imageUrl !== undefined)
            updateData.imageUrl = imageUrl;
        if (isActive !== undefined)
            updateData.isActive = isActive;
        const product = await prisma_1.default.product.update({
            where: { id: id },
            data: updateData
        });
        res.status(200).json({ product });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update product' });
    }
};
exports.updateProduct = updateProduct;
//# sourceMappingURL=productController.js.map