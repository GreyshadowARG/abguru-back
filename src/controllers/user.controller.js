import User from "../models/User.js";
import 'dotenv/config'

const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(204).json({ message: "No users found" });
  res.json(users);
};

const deleteUser = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "User ID required" });
  const user = await User.findOne({ _id: req.body.id }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `User ID ${req.body.id} not found` });
  }
  const result = await user.deleteOne({ _id: req.body.id });
  res.json(result);
};

const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.status(200).json(user);
};

const addPoints = async (req, res) => {
  const user = await User.findById(req.params.id);
  const currentPoints = user.pointsEarned;
  const addedPoints = req.body.pointsEarned;
  const sumPoints = parseInt(currentPoints) + parseInt(addedPoints);
  const updatedPoints = {
    pointsEarned: String(sumPoints),
  };
  await User.findByIdAndUpdate(user, updatedPoints);
  res.status(200)
};

const addEliteNights = async (req, res) => {
  const user = await User.findById(req.params.id);
  const currentNights = user.eliteNights;
  const addedNights = req.body.eliteNights;
  const sumNights = parseInt(currentNights) + parseInt(addedNights);
  const updatedNights = {
    eliteNights: String(sumNights),
  };
  await User.findByIdAndUpdate(user, updatedNights);
  res.status(200)
};

const substractEliteNights = async (req, res) => {
  const user = await User.findById(req.params.id);
  const currentNights = user.eliteNights;
  const substractedNights = req.body.eliteNights;
  const totalNights = parseInt(currentNights) - parseInt(substractedNights);
  const updatedNights = {
    eliteNights: String(totalNights),
  };
  await User.findByIdAndUpdate(user, updatedNights);
  res.status(200)
};

const substractPoints = async (req, res) => {
  const user = await User.findById(req.params.id);
  const currentPoints = user.pointsEarned;
  const substractedPoints = req.body.pointsEarned;
  const totalPoints = parseInt(currentPoints) - parseInt(substractedPoints);
  const updatedPoints = {
    pointsEarned: String(totalPoints),
  };
  await User.findByIdAndUpdate(user, updatedPoints);
  res.status(200)
};

const addAB_Prize = async (req, res) => {
  const user = await User.findById(req.params.id);
  const added = req.body.AB_Prize
  let repeated = false
  const ABprize = user.AB_Prize
  if(ABprize.includes(added)){repeated = true}
  else{const array = ABprize.push(added)}
  const final = 
  {
    AB_Prize : ABprize
  }
  const result = await User.findByIdAndUpdate(user, final)
  res.status(200);
};

const removeAB_Prize = async (req, res) => {
  const user = await User.findById(req.params.id);
  const newArray = req.body
  const result = await User.findByIdAndUpdate(user, newArray)
  res.status(200);
};

/*
const removeAB_Prize = async (req, res) => {
  const user = await User.findById(req.params.id);
  const array = user.AB_Prize
  const remove = req.body
  const index = array.indexOf(remove.AB_Prize)
  if (index !== -1) {
    array.splice(index, 1);
  }
  const final = 
  {
    AB_Prize : array
  }
  const result = await User.findByIdAndUpdate(user, final)
  res.json(final);
};
*/

const currentUser = async (req, res) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  const payload = JSON.parse(
    Buffer.from(token.split(".")[1], "base64").toString()
  );
  const userId = payload.UserInfo.id;
  const currentUser = await User.findById(userId);
  const userData = await User.findById(currentUser.id);
  res.send(userData);
  res.status(200)
};

export default {
  getAllUsers,
  deleteUser,
  getUser,
  addPoints,
  addEliteNights,
  substractEliteNights,
  substractPoints,
  addAB_Prize,
  removeAB_Prize,
  currentUser,
};
