"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.post('/sync', authMiddleware_1.requireAuth, userController_1.syncUser);
router.get('/me', authMiddleware_1.requireAuth, userController_1.getMyProfile);
router.put('/me', authMiddleware_1.requireAuth, userController_1.updateMyProfile);
router.post('/me/addresses', authMiddleware_1.requireAuth, userController_1.addAddress);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map