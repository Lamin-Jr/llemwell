"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategory = exports.getCategories = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const getCategories = async (req, res) => {
    try {
        const categories = await prisma_1.default.category.findMany();
        res.status(200).json({ categories });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
};
exports.getCategories = getCategories;
const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) {
            res.status(400).json({ error: 'Category name is required' });
            return;
        }
        const category = await prisma_1.default.category.create({
            data: { name, description }
        });
        res.status(201).json({ category });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create category' });
    }
};
exports.createCategory = createCategory;
//# sourceMappingURL=categoryController.js.map