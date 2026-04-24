const express = require(`express`)
const router = express.Router()
const auth = require(`../controllers/userControllers`)

router.post(`/register`, auth.userRegister)
router.post(`/login`, auth.userlogin)

module.exports = router;