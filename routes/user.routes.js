const router = require("express").Router();

var UserController = require("../controller/user.controller");

//http post
/**
 * @swagger
 * /api/user:
 *   post:
 *     description: Create an user
 *     parameters:
 *     - name: User's name
 *
 *       in: formData
 *       required: false
 *       type: String
 * 
 *     - surname: User's surname
 *
 *       in: formData
 *       required: false
 *       type: String
 *     responses:
 *       201:
 *         description: Created
 *
 */
router.post("/", UserController.register);

router.post("/login", UserController.login);

//http get

router.get("/", UserController.getUsers);
router.get("/:id", UserController.getById);

//http put
router.put("/:id", UserController.update);

//http delete
router.delete("/:id", UserController.delete);

module.exports = router;
