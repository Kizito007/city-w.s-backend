var router = require("express").Router(),
  auth = require("../middleware/auth"),
  Ringlight = require("../models/ringlights");

// Create new ringlight
router.post("/new", auth, async (req, res) => {        
    try {
        let {
            descrp,
            brand,
            price,
            qty,
            img,
            // tag or new
            tag,
            sale,
            //whether sold out or on sale
            arrival,
            //Add reviews field
            ratings,
        } = req.body;
        const newRinglight = new Ringlight({
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

        const savedRinglight = await newRinglight.save();

        res.status(201).send(savedRinglight)
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
});

//GET A Ringlight DETAIL
router.get("/find/:id", auth, async (req, res) => {
    Ringlight.findById({ _id: req.params.id }, function (err, foundRinglight) {
        if (err) {
            return res.status(404).send({ message: "Ringlight not found" });
        } else {
            res.status(200).send({ ringlight: foundRinglight });
        }
    });
});

//GET all ringlights
router.get("/all", auth, async (req, res) => {
    Ringlight.find({}, function (err, allRinglights) {
        if (err) {
            return res.status(404).send({ message: "No ringlight available" });
        } else {
            res.status(200).send({ ringlights: allRinglights });
        }
    });
});

//UPDATE A RINGLIGHT
router.put("/update/:id", auth, async (req, res) => {
    try {
      const ringlight = await Ringlight.findOne({
        _id: req.params.id,
      });
      if (!ringlight)
        return res.status(404).send({
            msg: "Something is wrong with this ringlight",
        });
      const updatedRinglight = await Ringlight.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      res.status(201).send(updatedRinglight);
    } catch (err) {
      res.status(400).send({ msg: `${err}` });
    }
});

//DELETE A RINGLIGHT
router.delete('/delete/:id', auth, async (req, res) => {
    try {
        let light = req.params.id;
        const deletedRinglight = await Ringlight.findByIdAndDelete(light)
        res.status(200).send(deletedRinglight)

    } catch (err) {
        res.status(500).json({error: err.message})
    }
});

module.exports = router;  