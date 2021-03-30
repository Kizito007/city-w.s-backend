const Admin = require("../models/admins");

const adminAuth = async (req, res, next) => {
    try {
        let user = req.user;
        let admi = await Admin.find({ userId: user })

        if (!admi)
            return res
                .status(401)
                .json({msg: "Not an admin"})

        next ();
    } catch (err) {
        res.status(500).send({ err: err.message })
    }
}

module.exports = adminAuth ;