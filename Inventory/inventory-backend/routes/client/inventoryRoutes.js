import express from 'express';
import {
  getInventoryItems,
  getInventoryItemById,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem
} from '../../controllers/client/inventoryController.js';

import { authenticateBusinessOwner,validateBusinessAccess } from '../../middlewares/client/authBusinessOwner.js';
import { authenticateEmployee } from '../../middlewares/client/authEmployee.js';

const router = express.Router();

// Combined auth middleware: allows either BO or Employee
const authEither = (req, res, next) => {
  if (req.headers?.bo_token) {
    return authenticateBusinessOwner(req, res, next);
  } else {
    return authenticateEmployee(req, res, next);
  }
};

// All routes scoped under /api/businesses/:business_id/inventory
router.get(
  '/:business_id/inventory',
  authenticateBusinessOwner,
  validateBusinessAccess,
  getInventoryItems
);

router.get(
  '/:business_id/inventory/:item_id',
  authenticateBusinessOwner,
  validateBusinessAccess,
  getInventoryItemById
);

router.post(
  '/:business_id/inventory',
  authenticateBusinessOwner,
  validateBusinessAccess,
  createInventoryItem
);

router.put(
  '/:business_id/inventory/:item_id',
  authenticateBusinessOwner,
  validateBusinessAccess,
  updateInventoryItem
);

router.delete(
  '/:business_id/inventory/:item_id',
  authenticateBusinessOwner,
  validateBusinessAccess,
  deleteInventoryItem
);

export default router;
