var express = require("express");
var router = express.Router();
var Remark = require("../model/remark");
var Event = require("../model/event");

router.post("/:id/remarks", (req, res, next) => {
  var eventId = req.params.id;
  console.log(eventId);
  req.body.eventId = eventId;
  Remark.create(req.body, (err, remarks) => {
    if (err) return next(err);
    Event.findByIdAndUpdate(
      eventId,
      { $push: { remarksId: remarks.id } },
      (err, updatedEvent) => {
        if (err) return next(err);
        res.redirect("/events/" + eventId);
      }
    );
  });
});

router.get("/:id/edit", (req, res, next) => {
  var remarkId = req.params.id;
  Remark.findById(remarkId, (err, remarks) => {
    if (err) return next(err);
    res.render("editRemark", { remarks });
  });
});

module.exports = router;
