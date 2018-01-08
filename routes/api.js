const router = require('express').Router();
const hasher = require('../modules/hasher');
const db = require('../modules/db');
const multer = require('multer');
const path = require('path');
const uidSafe = require('uid-safe')
const s3 = require('../s3')

//=========================Multer
var diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        // callback(null, __dirname + '/uploads');
        callback(null, path.join(path.dirname(__dirname), "uploads") )
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});
var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});
//======================Post request insert into Network Table
router.post('/register', (req, res) => {

    const {firstName, lastName, email, password} = req.body;
    return hasher.hashPassword(password)
        .then(hashPassword => {

        return db.createUser(firstName, lastName, email, hashPassword)
            .then(registeredUser => {
            req.session.user = {
                id: registeredUser.id,
                firstName: registeredUser.firstName,
                lastName: registeredUser.lastName,
                email: registeredUser.email
            }
            return res.json(registeredUser)
        })
    }).catch(err => console.log(err.response));
});
//========================login
router.post('/login', (req, res) => {
    var email = req.body.email;
    var loginPassword = req.body.password;
    return db.readUserLoginData(email)
        .then((userData) => {
            if(!userData.email) {
                res.redirect('/')
            } else {
                const hashedPassword = userData.password;
                return hasher.checkPassword(loginPassword, hashedPassword)
                .then(doesMatch => {
                    if (doesMatch) {
                        req.session.user = userData;
                    }
                    res.redirect('/')
                })
            }
        }).catch(err => console.log('api.js - router.post(/login) - error: ', err));
})
//=======================Displaying the Profile Picture/Getting back user INFO.
router.get('/get-profile-info', (req, res) => {

    const userId = req.session.user.id
    db.getProfileInfo(userId)
        .then(userInfo => {
            console.log(userInfo);
            let url = "https://s3.amazonaws.com/bark-board/";

            if (!userInfo.pic) {
                userInfo.pic = "https://cdn.dribbble.com/users/27875/screenshots/3076969/dog_800x600-dribble.png"
            } else {
                userInfo.pic = url + userInfo.pic
            };

            res.json({
                userInfo,
                success: true
            })
        })
        .catch(err => console.log(err));
})
//================================Getting Friend Status to determine Button
router.get(`/get-other-user-info/:id`, (req, res) => {

    var currentUser = req.session.user.id
    var otherUser = parseInt(req.params.id)
    // console.log('these users, first From then TO', fromUserId, toUserId);
    db.getProfileInfo(req.params.id)
        .then((userInfo) => {
            userInfo.pic = "https://s3.amazonaws.com/bark-board/" + userInfo.pic
            console.log('current log consoling userInfo: ', userInfo);

            db.getFriendStatus( currentUser, otherUser )
            .then((results) => {
                // console.log('TRYING CASPS LOCKS', results);
                var fromUserId = results && results.fromuserid;
                var toUserId = results && results.touserid;
                var friendStatus = results && results.status;
                console.log('INSIDE API.JS AND SUCH FOR USERINFO: ',userInfo);
                console.log('New friend status log', friendStatus);
                if(friendStatus == null || friendStatus.length == 0 ) {
                    console.log('there is NO NO NO NO FRIENDSHIP');
                    res.json({
                        success: true,
                        userInfo,
                        fromUserId,
                        toUserId
                    })
                } else {
                    console.log('friendship IS HEREERERE', friendStatus);
                        res.json({
                            success: true,
                            friendStatus,
                            userInfo,
                            fromUserId,
                            toUserId
                        })
                }
            })
        })
})
//==============================Post Request to Upload Profile Photo
router.post('/upload-profile-photo', uploader.single('file'), (req, res) => {
    s3.upload(req.file)
        .then( () => db.uploadProfilePhoto(req.file.filename, req.session.user.id))
            .then(() => {
                // req.session.user.pic = req.file.filename
                var picUrl = "https://s3.amazonaws.com/bark-board/" + req.file.filename

                res.json({
                    newPic: picUrl
                })
            })
            .catch(err => console.log('let me know if you get this error buddy',err));
})
//===============================Post request to upload Bio info
router.post('/update-bio', (req, res) => {
    // console.log('this is the thing fuck', req.body);
    // console.log('req.body.bio', req.body.bio);
    // console.log('here is the req one', req);
    var bio = req.body.bio
    var id = req.session.user.id

    db.updateBio(bio, id)
        .then((results) => {
            // console.log('this worked');
            res.json({
                success: true,
                results
            })
        }
    ).catch(err => console.log('this is the error of update bio', err));
})
//================================
// router.get('/change-friendship-status', (req, res) => {
//
// })
//================================Begin Friendship Status POST
router.post('/begin-friendship/:id', (req, res) => {
    var status = "cancel"
    var fromUserId = req.session.user.id
    var toUserId = req.params.id
    db.beginFriendship(status, fromUserId, toUserId)
        .then(() => {
            res.json({ success: true })
        })
})
//================================Accept Friendship Post
router.post('/accept-friendship/:id', (req, res) => {

    var status = "terminate"
    var fromUserId = req.session.user.id
    var toUserId = req.params.id
    // console.log('CHECKING FRIENDSHIP ACCEPT IN API.JS: ', fromUserId, toUserId);
    db.acceptFriendship(status, toUserId, fromUserId)
        .then(() => {
            res.json({ success: true })
        })

})
//===============================Delete Friendship Post
router.post('/delete-friendship/:id', (req, res) => {
    var fromUserId = req.session.user.id
    var toUserId = req.params.id
    db.deleteFriendship( toUserId, fromUserId)
        .then( () => {
            res.json({ success: true })
        })
})
//==================================friendships Relationships
router.get('/get-friends/', (req, res) => {
    // console.log('inside of get friends portion');

    db.getFriends(req.session.user.id)
        .then((results) => {
            // console.log('LOOK AT ME INSTEAD',results[0].pic);

            for (var i = 0; i < results.length; i++) {
                results[i]
                results[i].pic = "https://s3.amazonaws.com/bark-board/" + results[i].pic
            }
            // console.log('LLOOOOOOOOOOOOOOOK AT ME ', results);
            res.json({
                success: true,
                friends: results
            })
        })
        .catch(err => console.log(err));
})
//=============================







router.get('/new-profile-photo', (req, res) => {
    // console.log('router.get new profile photo of api.js');
    res.json({
        newPic: req.session.user.pic
    })
})
//========================== SOCKET io
//=====Module Exports
module.exports = router;
