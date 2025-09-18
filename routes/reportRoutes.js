const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const reportCtrl = require('../controllers/reportController');

router.get('/users-with-roles', auth(true), reportCtrl.usersWithRoles);
router.get('/users-with-profiles', auth(true), reportCtrl.usersWithProfiles);
router.get('/roles-right-join', auth(true), reportCtrl.rolesRightJoin);
router.get('/profiles-full-outer', auth(true), reportCtrl.profilesFullOuter);
router.get('/user-role-combos', auth(true), reportCtrl.userRoleCombos);
router.get('/referrals', auth(true), reportCtrl.referrals);
router.get('/latest-login', auth(true), reportCtrl.latestLogin);

module.exports = router;
