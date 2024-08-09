const { wavesexchange } = require('ccxt');

const we = new wavesexchange({
    apiKey: '7y2c4JPGcDQkW3MypTkyqwL8vp7tJXpekJmfMqwsZqpG',
    secret: 'HCZYdPP4Bqxv7JN9unxRsLu7G6EE7o94zXNPPrwBec5e',
});
// 

(async () => {
    await we.loadMarkets().then((value) => {
        // console.log(value);
    });
    const currencies = we.currencie
    console.log("currencies");
    const wavesUsdn = we.markets['WAVES/XTN'];
    // console.log(wavesUsdn);
    console.log("wavesUsdn");

    // we.createOrder()

    we.fetchBalance([params = {"currency": "WAVES"}]).then((value) => {
        console.log(value);
    })

    
    // we.fetchDepositAddress("WAVES").then((value) => {
    //     console.log(value);
    // })
    
    // await we.loadMarkets(); // Preload list of markets and currencies

    // const currencies = we.currencies; // Dictionary of currencies
        
    // const symbols = we.symbols; // Dictionary of trading pairs

    // const wavesUsdn = we.markets['WAVES/XTN']; // Get market structure by symbol

}) ()


// We Load Markets

// console.log(we.loadMarkets().then((value) => {
//     console.log(value);
// }));

// ------------------------------------------------

console.log();




// console.log("---------------------------------");

// console.log(loadMarkets);

// console.log("---------------------------------");


// console.log(we.fetchOrderBook('WAVES/XTN').then((value) => {
//     console.log(value);
//     // Expected output: 123
// }));

// console.log(we.loadMarkets('WAVES/XTN'));

// console.log(we.fetchOrderBook('WAVES/XTN'));
