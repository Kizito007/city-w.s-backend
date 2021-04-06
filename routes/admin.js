var router = require("express").Router(),
  auth = require("../middleware/auth"),
  adminAuth = require("../middleware/adminAuth"),
  User = require("../models/users");

// Add Admin account
router.put("/upgrade/:id", auth, async (req, res) => {
    try {

        //Get user id
        let { id } = req.params

        let right = "admin"

        let userUpgrade = {
            role: right,
        }
        //update the user to admin
        const updatedAccount = await User.findByIdAndUpdate(
            id,
            userUpgrade,
        );
        res.status(201).send(updatedAccount)
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
});

//GET an admin DETAIL
// router.get("/find/:id", auth, async (req, res) => {
//     User.findById({ _id: req.params.id }, function (err, foundAdmin) {
//         if (err) {
//             return res.status(404).send({ message: "Admin not found" });
//         } else {
//             res.status(200).send({ i_case: foundAdmin });
//         }
//     });
// });

//GET all admins
router.get("/all", auth, adminAuth, async (req, res) => {
    User.find({ role: "admin" }, function (err, allAdmins) {
        if (err) {
            return res.status(404).send({ message: "No admin available" });
        } else {
            res.status(200).send({ admins: allAdmins });
        }
    });
});

//Revert Admin to user
router.put("/revert/:id", auth, adminAuth, async (req, res) => {
    try {
      //Get user id
      let { id } = req.params

      let right = "user"

      let userRevert = {
        role: right,
      }
      //update the user to admin
      const updatedAccount = await User.findByIdAndUpdate(
          id,
          userRevert,
      );
      res.status(201).send(updatedAccount)
    } catch (err) {
      res.status(400).send({ msg: `${err}` });
    }
});
 
module.exports = router;  