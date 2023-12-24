const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { SendResponse } = require("../Helpers/HelperFx");
const { User } = require("../model/Auth");
const validateEmail = require("../Helpers/EmailValidator");

const AuthControllers = {
  Login: async (req, res) => {
    let { UserName, Password, email } = req.body;
    let Obj = { UserName, email };
    let ErrArray = [];
    try {
      if (!Password) ErrArray.push("Password Is Required");
      if (!Obj.email) ErrArray.push("Email Is Required");
      if (Password.length < 6)
        ErrArray.push("Password Must be Greater Then 6 Digit");
      if (ErrArray.length) {
        return res
          .status(400)
          .send(SendResponse(false, "There is Some  Error", ErrArray));
      }
      if (!validateEmail(Obj.email)) {
        return res
          .status(400)
          .send(SendResponse(false, "Invalid Email address", { ...Obj.email }));
      }

      let U = await User.findOne({ email: Obj.email });
      if (!U) {
        return res
          .status(404)
          .send(SendResponse(false, "This Email Dose not Exist"));
      }
      const validPass = await bcrypt.compare(Password, U.Password);
      if (!validPass)
        return res.status(400).send(SendResponse(false, "incorrect password"));
      delete U._doc.Password;
      let Token = jwt.sign({ ...U._doc }, process.env.SECRET_KEY, {
        expiresIn: 60 * 60 * 24,
      });
      res.status(200).send(
        SendResponse(true, "User Successfully Login", {
          token: Token,
          user: { ...U._doc },
        })
      );
    } catch (err) {
      res.status(400).send(SendResponse(false, "Catch Unknown Error", err));
    }
  },
  Signup: async (req, res) => {
    let {
      UserName,
      Password,
      FirstName,
      LastName,
      DateofBirth,
      Gender,
      Location,
      Bio,
      email,
      Profile,
    } = req.body;
    let Obj = {
      UserName,
      Profile,
      FirstName,
      LastName,
      DateofBirth,
      Gender,
      Location,
      Bio,
      email,
    };
    let ErrArray = [];
    try {
      if (!Password) ErrArray.push("Password Is Required");
      if (!Obj.email) ErrArray.push("Email Is Required");
      if (!Obj.UserName) ErrArray.push("UserName Is Required");
      if (Password.length < 6)
        ErrArray.push("Password Must be Greater Then 6 Digit");
      if (ErrArray.length)
        return SendResponse(false, "There is Some  Error", ErrArray);
      if (!validateEmail(Obj.email)) {
        return res
          .status(400)
          .send(SendResponse(false, "Invalid Email address", { ...Obj.email }));
      }

      let E = await User.findOne({
        $or: [{ email: Obj.email }, { UserName: Obj.UserName }],
      });
      if (E) {
        return res
          .status(400)
          .send(
            SendResponse(
              false,
              "Already Have Account in this Email or UserName",
              { ...Obj }
            )
          );
      }
      let cryptPassword = await bcrypt.hash(Password, 10);
      let L = await new User({ ...Obj, Password: cryptPassword }).save();
      console.log(L);
      res.status(201).send(
        SendResponse(true, "User Successfully Created", {
          ...L._doc,
        })
      );
    } catch (err) {
      res.status(400).send(SendResponse(false, "Unkown Error", { ...err }));
    }
  },

  ProtectByAuth: async (req, res, Next) => {
    try {
      let token = req.get("Authorization")?.split("Bearer ")[1];
      let decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (decoded.email) {
        Next();
      } else {
        res
          .status(407)
          .send(SendResponse(false, "invalid Token", { ...decoded }));
      }
    } catch (err) {
      res.status(407).send(SendResponse(false, "invalid Token", { ...err }));
    }
  },
  getAllUser: async (req, res) => {
    try {
      data = await User.find();
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(SendResponse(false, "Unkown Error", err));
    }
  },
  getUserById: async (req, res) => {
    try {
      let data = await User.findById(req.params.id);
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(SendResponse(false, "Unkown Error", err));
    }
  },
};

module.exports = AuthControllers;
