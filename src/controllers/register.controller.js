import User from "../models/User.js";
import bcrypt from "bcrypt";

export const handleNewUser = async (req, res) => {
  const {
    roles,
    firstName,
    lastName,
    email,
    password,
    identityNumber,
    address,
    postalCode,
    country,
    city,
    phoneNum,
    reachBy,
    pointsEarned,
    eliteNights,
    AB_Prize,
    famTripChance,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !identityNumber ||
    !address ||
    !postalCode ||
    !country ||
    !city ||
    !phoneNum ||
    !reachBy ||
    !pointsEarned ||
    !eliteNights ||
    !AB_Prize ||
    !famTripChance
  )
    return res.status(400).json({ message: "All data is required." });

  // check for duplicate email in the db
  const duplicate = await User.findOne({ email: email }).exec();
  if (duplicate)
    return res.sendStatus(409).json({ message: "Email ya fue utilizado" }); //Conflict

  try {
    //encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create and store the new user
    const result = await User.create({
      roles: { User: 2001 },
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      identityNumber: identityNumber,
      address: address,
      postalCode: postalCode,
      country: country,
      city: city,
      phoneNum: phoneNum,
      reachBy: reachBy,
      pointsEarned: pointsEarned,
      eliteNights: eliteNights,
      AB_Prize: AB_Prize,
      famTripChance: famTripChance,
    });

    console.log(result);

    res
      .status(201)
      .json({ success: `New user ${firstName} ${lastName} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
