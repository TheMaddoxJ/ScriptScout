const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

// signup user ('/api/users)
router.post('/', async (req, res) => {
    try {
        const dbUserData = await User.create(req.body);
        req.session.save(() => {
            req.session.name = dbUserData.name;
            req.session.email = dbUserData.email;
            req.session.password = dbUserData.password;
            req.session.loggedIn = true;
            res.status(201).json({ message: `Account created for ${dbUserData.name}`});
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// login user ('/api/users/login')
router.post('/login', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: {email: req.body.email}
        });
        if (!dbUserData) {
            res.status(400).json({ message: `User id ${req.body.email} is not valid.` });
            return;
        }
        // check pw
        const pwValidated = await dbUserData.checkPassword(req.body.password)
        if (!pwValidated) {
            res.status(400).json({ message: "Incorrect password!" });
            return;
        }
        // create session and send response back
        req.session.save(() => {
            req.session.name = dbUserData.name;
            req.session.email = dbUserData.email;
            req.session.loggedIn = true;        
        //send response to client
        res.status(200).json({ message: "You are logged in!" });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// logout user ('/api/users/logout')
router.post('/logout', withAuth, async (req, res) => {
    try {
        if (req.session.loggedIn) {
            const dbUserData = await req.session.destroy(() => {
                res.status(204).end();
            });
        } else {
            res.status(404).end();
        }
    } catch {
        res.status(400).end();
    }
});

module.exports = router;