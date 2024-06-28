const db = require('./db');
const helper = require('../helper');
const config = require('../config');


async function getMultiple(page = 1){
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

async function registerNewUsers(user) {
  const result = await db.query(
    `INSERT INTO users 
    (name, username, email, email_verified_at, password, saldo, remember_token) 
    VALUES 
    ('${user.name}', '${user.username}', '${user.email}', '${user.email_verified_at}', '${user.password}', '${user.saldo}', '${user.remember_token}}')`
  );

  let message = 'Error in registering new user';
  let code = 1;
  if (result.affectedRows) {
    message = 'Transaction registered successfully';
    code = 0;
  }

  return {message,code};
  console.log(message,code)
}

async function getUserByEmail(user) {
  const result = await db.query(
    `SELECT * FROM users WHERE email = '${user.email}'` 
  );
  let message = 'Datos no encontrados';
  let code = 1
  if (result.length > 0) {
    message = 'Datos de usuario';
    code = 0
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
      `SELECT email FROM users WHERE email = '${user.email}' AND password = '${user.password}'` 
    );
    let message = 'Usuario no registrado';
    let code = 1
    if (result.length > 0) {
      message = 'Inicio de Sesion Exitoso';
      code = 0
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