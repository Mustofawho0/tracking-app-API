import fs from "fs";

export const ReadFile = (): any => {
  return JSON.parse(fs.readFileSync("./db/db.json").toString());
};

export const WriteFile = (db: any): void => {
  fs.writeFileSync("./db/db.json", JSON.stringify(db));
};
