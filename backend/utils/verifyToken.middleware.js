//verify token

import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();


export const verifyToken = (req, res, next) => {
    //console.log(req);
    const authHeader = `${req.headers.authorization}`;
   // const authHeader='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZmNlOTJjMDFjYjI3MTM3YzMwOTE2MCIsImlhdCI6MTcyNzg1NjA0MCwiZXhwIjoxNzI3OTQyNDQwfQ.3y21vOTtVqrzrFj7bvCz15_5PaB4fN0Bb0wK8ltQaMQ'
    if (authHeader) {
        //console.log(authHeader);

        try {
            const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
            //console.log(decoded);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json( "Invalid token" );
        }
    } else {
        return res.status(401).json("You are not authenticated!");
    }
}


//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZmNlOTJjMDFjYjI3MTM3YzMwOTE2MCIsImlhdCI6MTcyNzg1NDM1NywiZXhwIjoxNzI3OTQwNzU3fQ.Y-eAQibosFU-qDE8HS3_GsPJTNW5t4ljugJ9IKrAwG0"



