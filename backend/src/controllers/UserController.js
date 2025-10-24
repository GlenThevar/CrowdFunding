import { users } from "../models/user.js";

export async function getUserData(req, res) {
  try {
    const result = await users.findById(req.params.id);
    if (!result) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(result);
  } catch (err) {
    console.error("Error in fetching user ", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateProfile(req, res) {
  try {
    const { username, shortDiscription, longDiscription, basedLocation } =
      req.body;

    const profileUrl = req.file?.path;

    const userid = req.user.id;

    if (!userid) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    const result = await users.findByIdAndUpdate(userid, {
      username,
      shortDiscription,
      longDiscription,
      basedLocation,
      profileUrl,
    });

    if (result)
      return res.status(200).json({ message: "Successfull", result: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
