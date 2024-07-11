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
S
  return {
    data,
    meta
  }
}

async function registerNewTransaction(transaction) {
  // const result = await db.query(
  //   `INSERT INTO transactions 
  //   (reference, date, payment_number, bank, account_number, amount) 
  //   VALUES 
  //   ('${transaction.reference}', '${transaction.date}', '${transaction.payment_number}', '${transaction.bank}', '${transaction.account_number}', '${transaction.amount}')`
  // );

  const result = await db.query(
    `SELECT * FROM transactons WHERE reference = ${transaction.reference}`
    // `INSERT INTO transactions 
    // (reference, date, payment_number, bank, account_number, amount) 
    // VALUES 
    // ('${transaction.reference}', '${transaction.date}', '${transaction.payment_number}', '${transaction.bank}', '${transaction.account_number}', '${transaction.amount}')`
  );

  let message = 'Error in registering new transaction';

  if (result.affectedRows) {
    message = 'Transaction registered successfully';
    
  }

  return {message};
}

async function sendDirectFundsFromOneUserToAnother(transaction) {
  // return transaction;
  console.log(transaction);
  let result = await db.query(
    `SELECT saldo, username FROM users WHERE username = '${transaction.username}' LIMIT 1` 
  );
  let result2 = await db.query(
    `SELECT saldo, username FROM users WHERE username = '${transaction.destiny}' LIMIT 1` 
  );
  if(result[0].username == result2[0].destiny) {
    return "No puedes enviar el mismo username"
  } else {
    let saldoReceptor = result[0].saldo
    
    let saldoEmisor = result2[0].saldo
    let transaccionUsername = transaction.destiny
    return {
      transaccionUsername,
      saldoReceptor,
      saldoEmisor
    }

    // let update1 = await db.query(
    //   `SELECT saldo, username FROM users WHERE username = '${transaction.username}' LIMIT 1` 
    // );
    // let update2 = await db.query(
    //   `SELECT saldo, username FROM users WHERE username = '${userToReceiveMoney.username}' LIMIT 1` 
    // );
    // let message = 'Datos no encontrados';
    console.log(result);
    console.log(message);
    console.log(transaction);
    let code = 1
    if (result.length > 0) {
      message = 'Datos de usuario';
      code = 0
      result = result[0];
      console.log(result[0]);
    }
  }
  
}
// async function sendDirectFundsFromOneUserToAnother(transaction) {
//   console.log(result, message, transaction)
//   return {
//     result,
//     message,
//     code
//   }
//   // const result = await db.query(
//   //   `INSERT INTO transactions 
//   //   (reference, date, payment_number, bank, account_number, amount) 
//   //   VALUES 
//   //   ('${transaction.reference}', '${transaction.date}', '${transaction.payment_number}', '${transaction.bank}', '${transaction.account_number}', '${transaction.amount}')`
//   // );

//   // const result = await db.query(
//   //   `SELECT * FROM transactons WHERE reference = ${transaction.reference}`
//   //   // `INSERT INTO transactions 
//   //   // (reference, date, payment_number, bank, account_number, amount) 
//   //   // VALUES 
//   //   // ('${transaction.reference}', '${transaction.date}', '${transaction.payment_number}', '${transaction.bank}', '${transaction.account_number}', '${transaction.amount}')`
//   // );

//   // let message = 'Error in registering new transaction';

//   // if (result.affectedRows) {
//   //   message = 'Transaction registered successfully';
    
//   // }

//   // return {message};
// }

async function  addNewFundsAterRegisteringNewTransaction(transaction) {
  const result = await db.query("SELECT * , (SELECT sum(saldo)  FROM users WHERE email = 'vmorenozx@gmail.com') as `items_total` FROM transactions WHERE account_number = '')");
  let message = 'Error in registering new transaction';
  if (result.affectedRows) {
    message = 'Transaction registered successfully';
  }
  return {message};
}

module.exports = {
  getMultiple,
  registerNewTransaction,
  sendDirectFundsFromOneUserToAnother 
}