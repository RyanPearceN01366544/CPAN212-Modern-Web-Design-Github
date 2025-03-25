import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

const user_router = express.Router();

user_router.post("/register", (req, res) => {
    const {username, email, password} = req.body;

    bcrypt.hash(password, 10)
        .then((hashedPassword) => {
            let newUser = new User({
                username,
                email,
                password: hashedPassword, 
            });

            newUser.save().then(() => { 
                console.log("Account created!");
                res.json({message: "Account Created!"});
            })
            .catch((err) => {console.log(err); return res.status(400).json("Error creating account! Account already exists!");})
        })
        .catch((err) => {console.log(err)});
})

user_router.post("/login", (req, res) => {
    const {username, email, password} = req.body;
    
    User.findOne({username: username} || {email: email})
        .then((acc_) => {
            if (!acc_) {
                return res.status(400).json({message: "No account on file!"});
            }

            // Compare Passwords
            bcrypt.compare(password, acc_.password)
                .then((result_) => {
                    if (!result_){
                        console.log(err, `\n--------\nIncorrect Password!`); 
                        return res.status(400).json({message: "Password Incorrect!"});
                    }
                    return res.json({message: "You have successfully logged in!"})
                })
                .catch((err) => { console.log(err, `\n--------\nSomething went wrong!`); return res.status(400).json({message: "The "}); });
        })
        .catch((err) => { console.log(err, `\n-----\n Could not find account!`); });
})

export default user_router;