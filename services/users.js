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
    (name, email, email_verified_at, password, remember_token) 
    VALUES 
    ('${user.name}', '${user.email}', '${user.email_verified_at}', '${user.password}', '${user.remember_token}}')`
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

async function loginUser(user) {
    const result = await db.query(
      `SELECT 1 FROM users WHERE email = '${user.email}'`
    );
    

    
  
    let message = 'Usuario no registrado';
  
    if (result) {
      message = 'Inicio de Sesion Exitoso';
    }
    console.log(result, message)
    return {
      result,
      message
    }
    
  }



module.exports = {
    getMultiple,
    registerNewUsers,
    loginUser
}