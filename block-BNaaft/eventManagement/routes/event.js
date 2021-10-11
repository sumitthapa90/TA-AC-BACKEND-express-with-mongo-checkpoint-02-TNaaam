var express = require("express");
var router = express.Router();
var Event = require("../model/event");

/* GET users listing. */
router.get("/", function (req, res, next) {
  Event.find({}, (err, events) => {
    if (err) return next(err);
    res.render("events", { events: events });
  });
});

router.get("/new", (req, res) => {
  res.render("AddForm");
});

router.post("/", (req, res, next) => {
  console.log(req.body);
  Event.create(req.body, (err, events) => {
    if (err) return next(err);
    res.redirect("/events");
  });
});

router.get("/:id", (req, res, next) => {
  var id = req.params.id;
  console.log(id);
  // Event.findById(id, (err, events) => {
  //   if (err) return next(err);
  //   res.render("singleEvent", { events });
  // });
  Event.findById(id)
    .populate("remarksId")
    .exec((err, events) => {
      if (err) return next(err);
      res.render("singleEvent", { events });
    });
});

router.get("/:id/edit", (req, res, next) => {
  var id = req.params.id;
  Event.findById(id, (err, events) => {
    if (err) return next(err);
    res.render("editEvent", { events });
  });
});

router.post("/:id", (req, res, next) => {
  var id = req.params.id;
  Event.findByIdAndUpdate(id, req.body, (err, events) => {
    if (err) return next(err);
    res.redirect("/events/" + id);
  });
});

router.get("/:id/delete", (req, res, next) => {
  var id = req.params.id;
  Event.findByIdAndDelete(id, (err, events) => {
    if (err) return next(err);
    res.redirect("/events");
  });
});

router.get("/:id/likes", (req, res, next) => {
  var id = req.params.id;
  Event.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, events) => {
    if (err) return next(err);
    res.redirect("/events/" + id);
  });
});

//remarks Routes

module.exports = router;
