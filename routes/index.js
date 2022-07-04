const express = require("express");
const router = express.Router();
const { intents } = require('../utils/intents');
const { entities }  = require('../utils/entities');
const { backup } = require('../utils/backup');

router.route("/changeIntents").post(intents);
router.route("/changeEntities").post(entities);
router.route("/backupAgents").post(backup);
module.exports = router