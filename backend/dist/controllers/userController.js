"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncUser = exports.addAddress = exports.updateMyProfile = exports.getMyProfile = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const getMyProfile = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        const user = await prisma_1.default.user.findUnique({
            where: { id: userId },
            include: { addresses: true }
        });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.status(200).json({ user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getMyProfile = getMyProfile;
const updateMyProfile = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        const { firstName, lastName, phone } = req.body;
        const user = await prisma_1.default.user.update({
            where: { id: userId },
            data: { firstName, lastName, phone }
        });
        res.status(200).json({ user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update profile' });
    }
};
exports.updateMyProfile = updateMyProfile;
const addAddress = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        const { type, street, city, state, postalCode, country, isDefault } = req.body;
        // If this is set to default, optionally unset other defaults in a transaction
        if (isDefault) {
            await prisma_1.default.address.updateMany({
                where: { userId, type },
                data: { isDefault: false }
            });
        }
        const address = await prisma_1.default.address.create({
            data: {
                userId, type, street, city, state, postalCode, country, isDefault: isDefault || false
            }
        });
        res.status(201).json({ address });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add address' });
    }
};
exports.addAddress = addAddress;
const syncUser = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        // Since the authMiddleware verifies the JWT, we know the user is authentic.
        // We just upsert them into the database using the email from the token.
        const email = req.user?.email || req.body.email;
        if (!email) {
            res.status(400).json({ error: 'Email is required for syncing' });
            return;
        }
        const user = await prisma_1.default.user.upsert({
            where: { id: userId },
            update: {}, // Do nothing if they already exist, or we could update last login
            create: {
                id: userId,
                email: email
            }
        });
        res.status(200).json({ user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to sync user' });
    }
};
exports.syncUser = syncUser;
//# sourceMappingURL=userController.js.map