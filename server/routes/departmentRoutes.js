const express = require('express');
const router = express.Router();
const deptController = require('../controllers/departmentController');

router.get('/',deptController.showDeptList);
router.get('/add',deptController.showAddDeptForm);
router.get('/details/:deptId',deptController.showDeptDetails);
router.get('/edit/:deptId', deptController.showEditDept);
router.post('/add', deptController.addDept);
router.post('/edit', deptController.updateDept);
router.get('/delete/:deptId', deptController.deleteDept);

module.exports = router;