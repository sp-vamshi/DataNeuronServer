const router = require("express").Router();
const taskController = require("../controllers/taskController");

router.post("/add", taskController.updateCallCount, taskController.add);
router.post(
  "/update/:id",
  taskController.updateCallCount,
  taskController.update
);

router.get("/getcount", taskController.getCount);

module.exports = router;
