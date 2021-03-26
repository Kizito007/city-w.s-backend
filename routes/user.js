const router = require("express").Router(),
    User = require("../models/users"),
    auth = require("../middleware/auth"),
    jwt = require("jsonwebtoken"),
    bcrypt = require("bcryptjs");

//REGISTER USER
router.post('/register', async (req, res) => {
    try {

        let { firstName, lastName, email, password, passwordCheck, phoneNumber, address, LGA, state } = req.body;

        //validate
        if (!email || !password || !passwordCheck)
            return res.status(400).send({msg: "Not all fields have been entered."});

        if (password.length < 5) 
            return res
                .status(400)
                .json({msg: "Password needs to be at least 5 characters long."})

        if (password !== passwordCheck)
            return res
                .status(400)
                .json({msg: "Enter the same password twice for verification. "})

        const existingUser = await User.findOne({email: email})
        if (existingUser)
            return res
                .status(400)
                .json({msg: "An account with this email already exist"})

        // if (!displayName) displayName = email;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt)
        
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            phoneNumber,
            address,
            LGA,
            state,
        });

        const savedUser = await newUser.save();

        res.status(201).send(savedUser)

    } catch (err) {
        console.log(err)
        res.status(500).json({err: err.message})
    }
});

//LOGIN USER
router.post('/login', async (req, res) => {
    try{

        const { email, password } = req.body;

        //validate 
        if (!email || !password)
            return res.status(400).json({msg: "Not all fields have been entered! "})

        const user = await User.findOne({email: email})
        if (!user) 
            return res
                .status(400)
                .json({msg: "No account with this email has been registered."})

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) 
            return res
                .status(400)
                .json({msg: "Invalid Credentials"})

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
        res.status(200).send({
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                // email: user.email,
            }
        })

    } catch (err) {
        res.status(500).json({error: err.message})
    }
});

//DELETE ACCOUNT
router.delete('/delete', auth, async (req, res) => {
    try {

        const deletedUser = await User.findByIdAndDelete(req.user)
        res.json(deletedUser)

    } catch (err) {
        res.status(500).json({error: err.message})
    }
});

//VALIDATE TOKEN
router.post('/tokenIsValid', async (req, res) => {
    try {

        const token = req.header("x-auth-token");
        if (!token) return res.json(false);

        const verified = jwt.verify(token, process.env.JWT_SECRET)
        if (!verified) return res.json(false);

        const user = await User.findById(verified.id);
        if (!user) return res.json(false);

        return res.json(true)

    } catch (err){
        res.status(500).send({error: err.message})
    }
});

//FIND SPECIFIC USER
router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user)
        res.status(200).send({
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            phoneNumber: user.phoneNumber,            
            LGA: user.LGA,            
            state: user.state,            
        })
    } catch (err){
        res.status(500).send({ error: err.message })
    }
});

//FIND ALL USERS
router.get("/all", auth, async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).send({
            users: users            
        })
    } catch (err){
        res.status(500).send({ error: err.message })
    }
});

//UPDATE user ROUTE
router.put("/update/:id", auth, async (req, res) => {
//find and update the correct user
    try {
        User.findByIdAndUpdate(
            { _id: req.params.id },
            req.body,
            function (err, updatedUser) {
            if (err) {
                res.sendStatus(404);
            } else {
                    res.status(201).send(updatedUser);
                }
            }
        );
    }
    catch (err){
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;