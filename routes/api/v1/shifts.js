var express = require('express');
var router = express.Router();
var { fetchAll, fetchOneById, create, update, deleteOne } = require("./../../../controllers/v1/Shifts/shifts.controller")
const authMiddleware = require('../../../middleware/auth.middleware');

/* FETCH ALL SHIFTS */
router.get('/shifts', authMiddleware, fetchAll);

/* FETCH ONE SHIFT */
router.get('/shifts/:id', authMiddleware, fetchOneById);

/* CREATE SHIFT */
router.post('/shifts/create', authMiddleware, create);

/* UPDATE SHIFT */
router.put('/shifts/:id', authMiddleware, update);

/* DELETE SHIFT */
router.delete('/shifts/:id', authMiddleware, deleteOne);

module.exports = router;
