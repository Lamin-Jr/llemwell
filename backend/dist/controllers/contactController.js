"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitContact = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const submitContact = async (req, res) => {
    try {
        const { name, email, phone, inquiry } = req.body;
        if (!name || !email || !inquiry) {
            res.status(400).json({ error: 'Name, Email, and Inquiry are required.' });
            return;
        }
        const message = await prisma_1.default.contactMessage.create({
            data: {
                name,
                email,
                phone,
                inquiry,
            },
        });
        res.status(201).json({ success: true, messageId: message.id });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to submit contact message' });
    }
};
exports.submitContact = submitContact;
//# sourceMappingURL=contactController.js.map