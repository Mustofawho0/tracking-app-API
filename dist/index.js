"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = require("./utils/fs");
const router = (0, express_1.default)();
router.use(express_1.default.json());
const port = 404;
router.post("/tracking", (req, res) => {
    try {
        const tracking = req.body;
        const db = (0, fs_1.ReadFile)();
        const track = db.tracker;
        const id = Date.now();
        track.push(Object.assign({ id }, tracking));
        db.tracker = track;
        (0, fs_1.WriteFile)(db);
        return res.send("Create Success!");
    }
    catch (error) {
        res.send(error.message);
    }
});
router.put("/tracking/:id", (req, res) => {
    try {
        const { id } = req.params;
        const db = (0, fs_1.ReadFile)();
        const track = db.tracker;
        const updateTrack = track.map((tracking) => {
            return tracking.id === Number(id)
                ? Object.assign(Object.assign({}, tracking), req.body) : tracking;
        });
        db.tracker = updateTrack;
        (0, fs_1.WriteFile)(db);
        return res.send("Update Success!");
    }
    catch (error) {
        res.send(error.message);
    }
});
router.delete("/tracking/:id", (req, res) => {
    try {
        const { id } = req.params;
        const db = (0, fs_1.ReadFile)();
        const track = db.tracker;
        const filteredTrack = track.filter((tracking) => tracking.id !== Number(id));
        db.tracker = filteredTrack;
        (0, fs_1.WriteFile)(db);
        return res.send("Delete Success!");
    }
    catch (error) {
        res.send(error.message);
    }
});
router.get("/tracking", (req, res) => {
    try {
        const db = (0, fs_1.ReadFile)();
        const track = db.tracker;
        return res.send(track);
    }
    catch (error) {
        console.log(error);
    }
});
router.get("/tracking/:category", (req, res) => {
    try {
        const { category } = req.params;
        const db = (0, fs_1.ReadFile)();
        const track = db.tracker;
        const filteredCategory = track.filter((tracking) => tracking.category === category);
        return res.send(filteredCategory);
    }
    catch (error) {
        console.log(error);
    }
});
router.get("/tracking/", (req, res) => {
    try {
        const { setDate, getDate } = req.query;
        const db = (0, fs_1.ReadFile)();
        const track = db.tracker;
        if (setDate && getDate) {
            const filteredDate = track.filter((tracking) => new Date(tracking.date).getTime() >=
                new Date(setDate).getTime() &&
                new Date(tracking.date).getTime() <=
                    new Date(getDate).getTime());
            return res.send(filteredDate);
        }
    }
    catch (error) {
        console.log(error);
    }
});
router.listen(port, () => {
    console.log(`🐣🐤🐥 [server] : Server is Running at http://localhost:${port}`);
});
