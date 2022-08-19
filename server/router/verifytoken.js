const jwt = require("jsonwebtoken");
const formatISO = require('date-fns/formatISO')
const User = require("../models/user");
const Calori = require("../models/calori");

const verify = (req, res, next) => {
  const auth_token = req.headers.auth_token;
  const token = auth_token.split(" ")[1];
  if (!token) res.status(401).send("Acsses Denay");
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.json({ message: err.message });
  }
};

//////AuthAdmin

const adminouth = async (req, res, next) => {
  const { isAdmin } = await User.findOne(req.user);

  if (isAdmin)
    try {
      console.log("adminis ", isAdmin);

      next();
    } catch (err) {
      res.json({ message: err.message });
    }
  else {
    res.send(false);
  }
};
//// paginated
async function paginated(userid,page, limt, startt, endt) {
  
  try {
    console.log('server_startt',startt,'s_endt',endt)
    if (startt && endt != undefined) {

     const start =formatISO( new Date(startt ));
     const end =formatISO (new Date(endt));

     console.log('server_start',start,'s_end',end)
      const x = await Calori.find({
        userId: userid,
        dateTime: { $gte: start, $lt: end },
      }).count();
      const startIndex =page * limt;
      // const endIndex= page * limt
      result = {};
      if (startIndex < x) {
        result.next = { page: page + 1, limt: limt };
      }
      if (startIndex > 0) {
        result.previous = { page: page - 1, limt: limt };
      }

      result.result = await Calori.find({
        userId: userid,
        dateTime: { $gte: start, $lt: end },
      })
        .skip(page * limt > 0 ? page * limt : 0)
        .limit(limt);
      result.len = x;
      console.log("r", result);
    } else {
      const start = formatISO(new Date(1 - 1 - 1950));
      const end = formatISO(new Date());
      const x = await Calori.find({
        userId: userid,
        dateTime: { $gte: start, $lt: end },
      }).count();
      const startIndex = page * limt;
      // const endIndex= page * limt
      result = {};
      if (startIndex < x) {
        result.next = { page: page + 1, limt: limt };
      }
      if (startIndex > 0) {
        result.previous = { page: page - 1, limt: limt };
      }

      result.result = await Calori.find({
        userId: userid,
        dateTime: { $gte: start, $lt: end },
      })
        .skip(page * limt > 0 ? page * limt : 0)
        .limit(limt);
      result.len = x;
      console.log("r", result);
    }
  } catch (err) {
    console.log(err);
  }

  return result;
}




module.exports = { verify, adminouth, paginated };
