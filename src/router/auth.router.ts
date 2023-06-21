import express from "express";
import passport from "../middlewares/auth"
import AuthController from "../controllers/auth.controller";

const authRouter= express.Router();

authRouter.get('/login',AuthController.getFormLogin);
authRouter.post('/login',passport.authenticate('local',{
    successRedirect: '/book/list',
    failureRedirect: '/auth/login'
}))
export default authRouter;