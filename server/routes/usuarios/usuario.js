const express = require ('express');
const app = express.Router();
let arrJsnUsuarios = [{_id:1, strNombre:'Luis', strApellido:'Sáenz', strEmail:'luis@hotmail.com'}]
//const path =require ('path');
//const rutaDescarga = path.resolve(__dirname, '../../assets/index.html');


app.get('/',(req,res) => {
    const arrUsuarios = arrJsnUsuarios;
    if (arrUsuarios.length >0) {
        return res.status(200).json({
            ok:true,
            msg:'Se recibieron los usuarios de manera exitosa',
           cont:{ 
                arrUsuarios
            }
        })
    }else{
        return res.status(400).json({
          ok:false,
            msg:'No se encoentraron errores',
           cont:{ 
                arrUsuarios
                
                }
            })
        }
        
  //  return  res.download(rutaDescarga, 'index.html');


    })

    // ejercicio 5
app.post('/',(req,res)=>{
    const body ={ // se crean constante que que 
        strNombre:req.body.strNombre, // req: podemos ingresar datos por body y se encontrará por str nombre
        strApellido:req.body.strApellido,
        strEmail: req.body.strEmail,
        _id: Number(req.body._id)
    }

     
   // const strNombre = {strNombre: req.body.strNombre};
   // const strApellido = {strApellido: req.body.strApellido};
   // const strEmail = {strEmail: req.body.strEmail};
    //const _id = {_id:req.body._id};
    
    //console.log(strNombre,strApellido,strEmail,_id,'Entro al nombre por body')
       const encontroUsuario = arrJsnUsuarios.find(usuario =>  usuario.id == body.id || usuario.strEmail == body.strEmail )
       // console.log(encontroUsuario, 'valor');
       
       if (encontroUsuario) {
            res.status(400).json({
                ok:false,
                msg:'El usuario ya se encuentra registrado',
                cont:{
                    encontroUsuario
                }
            })
            
        }else{

            arrJsnUsuarios.push(body)
            res.status(200).json({
                ok:true,
                msg:'Se recibieron los usuarios de manera exitosa',
               cont:{ 
                    arrJsnUsuarios
                }
            })
            
        }



       console.log(encontroUsuario);

    if (body.strNombre && body.strApellido && body.strEmail && body._id) {
        arrJsnUsuarios.push(body)
        res.status(200).json({
            ok:true,
            msg:'Se registro el usuario de manera correcta',
            cont:{
                arrJsnUsuarios
            }
        })

        
    }else{
       return res.status(400).json({
            ok:false,
            msg:'No se recibió algún o todos los valores requeridos (str nombre, str apellido, str email, _id',
            cont:{
                body
            }
        })

    }
    
})

app.put('/',(req,res) => {
const _idUsuario = parseInt(req.query._idUsuario);

if (_idUsuario) {

    const encontroUsuario = arrJsnUsuarios.find (usuario => usuario._id === _idUsuario);
    if (encontroUsuario) {
       const actualizarUsuario = {_id:_idUsuario,strNombre:req.body.strNombre,strApellido: req.body.strApellido, strEmail: req.bodu.strEmail } 

       const filtrarUsuario = arrJsnUsuarios.filter(usuario => usuario._id != _idUsuario)

       arrJsnUsuarios = filtrarUsuario;
       arrJsnUsuarios.push(actualizarUsuario);

       return res.status(200).jsaon ({
        ok: true,
        msg:'El usuario se actualizó de manera exitosa',
        cont:{
            actualizarUsuario

        }

       })
    }else{
        return res.status(400).json({
            ok: false,
            msg: `El usuario con el _id:${_idUsuario}, no se encuentra registrado en la base de datos`,
            cont:{
                _idUsuario
    
            }
    
        })

    }
    
    
}else{

    return res.status(400).json({
        ok: false,
        msg: 'El indenfiticador del usuario no existe',
        cont:{
            _idUsuario

        }

    })
}


})


app.delete ('/',(req,res)=> {
const _idUsuario = req.query._idUsuario;

if (!_idUsuario) {
    return res.status(400).json ({
        ok:false,
        msg : 'No se recibio un identificador de usuario',
        cont: {

            _idUsuario
        }

      })
    }
   const encontroUsuario = arrJsnUsuarios.find(usuario => usuario._id == _idUsuario)
  // console.log("Encontró usuaro")
  if (!encontroUsuario) {
      return res.status(400).json({
        ok:false,
        msg: `No se encontró un usuario con el el _id: ${_idUsuario} en la base de datos`,
        cont:{
            _idUsuario
        }

      })
      
  }
const usuarioFiltrado = arrJsnUsuarios.filter(usuario => usuario._id != _idUsuario);
//console.log(usuarioFiltrado,"*FILTRADO*",arrJsnUsuarios)
arrJsnUsuarios = usuarioFiltrado;

return res.status(200).json({
    ok:true,
    msg:`Se eliminó el usuario de manera exitosa`,
    cont:{
            encontroUsuario
    }

})

})


module.exports = app;