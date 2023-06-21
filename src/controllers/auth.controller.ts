import {Author} from "../shemas/author.model";

class AuthController{
    static getFormLogin(req:any,res:any){
        res.render('login')
    }
}
export default AuthController