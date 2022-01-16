const express = require('express');
const router = express.Router();
const deptApiController = require('../../api/DepartmentAPI');
router.get('/', deptApiController.getDepartments);
router.get('/:deptId', deptApiController.getDepartmentsById);
router.post('/', deptApiController.createDepartment);
router.put('/:deptId', deptApiController.updateDepartment);
router.delete('/:deptId', deptApiController.deleteDepartment);
module.exports = router;
