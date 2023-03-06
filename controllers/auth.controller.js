export const login = (req,res)=>{
    console.log(req.body)
    res.json({status:true})
}

export const register = (req,res)=>{
    res.json({status:true})
}