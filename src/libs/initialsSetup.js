import role from '../models/role.js'

export const createRoles = async ()=>{
  try {
    const contar = await role.estimatedDocumentCount()
    if (contar > 0) return

    const values = await Promise.all([
      new role({name:"cliente"}).save(),
      new role({name:"mesero"}).save(),
      new role({name:"admin"}).save(),
      new role({name:"superAdmin"}).save()
    ])
    console.log(values);
  } catch (error) {
    console.log('La creacion de usuarios por defecto fallo ',error);
  }
}