const express = require("express");
const router = express.Router();
const auth = require("../middlesware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const Account = require("../models/Account");

//@route    GET api/accounts
//@desc     Get all users accounts
//@access   Private
router.get("/", auth, async (req, res) => {
  try {
    const accounts = await Account.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(accounts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//@route    POST api/accounts
//@desc     Add new account
//@access   Private
router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const { name, username, password, type } = req.body;
    try {
      const newAccount = new Account({
        name,
        username,
        password,
        type,
        user: req.user.id
      });
      const account = await newAccount.save();
      res.json(account);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route    PUT api/accounts/:id
//@desc     Update account
//@access   Private
router.put("/:id", auth, async (req, res) => {
  const { name, username, password, type } = req.body;

  // Build account object
  const accountFields = {};
  if (name) accountFields.name = name;
  if (username) accountFields.username = username;
  if (password) accountFields.password = password;
  if (type) accountFields.type = type;

  try {
    let account = await Account.findById(req.params.id);

    if (!account) return res.status(404).json({ msg: "Account not found" });

    // Make sure user owns account
    if (account.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    account = await Account.findByIdAndUpdate(
      req.params.id,
      { $set: accountFields },
      { new: true }
    );

    res.json(account);
  } catch (err) {
    console.error(er.message);
    res.status(500).send("Server Error");
  }
});

// @route     DELETE api/accounts/:id
// @desc      Delete account
// @access    Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let account = await Account.findById(req.params.id);

    if (!account) return res.status(404).json({ msg: "Account not found" });

    // Make sure user owns account
    if (account.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Account.findByIdAndRemove(req.params.id);

    res.json({ msg: "Account removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
