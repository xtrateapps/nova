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

async function registerNewRecharge(recharges) {
  const result = await db.query(
    `INSERT INTO recharges 
    (reference, bank, cedula, phone) 
    VALUES 
    ('${recharges.reference}', '${recharges.bank}', '${recharges.cedula}', '${recharges.phone}')`
  );

  let message = 'Error in registering new transaction';

  if (result.affectedRows) {
    message = 'Transaction registered successfully';
  }

  return {message};
}

async function registerNewRecharge(recharges) {
    const result = await db.query(
      `INSERT INTO recharges 
      (reference, bank, cedula, phone) 
      VALUES 
      ('${recharges.reference}', '${recharges.bank}', '${recharges.cedula}', '${recharges.phone}')`
    );
  
    let message = 'Error in registering new transaction';
  
    if (result.affectedRows) {
      message = 'Transaction registered successfully';
    }
  
    return {message};
  }

module.exports = {
  getMultiple,
  registerNewRecharge
}