import passport from "passport";
import LocalStrategy from "passport-local";
import {UserModel} from "../shemas/user.model";
import * as process from "process";

passport.use( new LocalStrategy(async function verify (username: string, password: string, cb:any){
    const user = await UserModel.findOne({username});
    if (!user){
        return cb(null,false,{message:' Incorrect username or password'})
    }
    if (user.password!==password){
        return cb(null,false,{message: 'Incorrect username or password'})
    }
    return cb(null,user)
}))

passport.serializeUser((user:any,cb)=>{
    process.nextTick(()=>{
        cb(null,{id:user._id,username: user.username,role:user.role})
    })
})

passport.deserializeUser((user:any, cb)=>{
    process.nextTick(()=>{
        return cb(null,user)
    })
})
export default passport;