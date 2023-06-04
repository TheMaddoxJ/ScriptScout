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