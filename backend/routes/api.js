const express = require('express')
const UserActions = require('../../backend/actions/api/UserActions.js')
const router = express.Router();



// select all users
router.get('/users', UserActions.selectUsers)
// add user
router.post('/users', UserActions.createUser)
// edit user
router.put('/users/:id', UserActions.updateUser)
// delete user
router.delete('/users/:id', UserActions.deleteUser)


module.exports = router;