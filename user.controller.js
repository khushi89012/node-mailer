const EventEmitter = require("events");

const express = require("express");

const User = require("../models/user.model");

const { welcomeMail, confirmationMail } = require("../utils");

const router = express.Router();

const eventEmitter = new EventEmitter();

router.post("", async (req, res) => {
  try {
    const user = await User.create(req.body);

    eventEmitter.on("User Registered", confirmationMail);

    eventEmitter.emit("User Registered", {
      from: "admin@abcSystem.com",
      to: user.email,
      user,
      
    });
    eventEmitter.on("Admin Info", welcomeMail);

    const Admins = ["Aadmin@abcSystem.com","Badmin@abcSystem.com","Cadmin@abcSystem.com","Dadmin@abcSystem.com","Eadmin@abcSystem.com"];

    for(let i=0; i<=Admins.length; i++){

    eventEmitter.emit("Admin Info", {
      from: "admin@abcSystem.com",
      to: Admins[i],
      user,
      
    });
}

    return res.send(`Mail sent to ${user.first_name}`);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get("", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const size = req.query.size || 15;

    const users = await User.find() 
      .skip((page - 1) * size) 
      .limit(size)
      .lean()
      .exec();

    const totalPages = Math.ceil(
      (await User.find().countDocuments()) / size
    );

    return res.send({ users, totalPages });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});


module.exports = router;
