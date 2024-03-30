import express, { Express, Request, Response } from "express";
import { IUser, IUserJSON } from "./type";
import { ReadFile, WriteFile } from "./utils/fs";

const router: Express = express();
router.use(express.json());
const port = 404;

router.post("/tracking", (req: Request, res: Response) => {
  try {
    const tracking: IUser = req.body;
    const db = ReadFile();
    const track: IUserJSON[] = db.tracker;
    const id = Date.now();
    track.push({
      id,
      ...tracking,
    });
    db.tracker = track;
    WriteFile(db);
    return res.send("Create Success!");
  } catch (error: any) {
    res.send(error.message);
  }
});

router.put("/tracking/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const db = ReadFile();
    const track: IUserJSON[] = db.tracker;
    const updateTrack = track.map((tracking) => {
      return tracking.id === Number(id)
        ? { ...tracking, ...req.body }
        : tracking;
    });
    db.tracker = updateTrack;
    WriteFile(db);
    return res.send("Update Success!");
  } catch (error: any) {
    res.send(error.message);
  }
});

router.delete("/tracking/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const db = ReadFile();
    const track: IUserJSON[] = db.tracker;

    const filteredTrack = track.filter(
      (tracking) => tracking.id !== Number(id)
    );
    db.tracker = filteredTrack;
    WriteFile(db);
    return res.send("Delete Success!");
  } catch (error: any) {
    res.send(error.message);
  }
});

router.get("/tracking", (req: Request, res: Response) => {
  try {
    const db = ReadFile();
    const track: IUserJSON[] = db.tracker;
    return res.send(track);
  } catch (error) {
    console.log(error);
  }
});

router.get("/tracking/:category", (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const db = ReadFile();
    const track: IUserJSON[] = db.tracker;

    const filteredCategory = track.filter(
      (tracking) => tracking.category === category
    );
    return res.send(filteredCategory);
  } catch (error) {
    console.log(error);
  }
});

router.get("/tracking/", (req: Request, res: Response) => {
  try {
    const { setDate, getDate } = req.query;
    const db = ReadFile();
    const track: IUserJSON[] = db.tracker;

    if (setDate && getDate) {
      const filteredDate = track.filter(
        (tracking) =>
          new Date(tracking.date).getTime() >=
            new Date(setDate as string).getTime() &&
          new Date(tracking.date).getTime() <=
            new Date(getDate as string).getTime()
      );
      return res.send(filteredDate);
    }
  } catch (error) {
    console.log(error);
  }
});

router.listen(port, () => {
  console.log(
    `🐣🐤🐥 [server] : Server is Running at http://localhost:${port}`
  );
});
