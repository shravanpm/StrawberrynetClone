const express = require("express");
const Cart = require("../models/cart.model");
const User = require("../models/user.model");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

// router.get("/", authenticate, async (req, res) => {
//   try {
//     Cart.countDocuments({}).exec((err, count) => {
//       if (err) {
//         res.send(err);
//         return;
//       }

//       res.send({ count: count });
//     });
//   } catch (err) {
//     return res.status(400).send({ message: err.message });
//   }
// });

router.get("/", authenticate, async (req, res) => {
  try {
    var cart = await Cart.find({ userId: req.user._id }).lean().exec();
    return res.status(200).send(cart);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});

router.post("/", authenticate, async (req, res) => {
  var userCart = await Cart.find({ userId: req.body.userId });
  // console.log("USERCART",userCart);
  
  var proDexist = await Cart.find({ prodId: req.body.prodId });
  if (userCart.length == 0) {
    try {
      const cart = await Cart.create(req.body);
      return res.status(201).send(cart);
    } catch (err) {
      return res.status(400).send(err);
    }
  } else {
    try {
      const cart = await Cart.updateOne(
        { userId: req.user._id },
        { $addToSet: { prodId: req.body.prodId } },
        {
          new: true,
        }
      )
        .lean()
        .exec();
      console.log(cart);

      
      if(proDexist.length === 0){
        let there=false
        return res.status(200).send({data:req.body,there});
      }else{
       let there=true
        return res.status(200).send({data:req.body,there});
      }
    } catch (err) {
      return res.status(400).send(err);
    }
  }
});

// router.patch("/", authenticate, async (req, res) => {
//   try {
//     kk = await Cart.find({ prodId: req.body.prodId });
//     console.log("ccccccccccccccccccccccc", kk.length);
//     if (kk.length === 0) {
//       const cart = await Cart.updateOne(
//         { userId: req.user._id },
//         { $addToSet: { prodId: req.body.prodId } },
//         {
//           new: true,
//         }
//       )
//         .lean()
//         .exec();
//       console.log(cart);

//       return res.status(200).send(req.body);

//       // GroupChat.findByIdAndUpdate(req.body.roomId, {$addToSet:{usersIds:req.body.userId}},{safe: true, new:true},(err,room) =>
//     } else {
//       return res.status(200).send({ message: "allready in the cart" });
//     }
//   } catch (err) {
//     console.log(err);
//     return res.status(400).send(err);
//   }
// });

module.exports = router;
// app.post("/edit/:id", (req, res) => {
//   const requestedId = req.params.id;
//   console.log(req.body);
//   Post.findOneAndUpdate({
//      _id: requestedId                   // Query Part
//   },
//   {
//     $set: {
//        title: req.body.title,           // Fields which we need to update
//        content: req.body.content
//     }
//   },
//   {
//      new: true                          // option part ( new: true will provide you updated data in response )
//   },(err, post) => {
//     if (!err) {
//       res.render("edit", {
//         title: post.title,
//         content: post.content
//       });
//     }
//   });
// });
