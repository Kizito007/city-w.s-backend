var router = require("express").Router(),
  auth = require("../middleware/auth"),
  I_Case = require("../models/i_cases");

// Create new i_case
router.post("/new", auth, async (req, res) => {        
    try {
        let {
            descrp,
            //iphone brand
            brand,
            price,
            qty,
            img,
            tag,
            sale,
            //whether sold out or on sale
            arrival,
            //Add reviews field
            ratings,
        } = req.body;
        const newIcase = new I_Case({
            descrp,
            brand,
            price,
            qty,
            img,
            tag,
            sale,
            arrival,
            ratings,
        });

        const savedIcase = await newIcase.save();

        res.status(201).send(savedIcase)
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
});

//GET an i-case DETAIL
router.get("/find/:id", auth, async (req, res) => {
    I_Case.findById({ _id: req.params.id }, function (err, foundIcase) {
        if (err) {
            return res.status(404).send({ message: "I-case not found" });
        } else {
            res.status(200).send({ i_case: foundIcase });
        }
    });
});

//GET all I-cases
router.get("/all", auth, async (req, res) => {
    I_Case.find({}, function (err, allIcases) {
        if (err) {
            return res.status(404).send({ message: "No i-case available" });
        } else {
            res.status(200).send({ i_cases: allIcases });
        }
    });
});

//UPDATE AN I_CASE
router.put("/update/:id", auth, async (req, res) => {
    try {
      const i_case = await I_Case.findOne({
        _id: req.params.id,
      });
      if (!i_case)
        return res.status(404).send({
            msg: "Something is wrong with this i_case",
        });
      const updatedIcase = await I_Case.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      res.status(201).send(updatedIcase);
    } catch (err) {
      res.status(400).send({ msg: `${err}` });
    }
});

//DELETE AN I_CASE
router.delete('/delete/:id', auth, async (req, res) => {
    try {
        let i_case = req.params.id;
        const deletedIcase = await I_Case.findByIdAndDelete(i_case)
        res.status(200).send(deletedIcase)

    } catch (err) {
        res.status(500).json({error: err.message})
    }
});

module.exports = router;  