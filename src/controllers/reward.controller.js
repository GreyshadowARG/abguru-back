import Reward from "../models/Reward.js";

export const loadEliteReward = async (req, res) => {
  const {
    _id,
    firstName,
    lastName,
    email,
    identityNumber,
    country,
    city,
    phoneNum,
    ABreward,
    eliteReward,
    pointsTaken,
    rewardState,
    denyText,
  } = req.body;

  const newReward = new Reward({
    userID: _id,
    firstName: firstName,
    lastName: lastName,
    email: email,
    identityNumber: identityNumber,
    country: country,
    city: city,
    phoneNum: phoneNum,
    ABreward: ABreward,
    eliteReward: eliteReward,
    pointsTaken: pointsTaken,
    rewardState: rewardState,
    denyText: denyText,
  });

  const rewardLoaded = await newReward.save();

  res.status(201).json(rewardLoaded);
};

export const loadAB_Reward = async (req, res) => {
  const {
    _id,
    firstName,
    lastName,
    email,
    identityNumber,
    country,
    city,
    phoneNum,
    ABreward,
    rewardState,
    denyText,
  } = req.body;

  const newReward = new Reward({
    userID: _id,
    firstName: firstName,
    lastName: lastName,
    email: email,
    identityNumber: identityNumber,
    country: country,
    city: city,
    phoneNum: phoneNum,
    ABreward: ABreward,
    eliteReward: "None",
    pointsTaken: "0",
    rewardState: rewardState,
    denyText: denyText,
  });

  const rewardLoaded = await newReward.save();

  res.status(201).json(rewardLoaded);
};

export const getAllRewards = async (req, res) => {
  const reward = await Reward.find();
  res.json(reward)
}

export const getAllRewardsAB = async (req, res) => {
  const reward = await Reward.find();
  const filtered = reward.filter(function (reward) {
    return reward.ABreward !== "None";
  });
  res.json(filtered);
};

export const getRewardsABpending = async (req, res) => {
  const reward = await Reward.find();
  const filtered = reward.filter(function(reward) {
      return reward.eliteReward === "None" && reward.rewardState === "Pendiente"
  })
  res.json(filtered)
}

export const getRewardsABHistory = async (req, res) => {
  const reward = await Reward.find();
  const filtered = reward.filter(function (reward) {
    return reward.rewardState !== "None" && reward.ABreward !== "None"
  });
  res.json(filtered);
};

export const getRewardsElitePending = async (req, res) => {
  const reward = await Reward.find();
  const filtered = reward.filter(function(reward) {
      return reward.eliteReward !== "None" && reward.rewardState === "Pendiente"
  })
  res.json(filtered)
}

export const getRewardsEliteHistory = async (req, res) => {
  const reward = await Reward.find();
  const filtered = reward.filter(function (reward) {
    return reward.rewardState !== "None" && reward.eliteReward !== "None"
  });
  res.json(filtered);
};

export const getRewardsByUserId = async (req, res) => {
  const rewards = await Reward.find();
  const filter = rewards.filter(function(reward) {
      return reward.userID === (req.params.userID)
  })

  res.json(filter)
}

export const getRewardsFilteredPending = async (req, res) => {
  const reward = await Reward.find();
  const filtered = reward.filter(function(reward) {
      return reward.rewardState === "Pendiente"
  })
  res.json(filtered)
}

export const approveReward = async (req, res) => {
  const reward = await Reward.findById(req.params.id);
  const updatedState = req.body
  await Reward.findByIdAndUpdate(reward, updatedState)
  res.status(200).json();
}

export const addAB_Prize = async (req, res) => {
  const reward = await Reward.findById(req.params.id);
  const updatedState = req.body
  const result = await Reward.findByIdAndUpdate(reward, updatedState)
  res.json(result)
}

export const denyReward = async (req, res) => {
  const reward = await Reward.findById(req.params.id);
  const updatedState = req.body
  await Reward.findByIdAndUpdate(reward, updatedState)
  res.status(200).json();
}

export const addDenyText = async (req, res) => {
  const reward = await Reward.findById(req.params.id);
  const correctionText = req.body
  await Reward.findByIdAndUpdate(reward, correctionText)
  res.status(200).json();
}



