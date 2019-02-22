const express = require('express');
const router = express.Router();
const keys = require('../../config/keys');

const Tanda = require('../../models/Tanda');

router.get('/test', (req, res) => res.json({msg: "tanda works"}));
