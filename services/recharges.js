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
// Aprobar NOVA 
async function approveRecharge(recharges) {  
  if(recharges.reference == null || recharges.reference == "") {
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
  
    console.log(rows)
    let message = 'No hay una recarga con esa referencia asignada';
    let status = 0
    let user = ""
    if (rows.affectedRows) {
      message = 'Recharge approved successfully';
      status = 1  
      let user = "vmorenozx"
    }
    sendValidatedFunds(user)
    return {
      message, 
      rows,
      status
   };
  }
  
  
}
async function sendValidatedFunds(user) {
  const rows = await db.query(
    `UPDATE users 
    SET saldo = 500
    WHERE username = '${user}'`
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


async function registerNewRecharge(recharges) {
  if(recharges.reference == null || recharges.reference == "" || recharges.bank == "" || recharges.bank == null || recharges.cedula == "" || recharges.cedula == null || recharges.phone == "" || recharges.phone == null) {
    let status = 2
    console.log("recarga vacia");
    console.log(recharges);
    let message = 'Enviaste una recarga vacia';
    return {status, message};
  } else {
    const result = await db.query(
      `INSERT INTO recharges 
      (reference, bank, cedula, phone) 
      VALUES 
      ('${recharges.reference}', '${recharges.bank}', '${recharges.cedula}', '${recharges.phone}')`
    );
  
    let message = 'Error in registering new transaction';
    let status = 0
    if (result.affectedRows) {
      status = 1
      message = 'Transaction registered successsdsdsdfullssy';
      console.log(recharges)
      console.log(result)
      console.log(recharges)
    } else {

    }
    console.log("recarga llena");
    console.log(recharges);
    return {message};
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