import {Hono} from "hono";
import { User } from "@prisma/client";
import {sign} from "hono/jwt"
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { signinInput, signupInput } from "@nayanchivhane/medium-common";

export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string;
        JWT_SECRET: string
    }
}>()

userRouter.post("/signup", async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body= await c.req.json();
    const {success} = signupInput.safeParse(body);
    if (!success){
      c.status(411);
      return c.json({
        message: "inputs are not correct"
      })
    }
  
    try{
  
      const user=await prisma.user.create({
        data:{
          username: body.username,
          password: body.password,
          name: body.name
        }
      })
      const jwt = await sign({
        id: user.id
      },c.env.JWT_SECRET)
    
      return c.text(jwt);
    }catch(e){
      c.status(411);
      console.log(e)
      return c.json({message: "something went wrong"})
    }
  });
  userRouter.post("/signin", async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body= await c.req.json();
    const {success} = signinInput.safeParse(body);
    if (!success){
      c.status(411);
      return c.json({
        message: "inputs not correct"
      })
    }
  
    try{
  
      const user=await prisma.user.findFirst({
        where:{
          username: body.username,
          password: body.password,
          
        }
      })
      if (!user){
        c.status(403);
        return c.json({message: "incorrect credds"})
      }
      const jwt = await sign({
        id: user.id
      },c.env.JWT_SECRET)
    
      return c.text(jwt);
    }catch(e){
      c.status(411);
      console.log(e)
      return c.text('invalid')
    }
  });