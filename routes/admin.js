var router = require("express").Router(),
  auth = require("../middleware/auth"),
  adminAuth = require("../middleware/adminAuth"),
  Admin = require("../models/admins"),
  User = require("../models/users");

// New Admin account
router.post("/new", auth, async (req, res) => {
    try {
        //collect and verify admin data
        let {
            email,
            password,
            fullname,
            verifyAdmin,
        } = req.body;

        //Get user id
        let user = req.user;

        // check whether user is an admin
        let admi = await Admin.find({ userId: user })
        if (admi)
            return res
                .status(401)
                .json({msg: "Already an Admin"})

        //Verify Admin Secret
        if (verifyAdmin !== process.env.Admin)
            return res
                .status(400)
                .send({ msg: "Incorrect secret" });

        //add userId field to admin
        const newAdmin = new Admin({
            email,
            password,
            fullname,
            userId: user,
        });

        let savedAdmin = await newAdmin.save();
        //get saved admin id
        let id = savedAdmin._id

        let userUpgrade = {
            adminId: id,
        }
        //update adminId field of the user
        const updatedAccount = await User.findByIdAndUpdate(
            user,
            userUpgrade,
        );

        res.status(201).send(savedAdmin)
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
});

//GET an admin DETAIL
router.get("/find/:id", auth, async (req, res) => {
    Admin.findById({ _id: req.params.id }, function (err, foundAdmin) {
        if (err) {
            return res.status(404).send({ message: "Admin not found" });
        } else {
            res.status(200).send({ i_case: foundAdmin });
        }
    });
});

//GET all admins
router.get("/all", auth, adminAuth, async (req, res) => {
    Admin.find({}, function (err, allAdmins) {
        if (err) {
            return res.status(404).send({ message: "No admin available" });
        } else {
            res.status(200).send({ admins: allAdmins });
        }
    });
});

//UPDATE AN Admin
router.put("/update/:id", auth, adminAuth, async (req, res) => {
    try {
      const admin = await Admin.findOne({
        _id: req.params.id,
      });
      if (!admin)
        return res.status(404).send({
            msg: "Something is wrong with this admin",
        });
      const updatedAdmin = await Admin.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      res.status(201).send(updatedAdmin);
    } catch (err) {
      res.status(400).send({ msg: `${err}` });
    }
});

//DELETE AN Admin
router.delete('/delete/:id', auth, adminAuth, async (req, res) => {
    try {
        let admin = req.params.id;
        const deletedAdmin = await Admin.findByIdAndDelete(admin)
        res.status(200).send(deletedAdmin)

    } catch (err) {
        res.status(500).json({error: err.message})
    }
});

module.exports = router;  