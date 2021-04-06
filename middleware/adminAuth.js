const User = require("../models/users");

const adminAuth = async (req, res, next) => {
    try {
        let user = req.user;
        let person = await User.findById({ _id: user })

        let right = person.role
        if (right !== "boss" && right !== "admin")
            return res
                .status(401)
                .json({msg: "Not an admin"})

        next ();
    } catch (err) {
        res.status(500).send({ err: err.message })
    }
}

module.exports = adminAuth ;