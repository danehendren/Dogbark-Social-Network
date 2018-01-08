const spicedPg = require('spiced-pg')
const config = require('../configs/config.json')
const amazon = config.s3Url
const s3 = require('../s3')
//============================================
if (process.env.DATABASE_URL) {
    dbURL = process.env.DATABASE_URL
} else {
    var info = require('../configs/secrets.json')
    var user = info.username;
    var pass = info.password;
    dbURL = `postgres:${user}:${pass}psql@localhost:5432/network`
}
const db = spicedPg(dbURL)

//============================================Query for retrieving the Email
exports.getUserInfo = function(email) {
    const q =  `SELECT * FROM users WHERE email = $1`
    const params = [ email ]

    db.query(q, params)
    .then(results => {
        res.json(results.rows[0])
    })
}
//============================================Registering user Data
exports.createUser = function(firstName, lastName, email, hashedpassword) {

    const q = `INSERT INTO users (first, last, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING id, first, last, email`

    return db.query(q, [ firstName, lastName, email, hashedpassword ] )
        .then( results => {
            console.log('db.js - fn:createUser - results:  ', results.rows[0] );
            return results.rows[0]
        })
        .catch(err => console.log(err.response));
}


// ===========================================Returning Hashedpassword from Database
exports.hashedPasswordFromDatabase = function(email) {
    const q = `SELECT password FROM users WHERE email = $1`

    db.query(q, [email])
    .then(results => {
        res.json(results.rows[0])
    })
}
//============================================Returning Profile INfo
exports.profileInfo = function() {
    const q = `SELECT * FROM users WHERE id = $1`

    db.query(q)
        .then(results => {
        res.json(results.rows[0])
    })
}
//======================================Read User Email
exports.readUserLoginData = function(email) {
    const q = `SELECT * FROM users WHERE email = $1`

    return db.query(q, [ email ])
        .then(results => results.rows[0])
        .catch(err => console.log(err.response));
}
//========================================Upload Profile Photo

exports.uploadProfilePhoto = function(pic, userId) {
    const q = `UPDATE users SET pic = $1 WHERE id = $2`
    const params = [ pic, userId ]

    return db.query(q, params )
        .then(() => {
            // console.log('inside of the uploadProfilePhoto function query');
        }).catch(err => console.log(err));
}

exports.updateBio = function(bio, userId) {
    const q = `UPDATE users SET bio = $1 WHERE id = $2`
    const params = [ bio, userId ]

    return db.query(q, params)
        .then(() => {
            console.log('inside of the updateBio function inside db.js');
        })
        .catch(err => console.log(err));
}



//==================================Getting Images from S3

exports.getProfileInfo = function(id) {
    const q = `SELECT email, first, last, pic, bio FROM users WHERE id = $1`
    const params = [ id ]
    return db.query( q, params )
            .then((results) => {
                return results.rows[0];
            })
            .catch(err => console.log(err))
}
//===================================================================
exports.getFriendStatus = function(loggedInUserId, otherUserId) {
    console.log('getFriendStatus in db.js log ');
    const q = `SELECT status, fromUserId, toUserId
            FROM friendships
            WHERE (fromUserId = $1 AND toUserId = $2)
            OR (fromUserId = $2 AND toUserId = $1)`
            //just added OR fromUserId and toUserId and now it's showing accept friendship when the user when
            //they click on the 'add friend' (so instantly seeing 'accept friend' when they shouldn't be.)
    const params = [ loggedInUserId, otherUserId ]
    return db.query( q, params )
            .then((results) => {
                console.log('results of results.rows get friend status  ', results.rows[0]);
                if(!results.rows[0]) {
                    return null;
                } else {
                    return results.rows[0]
                }
            })
            .catch(err => console.log(err))
}
//===================================================================
exports.beginFriendship = function(status, fromUserId, toUserId) {
    const q = `INSERT INTO friendships (status, fromUserId, toUserId) VALUES ($1, $2, $3)`
    const params = [status, fromUserId, toUserId]
    return db.query( q, params )
            .then(() => console.log('inside beginfriendship post request, neat'))
            .catch(err => console.log(err));
}

exports.acceptFriendship = function(status, toUserId, fromUserId) {
    console.log('acceptFrienship fn() of db.js ');
    const q = `UPDATE friendships SET status = $1
                WHERE (toUserId = $2 AND fromUserId = $3)
                OR (fromUserId = $2 AND toUserId = $3)`
    const params = [ status, toUserId, fromUserId ]
    return db.query( q, params )
            .then( () => console.log('inside accept friendship post request'))
            .catch(err => console.log(err))
}

exports.deleteFriendship = function( toUserId, fromUserId) {
    const q = `DELETE from friendships
        WHERE (fromUserId = $1 AND toUserId = $2)
        OR (fromUserId = $2 AND toUserId = $1)`
    const params = [ toUserId, fromUserId ]
    return db.query( q, params )
            .then( () => console.log('inside the delete friendship post'))
            .catch(err => console.log(err))
}

exports.toggleFriendshipStatus = function(toUserId, fromUserId) {
    const q = `SELECT status FROM friendships WHERE `
}
//===================================================================
exports.getFriends = function(toUserId) {

    const q = `SELECT users.id, first, last, pic, status
    FROM friendships
    JOIN users
    ON (status = 'cancel' AND toUserId = $1 AND fromUserId = users.id)
    OR (status = 'terminate' AND toUserId = $1 AND fromUserId = users.id)
    OR (status = 'terminate' AND fromUserId = $1 AND toUserId = users.id)`
    const params = [ toUserId ]
        return db.query( q, params )
        .then((results) => {
            console.log('results.rows of getFriends DB.JS');
            return results.rows
        })
}
//==================================Socket io Queries

//this is a thing to update my origin guy.
exports.getUsersByIds = function(arrayOfIds) {
        const query = `SELECT * FROM users WHERE id = ANY($1)`;
        return db.query(query, [arrayOfIds])
            .then( results => results.rows)
            .catch(err => console.log('here is an error in DB.JS Err: ', err))
            //try to add the amazon link in the THEN function here rather than later.
    }
