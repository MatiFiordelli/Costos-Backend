import jwt from 'jsonwebtoken'

export const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1]

    const verifyAuth = jwt.verify(token, process.env.SECRET_FOR_TOKEN, (err, obj)=>{
        if(err) return false
        return obj
    })

    const condition = req.route.path==='/ingredients' || req.route.path==='/recipes'
    if (token=='null'){
        
        if(condition){
            req.body.autor = verifyAuth.user
            next()
        }else{
            res.status(401).json({message: 'Para realizar esa accion, debe iniciar sesion'})
        }
        
    }else{
        if(!verifyAuth){
            if(condition){
                req.body.autor = verifyAuth.user
                next()
            }else{
                res.status(403).json({message: 'Su sesion ya expiró, debe iniciar sesion'})
            }
        }else{
            if(condition) req.body.autor = verifyAuth.user
            if(req.body.autor) req.body.autor = verifyAuth.user
            next()
        }
    }
}