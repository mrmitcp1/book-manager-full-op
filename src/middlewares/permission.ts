import e from "express";

const permission = (req, res, next)=>{
    if (req.user.role==='admin'){
        next()
    }else {
        return res.end ('403')
    }
}
export default permission