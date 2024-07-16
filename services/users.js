const db = require('./db');
const helper = require('../helper');
const config = require('../config');


async function getMultiple(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      "SELECT reference, date, payment_number, bank, account_number, amount FROM transactions"
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};
    return {
      data,
      meta
    }
}

// Registrar nuevo usuario
async function registerNewUsers(user) {
  if(user.email == undefined || user.email == "") {
    console.log("email vacio");
    let message = 'Email vacio';
    let code = 1;
    return {message,code};
  } else {  
    const result = await db.query(
      `INSERT INTO users 
      (name, username, email, email_verified_at, password, saldo, remember_token) 
      VALUES 
      ('${user.name}', '${user.username}', '${user.email}', null, '${user.password}', 0, '${user.remember_token}}')`
    );
    let message = 0
    if (result.affectedRows) {
      message = 'User registered successfully';
      code = 0;
    } else {
      message = 'Error in registering new user';
      code = 1;
    }
    console.log(message,code)
    return {message,code};
  }
  
}

async function getUserByEmail(user) {
  let result = await db.query(
    `SELECT * FROM users WHERE email = '${user.email}' LIMIT 1` 
  );

  let message = 'Datos no encontrados';

  let code = 1

  if (result.length > 0) {
    message = 'Datos de usuario';
    code = 0
    result = result[0];
  }

  console.log(result, message)
  return {
    result,
    message,
    code
  }

}

async function loginUser(user) {
    const result = await db.query(
      `SELECT email, username FROM users WHERE email = '${user.email}' AND password = '${user.password}'` 
    );
    let message = 'Usuario no registrado';
    let code = 1
    if (result.length > 0) {
      message = 'Inicio de Sesion Exitoso';
      code = 0
    } else {
      message = 'Usuario no existe';
      code = 1
    }
    console.log(result, message)
    return {
      result,
      message,
      code
    }
  }



module.exports = {
    getMultiple,
    registerNewUsers,
    loginUser,
    getUserByEmail
}