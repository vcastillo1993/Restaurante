import user from '../../models/user.js'
import role from '../../models/role.js'
import mongoose from 'mongoose';

/* Listar todos los usuarios */
export const listAllUser = async (req, res) => {
  try {
    const users = await user.find()
    console.log(users);
    res.status(200).json(users)
  } catch (error) {
    console.log('ERROR DE CONSULTA A USUARIO ', error)
    res.status(400).json(error)
  }
}

/* listar usuario por ID */
export const listUserId = async (req, res) => {
  try {
    if(!mongoose.Types.ObjectId.isValid(req.params.userId)){
      console.log('Este ID no existe en e sistema')
      res.status(403).json('Este ID no existe en e sistema')
    }else{
      const User = await user.findById(req.params.userId)
      console.log('usuario :', User);
      res.status(200).json(User)
    }
  } catch (error) {
    console.log('ERROR DE CONSULTA ', error)
    res.status(400).json(error)
  }
}

/* funcion para crear usuararios desde un rol superAdmin */
export const createUser = async (req, res) => {
  try {
    let statu = true
    const { nameUser, email, password, roles } = req.body
    const newUser = new user({
      nameUser,
      email,
      password: await user.encryptPassword(password),
      status: statu,
      role: roles
    })
    /* si no existe un rol asignado por el usuario */
    if (roles) {
      const foundRole = await role.find({ name: { $in: roles } })
      newUser.role = foundRole.map(rol => rol._id)
    } else {
      /* entonces asignamos el rol user por defecto al momento del registro */
      const rol = await role.findOne({ name: 'cliente' })
      newUser.role = rol
    }

    const saveUser = await newUser.save()
    res.status(200).json(saveUser)

  } catch (error) {
    console.log('ERROR DE CREACION DE USUARIO', error)
    res.status(400).json(error)
  }
}

//funcion para modificar el rol del usuario
export const updateRolUser = async (req, res) => {
  try {
    const { rol } = req.body
    console.log(rol);
    if (rol === "cliente" || rol === "mesero") {
      const newRole = await role.findOne({ name: { $in: rol } })
      //const usu = await user.findById(req.params.userId)
      console.log('STATUS USUARIO ACTUALIZADO', newRole._id)
      const updateRoluser = await user.findByIdAndUpdate(req.params.userId, { role: newRole._id }, {
        new: true
      })
      console.log('valor modificado', updateRoluser);
    } else {
      console.log('valor no aceptado : rol no existente')
    }
    res.status(200).json(updateRoluser)
  } catch (error) {
    console.log('ERROR DE MODIFICACION DE USUARIO ', error)
    res.status(400).json(error)
  }
}

/* esta funcion es exclusiva para el superAdmin  */
export const updateRolSuperAdmin = async (req, res) => {
  try {
    const { rol } = req.body
    console.log(rol);
    if (rol === "cliente" || rol === "mesero" || rol === "admin") {
      const newRole = await role.findOne({ name: { $in: rol } })
      //const usu = await user.findById(req.params.userId)
      console.log('STATUS USUARIO ACTUALIZADO', newRole._id)
      const updateRoluser = await user.findByIdAndUpdate(req.params.userId, { role: newRole._id }, {
        new: true
      })
      console.log('valor modificado', updateRoluser);
    } else {
      console.log('valor no aceptado : rol no existente')
    }
  } catch (error) {
    console.log('ERROR DE MODIFICACION DE USUARIO ', error)
    res.status(400).json(error)
  }
}

export const updateStatuUser = async (req, res) => {
  try {
    const { statu } = req.body
    if (statu === "activo") {
      const updateStatu = await user.findByIdAndUpdate(req.params.userId, { status: true }, {
        new: true
      })
      console.log(updateStatu);
    } else if (statu === "innactivo") {
      const updateStatu = await user.findByIdAndUpdate(req.params.userId, { status: false }, {
        new: true
      })
      console.log(updateStatu);
    } else {
      console.log("estado fuera no existente : no admitido");
    }
    res.status(200).json('estado del usuario modificado')
  } catch (error) {
    console.log('estado no admitido ', error)
    res.status(400).json(error)
  }
}

/* funcion especial para el superAdmin */
export const deleteUser = async (req, res) => {
  try {
    await user.findByIdAndDelete(req.params.userId)
    res.status(200).json('usuario eliminado')
  } catch (error) {
    console.log('ERROR DE ELIMINACION DE USUARIO ', error)
    res.status(400).json('Puede que no estes autorizado o el usuario no exista ')
  }
}
