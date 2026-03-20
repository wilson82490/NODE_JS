 
 
 
 /* import bcrypt from 'bcryptjs';

const password = "123456";

const hash1 = await bcrypt.hash(password, 10);

console.log(hash1);

 const hash2 = await bcrypt.hash(password, 10);

console.log(hash2); 

const ok = await bcrypt.compare(password, hash1);
const wrong = await bcrypt.compare("1234", hash1);

console.log(ok);
console.log(wrong);  */


//import dotenv from 'dotenv';
// //dotenv.config();

import { config } from 'dotenv';

config();

import jwt from 'jsonwebtoken';

/* const token = jwt.sign({userId: 1}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
});

console.log(token); */


const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YmIwZjRkNDdlMjljMzYxMGJhNzc1OCIsImVtYWlsIjoidGVzdC54QHgubmV0IiwiaWF0IjoxNzc0MDIxNjY1LCJleHAiOjE3NzQwMjUyNjV9.RXrO58W-zURls5EjJ5AvlUarqZyn-HgnPBK_GAM6HFE";
try {
    const isVerified = jwt.verify(token, process.env.JWT_SECRET);
    console.log(isVerified);

   /*  const decoded = jwt.decode(token);
    console.log(decoded); */

} catch (error) {
    console.log("Token is invalid");
}

    
