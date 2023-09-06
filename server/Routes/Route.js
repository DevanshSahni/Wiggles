const router = require("express").Router();
const { Login, Register,SecondaryRegister } = require('../Controllers/AuthController')
const { ChangePassword } = require('../Controllers/AuthController')
const { userVerification } = require('../Middlewares/AuthMiddleware')
const { profileData, Data,UpdateProfile  } = require('../Controllers/UserData')
const { addFriend, requestDeclined, requestAccepted ,Friends,removeFriend} = require('../Controllers/Friends')
const { notifications } = require('../Controllers/Friends')
const multer = require("multer")

const storage = multer.diskStorage({})

const upload = multer({storage:storage})


router.post('/',userVerification)
router.post('/login', Login)
router.post('/register', Register)
router.post('/secondaryregister', upload.single("image"), SecondaryRegister)
router.post('/resetPassword', ChangePassword)



router.post("/updateProfile",upload.single("image"),UpdateProfile);
router.get('/data',userVerification,Data)
router.post('/profiledata',userVerification,profileData)



router.post('/addFriend',addFriend)
router.post('/requestaccepted',requestAccepted) 
router.post('/requestdeclined',requestDeclined)
router.get('/notifications',userVerification,notifications)
router.post('/friends',userVerification,Friends)
router.post('/removeFriend',removeFriend)
module.exports = router;
