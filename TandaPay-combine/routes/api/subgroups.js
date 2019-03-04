const express = require('express');
const router = express.Router();
const keys = require('../../config/keys');

const subgroups = require('../../models/SubGroups');

router.get('/test', (req, res) => res.json({msg: "tanda works"}));
