const ProfileController = require('../controllers/profiles')
const express = require('express')
const router = express.Router()

/*
 * Edit profile route
 */
router.post(
  '/',
  ProfileController.editProfile
)

/*
 * Create profile route
 */
router.post(
  '/create',
  ProfileController.createProfile
)

/*
 * Get profile route
 */
router.get(
  '/',
  ProfileController.getProfile
)

/*
 * Add experience to array route
 */
router.put(
  '/experience/add',
  ProfileController.addExperience
)

/*
 * Delete experience from array route
 */
router.delete(
  '/experience/delete/:experienceId',
  ProfileController.deleteExperience
)

/*
 * Add education to array route
 */
router.put(
  '/education/add',
  ProfileController.addEducation
)

/*
 * Delete education from array route
 */
router.delete(
  '/education/delete/:educationId',
  ProfileController.deleteEducation
)

/*
 * Change profile picture route
 */
router.post(
  '/picture',
  ProfileController.uploadProfilePicture
)

router.post(
    '/changename',
    ProfileController.editName
);

module.exports = router
