import { admin } from "../models/admin.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from 'dotenv';
dotenv.config();


export const registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;

    //bcrpyt the password
     const passwordHash = await bcrypt.hashSync(password, 10);
    console.log(passwordHash);
    console.log({ name, email, passwordHash });
    
        const newAdmin = new admin({
        name,
        email,
        password: passwordHash,
        });
    
        const savedAdmin = await newAdmin.save();
        if(savedAdmin){
            res.status(201).json({name:savedAdmin.name,email:savedAdmin.email});
        }
    }

export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
   // console.log({ email, password });
        const admin1 = await admin.findOne({ email: email });
        //console.log(admin1);
        if(!admin1) return res.status(400).json("Wrong credentials!");
        //validate password
        const validPassword = await bcrypt.compareSync(password, admin1.password);
        if (!validPassword) return res.status(400).json("Wrong credentials!");
        //jwt
        const accessToken = jwt.sign(
        { id: admin1._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
        );
        //console.log('Generated JWT:', accessToken);
        //console.log({user:admin,token:accessToken});
        res.status(200).json({user:admin1,token:accessToken});
    }
    //"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZmNlOTJjMDFjYjI3MTM3YzMwOTE2MCIsImlhdCI6MTcyNzg1MzI4MCwiZXhwIjoxNzI3OTM5NjgwfQ.G70loPneAoW9LfUOMmhaO6OBoLiU16C7G7Jj6AIZBQ0"
