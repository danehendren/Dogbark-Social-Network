var bcrypt = require('bcryptjs');
const salt = process.env.BCRYPTSALT || require( '../configs/secrets.json' ).bcryptSalt;

// exports.hashedPasswordFromDatabase = function(email) {
//
// }


// const spicedPg = require('spiced-pg')
//============================================
// if (process.env.DATABASE_URL) {
//     dbURL = process.env.DATABASE_URL
// } else {
//     var info = require('../secrets.json')
//     var user = info.username;
//     var pass = info.password;
//     dbURL = `postgres:${user}:${pass}psql@localhost:5432/network`
// }
// //==========================================
// var db = spicedPg(dbURL);
// //============================================Hashing Passwords and Checking Passwords
module.exports.hashPassword = function(plainTextPassword) {
    // console.log('hasher.js - fn hashPassword', plainTextPassword);
    return new Promise(function(resolve, reject) {
        bcrypt.genSalt(function(err, salt) {
            if (err) {
                return reject(err);
            }
            bcrypt.hash(plainTextPassword, salt, function(err, hash) {
                if (err) {
                    return reject(err);
                }
                console.log(hash);
                resolve(hash);
            });
        });
    });
}
// // ===========================================Checking Hashedpassword and loginPassword
module.exports.checkPassword = function (loginPassword, hashedPassword) {
    console.log('hasher.js - fn checkpassword', hashedPassword);
    return new Promise(function(resolve, reject) {
        bcrypt.compare(loginPassword, hashedPassword, function(err, doesMatch) {
            if (err) {
                reject(err);
            } else {
                resolve(doesMatch);
            }
        });
    });
}
// //============================================Query for retrieving the Email
// exports.getUserInfo = function(email) {
//     const q =  `SELECT * FROM network WHERE email = $1`
//     const params = [ email ]
//
//     db.query(q, params)
//     .then(results => {
//         res.json(results.rows[0])
//     })
// }
// // ===========================================Returning Hashedpassword from Database
// exports.hashedPasswordFromDatabase = function(email) {
//     const q = `SELECT hashedpassword FROM network WHERE email = $1`
//
//     db.query(q, [email])
//     .then(results => {
//         res.json(results.rows[0])
//     })
// }
// //============================================Returning Profile INfo
// exports.profileInfo = function() {
//     const q = `SELECT * FROM network WHERE id = $1`
//
//     db.query(q)
//     .then(results => {
//         res.json(results.rows[0])
//     })
// }
