import { Router } from "express";
const router = Router();

// GET
// route: /api/loan/:id
router.route("/:id").get((req, res) => {
    res.json({ message: "ok" });
});

export default router;
