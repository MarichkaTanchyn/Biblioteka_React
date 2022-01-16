const express = require('express');
const router = express.Router();
const empApiController = require('../../api/EmploymentAPI');
router.get('/', empApiController.getEmployments);
router.get('/:emplId', empApiController.getEmploymentById);
router.post('/', empApiController.createEmployment);
router.put('/:emplId', empApiController.updateEmployment);
router.delete('/:emplId', empApiController.deleteEmployment);
module.exports = router;
