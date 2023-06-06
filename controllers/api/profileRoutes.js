const router = require('express').Router();
const { Profile } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
    try {
        const profileData = await Profile.create({
            ...req.body, profile_id: req.session.profile_id });
        console.log("Profile is updated!")
        res.status(200).json(profileData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  //update

  router.put("/:id", withAuth, async (req, res) => {
    try {
        const profData = await Profile.update(req.body, {
            where: {
                id: req.params.id,
                profile_id: req.params.id }
          });
        if (!profData[0]) {
            res.status(404).json({ message: "No profile found with this id!" });
            return;
        }
        res.session.save(() => {
          req.session.id = profData.id;
          req.session.title = profData.title;
          req.session.about = profData.about;
          req.session.location = profData.location;
          req.session.projects = profData.projects;
          req.session.loggedIn = true; 
        
        res.status(200).json(profData) });
        } catch (err) {
        res.status(400).json(err);
      }
  });

  router.delete('/:id', withAuth, async (req, res) => {
    try {
      const profData = await Profile.destroy({
        where: {
          id: req.params.id,
          profile_id: req.session.profile_id,
        },
      });
  
      if (!profData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
  
      res.status(200).json(profData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;