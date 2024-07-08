// --------------------- NOVA ------------------------------ //
const express = require("express");
const router = express.Router();
// Transaciones - Recargas
// Enviar Transaccion
// ----------------- Servicios ---------------------------------
const transactions = require('../services/transactions');
const recharges = require('../services/recharges');
const users =  require('../services/users');
// ----------------- Modelos -----------------------------------
const transactionModel = require('../model/transactions');
const userModel = require('../model/user.js');
// Routes - con su funcionalidad lista
// Registrar nuevo usuario
router.post('/register/new-user', async (req, res) => {
    try {
        res.json(await users.registerNewUsers(req.body));
    } catch (err) {
        res.json({
            "message": "Ya hay un usuario registrado con ese Email"
        }).status(400);
        console.error(`Error while creating new user mysql`, err.message);
    }
})
// ---------------- Registrar nueva referencia ------------------
router.post('/rx/registerNewReference', async function(req, res) {
    try {
      res.json(await recharges.registerNewRecharge(req.body));    
    } catch (err) {
      console.error(`Error while registering a new recharge operation`, err.message);
    }
});
// Aprobar Recargas
router.post('/rx/approve', async function(req, res) {   
    try {
      res.json(await recharges.approveRecharge(req.body));
    } catch (err) {
        let messagge = err.message
        res.json({
            "messagge": messagge,
            "status": 2 
        }
    );
      console.error(`Error while approving recharge`, err.message);
    }
});
// Nueva transferencia
router.post('/tx/new', async function(req, res) {
    try {
      res.json(await transactions.registerNewTransaction(req.body));
    } catch (err) {
      console.error(`Error while creating transacction`, err.message);
    }
});


// -----------------------------------------------------------------



// Aprobar Recargas
router.post('/rx/getByReference', async function(req, res) {
    try {
      res.json(await recharges.getAllRechargesByReference(req.body));   
    } catch (err) {
      console.error(`Error while getting the referenced recharge (mysql)`, err.message);
      res.json({
        "message": "",
        "rows": [
            {
                
            }
        ],
        status: 0
      });   
    }
});
// 
router.post('/rx/getByReference', async function(req, res) {
    try {
      res.json(await recharges.getAllRechargesByReference(req.body));   
    } catch (err) {
      console.error(`Error while getting the referenced recharge (mysql)`, err.message);
      res.json({
        "message": "",
        "rows": [
            {
                
            }
        ],
        status: 0
      });   
    }
});
// ---------------------------------------------------------------------------------
// TRAE TODAS LAS RECARGAS ----- ESTE METODO LO VEO PENSADO COOMO PARA EL ADMINISTRADOR O 
// LA PERSONA ENCARGADA DE LLEVAR LAS RECARGAS
// SERIA COMO UN TIPO DE USUARIO EXTRA EN UN UPDATE A ESTE METODO
router.get('/rx', async function(req, res) {
    try {
      res.json(await recharges.getAllRecharges(req.body));   
    } catch (err) {
      console.error(`Error while getting all recharges (mysql)`, err.message);
    }
});
//  Recharge por referencias






// 
// Aprobar Recargas
router.get('/', async function(req, res) {
    try {
      res.json(await recharges.approveRecharge(req.body));
    } catch (err) {
      console.error(`Error inside of the mysql connector`, err.message);
    }
});
// ----------------------------------------------------------------------------------

router.get('/tx/getAll', async function(req, res) {
    try {
      res.json(await transactions.getMultiple(req.body));   
    } catch (err) {
      console.error(`Error while creating hhhhhhh language`, err.message);
    }
});

router.post('/tx/sendFunds', async function(req, res) {
    try {
      res.json(await transactions.sendFunds(req.body));   
    } catch (err) {
      console.error(`Error sending funds`, err.message);
    }
});

router.post('/user/data', async function(req, res) {
    try {
        res.json(await users.getUserByEmail(req.body));   
    } catch (err) {
        console.error(`Error while geting user`, err.message);
    }
});

// router.get('/user/data', async function(req, res) {
//     try {
//         res.json(await users.getUserByEmail(req.body));   
//     } catch (err) {
//         console.error(`Error while geting user`, err.message);
//     }  
// });

// router.get('/user/data', async function(req, res) {
//     try {
//         res.json(await users.getUserByEmail(req.body));   
//     } catch (err) {
//         console.error(`Error while geting user`, err.message);
//     }  
// });

// -------------------------------------------------------------------------------- //


router.post('/rx/registerNewReference', async function(req, res) {
    try {
      res.json(await recharges.registerNewRecharge(req.body));   
    } catch (err) {
      console.error(`Error while registering a new recharge operation`, err.message);
    }
});

//   -----------------------------------------------------------------------------  // 
// Usuarios + Creacion de Wallets - Recargas de Wallet


router.post('/login', async (req, res) => {
    // const newUserData = new userModel({
    //     name: req.body.name,
    //     author: req.body.author,
    //     username: req.body.username,
    //     bio: req.body.bio,
    //     wallet: Math.floor(Math.random() * 10000000888888888800),
    //     created_at: req.body.created_at,
    //     updated_at: req.body.updated_at
    // })
    try {
        res.json(await users.loginUser(req.body));
    } catch (err) {
        console.error(`Error al iniciar sesion`, err.message);
    }

})
//  ------------------------------------------------------------------------------- //




router.get('/usersList', function(req, res) {
    var allUser = userModel.find()
    res.status(200).json(allUser);  
});






const mangaModel = require('../model/manga.js');
const gameModel = require('../model/game.js');
const consoleModel = require('../model/console.js');
const walletModel = require('../model/wallets.js');
const fineModel = require('../model/fine.js');
const user = require("../model/user.js");

router.post('/getall/new-user', async (req, res) => {
    
    const newUserData = new userModel({
        name: req.body.name,
        author: req.body.author,
        username: req.body.username,
        bio: req.body.bio,
        created_at: req.body.created_at,
        updated_at: req.body.updated_at
    })

    try {
        const newUserDataToSave = await newUserData.save();
        res.status(200).json(newUserDataToSave)
    } catch (error) {
        res.status(400).json({message:  error.message })
        // res.status(400).json({message: error.message})
    }
})

router.post('/post', async (req, res) => {
    console.log("wtffffffffffffff");
    console.log(req.body);
    
    const newMangaData = new mangaModel({
        name: req.body.name,
        author: req.body.author
    })
    try {
        const newMangaDataToSave = await newMangaData.save();
        res.status(200).json(newMangaDataToSave)
    } catch (error) {
        res.status(400).json({message:  error.message })
        // res.status(400).json({message: error.message})
    }
})
router.post('/game/add-title', async (req, res) => {
    console.log("wtffffffffffffff");
    console.log(req.body);
    const newGameData = new gameModel({
        title: req.body.title,
        image: req.body.image
    })
    try {
        const newGameDataToSave = await newGameData.save();
        res.status(200).json(newGameDataToSave)
    } catch (error) {
        res.status(400).json({message:  error.message })
        // res.status(400).json({message: error.message})
    }
})

router.get('/getAll', async (req, res) => {
    // res.send('Get All API');
    try {
        const allMangas = await mangaModel.find();
        res.status(200).json(allMangas)
    } catch (error) {
        res.status(400).json({message:  error.message })
    }
})

router.get('/getOne/:id', (req, res) => {
    res.send('Get By ID API')
})

router.patch('/update/:id', (req, res) => {
    res.send('Update by ID API')
})

router.delete('/delete/:id', (req, res) => {
    res.send('Deleted by ID API')
})

router.post('/user/register', (req, res) => {
    res.send('aqui se supone va a registrar el usuario')
})

router.post('/user/login', (req, res) => {
    res.send('aqui hago login')
})

router.post('/fine/register', async (req, res) => {
    console.log(req.body);
    const newFineData = new fineModel({
        name: req.body.name,
        author: req.body.author,
        article: req.body.article,
        plate: req.body.plate,
        driverName: req.body.driverName,
        copName: req.body.copName,
        copDni: req.body.copDni,
        driverDni: req.body.driverDni,
        carModel: req.body.carModel,
        carYear: req.body.carYear,
        location: req.body.location
    })
    try {
        const newFineDataToSave = await newFineData.save();
        res.status(200).json(newFineDataToSave)
        console.log("si funciono");
    } catch (error) {
        console.log("no funciono");
        res.status(400).json({message:  error.message })
        // res.status(400).json({message: error.message})
    }
})
router.post('`/fine/pay`', (req, res) => {
    res.send('multa pagada')
})
router.post('/fine/update', (req, res) =>{
    res.send('multa actualizada')
})
module.exports = router;