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
  
  let transactionUsername = transaction.username
  let transactionDestiny = transaction.destiny
  if(transactionUsername == transactionDestiny) {
    return "No puedes enviar dinero al mismo usuario"
  } else {
    let saldoCheck = await db.query(
      `SELECT saldo FROM users WHERE username = '${transactionUsername}' LIMIT 1` 
    ); 
    console.log(saldoCheck);
    console.log(saldoCheck.saldo);
    // console.log("result[0].saldo");
    console.log("------------------");
    console.log(result[0].saldo);
    console.log("transaction.amount");
    console.log("result2[0].saldo + transaction.amount");
    console.log(result2[0].saldo + transaction.amount);
    console.log("result2[0].saldo + transaction.amount");
    if(saldoCheck[0].saldo < transaction.amount) {
      // return transaction;
      let transactionUsername = transaction.username
      let transactionDestiny = transaction.destiny
      console.log(transaction);
      console.log(transactionUsername);
      console.log(transactionDestiny);
      // return {transactionUsername, transactionDestiny}
      let result = await db.query(
        `SELECT saldo, username FROM users WHERE username = '${transactionUsername}' LIMIT 1` 
      );  
      let result2 = await db.query(
        `SELECT saldo, username FROM users WHERE username = '${transactionDestiny}' LIMIT 1` 
      );
      
      
      let rows = await db.query(
        `UPDATE users 
        SET saldo = '${result2[0].saldo + transaction.amount}'
        WHERE username = '${transactionDestiny}'`
      );

      let montoRestado = await db.query(
        `UPDATE users 
        SET saldo = '${result[0].saldo - transaction.amount}'
        WHERE username = '${transactionUsername}'`
      );
      // let saldoReceptor = result.saldo
      // let transaccionUsername = transactionDestiny
      return {
        rows,
        montoRestado
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
    } else {
      return "Saldo insuficiente"
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