const express = require('express');

const getallusers = (req, res) => {
    res.status(500).json({
      status:'Error',
      message:'This route tbd'
    })
  };

  const getUser = (req, res) => {
    res.status(500).json({
      status:'Error',
      message:'This route tbd'
    })
  };

  const createUser = (req, res) => {
    res.status(500).json({
      status:'Error',
      message:'This route tbd'
    })
  };

  const updateUser = (req, res) => {
    res.status(500).json({
      status:'Error',
      message:'This route tbd'
    })
  };

  const deleteUser = (req, res) => {
    res.status(500).json({
      status:'Error',
      message:'This route tbd'
    })
  };


const router = express.Router();

router
.route('/')
.get(getallusers)
.post(createUser);

router
.route('/:id')
.get(getUser)
.patch(updateUser)
.delete(deleteUser);

module.exports = router;