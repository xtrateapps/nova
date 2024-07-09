const db = require('./db');
const helper = require('../helper');
const config = require('../config');

// ----------------------------------------------------------------------------------
// Super Admin function
async function getAllRecharges(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    "SELECT * FROM recharges"
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};
  return {
    data,
    meta
  }
}
// ---------------------------------------------------------------------------------
// Validar recarga a traves de numero de refencia, para pago movil / Luego invocar y sumar novas
async function getAllRechargesByReference(recharge) {
  const rows = await db.query(
    `SELECT * FROM recharges WHERE reference = ${recharge.reference}`
  );
  let message = 'Ningun pago movil conicide con la referencia';
  let status = 0;
  if (rows.length > 0) {
    message = 'Pago movil encontrado';
    status = 1;
  } else {
    message = 'Pago movil no encontrado';
    status = 0;
    rows = {}
  }
  return {
    message, 
    rows,
    status
  };
}
// Registra una recarga de Nova
async function registerNewRecharge(recharges) {
  const rows = await db.query(
    `SELECT * FROM recharges WHERE reference = '${recharges.reference}'`
  );
  // return rows.length;
  
  if(rows.length > 0) {
      return {
        "message": "El numero de referencia de esta recarga ya ha sido utilizada"
      }
      
  } else {
    if(recharges.reference == null || recharges.reference == "" || recharges.username_destiny == null || recharges.username_destiny == "" || recharges.bank == "" || recharges.bank == null || recharges.cedula == "" || recharges.cedula == null || recharges.phone == "" || recharges.phone == null) {
      let status = 2
      console.log("recarga vacia");
      console.log(recharges);
      let message = 'Enviaste una recarga vacia';
      return {status, message};
    } else {
      const result = await db.query(
        `INSERT INTO recharges 
        (reference, bank, cedula, phone, username_destiny, send_amount, approve) 
        VALUES 
        ('${recharges.reference}', '${recharges.bank}', '${recharges.cedula}', '${recharges.phone}', '${recharges.username_destiny}', '${recharges.send_amount}', false)`
      );
    
      let message = 'Error in registering new recharges';
      let status = 0
      if (result.affectedRows) {
        status = 1
        message = 'Transaction registered successsdsdsdfullssy';
        console.log(recharges)
        console.log(result)
        console.log(recharges)
        console.log("recarga llena");
      } else {
        console.log("recarga nollena");
      }
      // console.log(recharges);
      return {message};
    }
  }
  
  
}
// Aprobar NOVA 
async function approveRecharge(recharges) {  
  if(recharges.reference == null || recharges.reference == "", recharges.username_destiny == null || recharges.username_destiny  == "") {
    let message = 'Objeto null';
    let rows = {};
    let status = {};
    return {
      message, 
      rows,
      status
   };
  } else {
    const rows = await db.query(
      `UPDATE recharges 
      SET approve = true
      WHERE reference = '${recharges.reference}'`
    );

    const amountToRecharge = await db.query(
      `SELECT send_amount 
      FROM recharges
      WHERE reference = '${recharges.reference}'`
    );
  
    console.log(rows)
    console.log(amountToRecharge)
    let message = 'No hay una recarga con esa referencia asignada';
    let status = 0
    let user = ""
    // Antes de esto hay que hacer un select a la recarga ya aprovada y de ali sacar los fondos, pero pa la otra vuelta
    let validatedFundsToSend = {
        "reference" : `${recharges.reference}`,
        "username_destiny": `${recharges.username_destiny}`,
        "send_amount": `${amountToRecharge}`
    }
    
    if (rows.affectedRows) {
      message = 'Recharge approved successfully';
      status = 1  
      user = recharges.username_destiny
      send_amount = recharges.send_amount
      sendValidatedFunds(user, amountToRecharge)
    }
    return {
      message, 
      rows,
      status
   };
  }
  
  
}
async function sendValidatedFunds(user, send_amount) {
  const userSelected = await db.query(
    `SELECT username FROM users WHERE username = '${user[0]}'`
  )
  console.log(userSelected);
  console.log(user[0]);
  console.log(send_amount[0]);
  const rows = await db.query(
    `UPDATE users 
    SET saldo = '${send_amount[0]}'
    WHERE username = '${user[0]}'`
  );
  let status = 0
  let message = " asdasdasd"
  if (rows.affectedRows) {
    message = 'lo hizo un monton de verte';
    status = 1  
    sendValidatedFunds()
    console.log(message);
  }
  return {
    message, 
    rows,
    status
  };
}

// --------------------------------------------------------------------------------------------
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

// -----------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------
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




// async function registerNewRecharge(recharges) {
//     const result = await db.query(
//       `INSERT INTO recharges 
//       (reference, bank, cedula, phone) 
//       VALUES 
//       ('${recharges.reference}', '${recharges.bank}', '${recharges.cedula}', '${recharges.phone}')`
//     );
  
//     let message = 'Error in registering new transaction';
  
//     if (result.affectedRows) {
//       message = 'Transaction registered successfully';
//     }
  
//     return {message};
//   }

module.exports = {
  getAllRecharges,
  getMultiple,
  registerNewRecharge,
  approveRecharge,
  getAllRechargesByReference,
  sendValidatedFunds
}