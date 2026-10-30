"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderController_1 = require("../controllers/orderController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// User routes
router.post('/', authMiddleware_1.requireAuth, orderController_1.createOrder);
router.get('/me', authMiddleware_1.requireAuth, orderController_1.getMyOrders);
// Admin routes
router.get('/all', authMiddleware_1.requireAuth, authMiddleware_1.requireAdmin, orderController_1.getAllOrders);
exports.default = router;
//# sourceMappingURL=orderRoutes.js.map