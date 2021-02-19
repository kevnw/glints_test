const Profile = require('../models/Profile');
const avatar = require('../middleware/avatar');
const { cloudinary } = require('../config/cloudinary');

const {
  handleError,
  handleSuccess,
  buildErrObject,
  buildSuccObject,
} = require('../middleware/utils');

const userId = '602e4ce475258113ea91c82e';
/*********************
 * Private functions *
 *********************/

/* Finds all post written by that user */
const findAllPost = async () => {
  return new Promise((resolve, reject) => {
    Post.find()
      .select('_id text title author avatar comments')
      .lean()
      .then((postList) => resolve(postList))
      .catch((err) => reject(buildErrObject(422, err.message)));
  });
};

/* Finds user by id */
const findUserById = async (id) => {
  return new Promise((resolve, reject) => {
    User.findOne({ _id: id })
      .select('_id name avatar')
      .then((user) => {
        if (!user) {
          reject(buildErrObject(422, 'User does not exist'));
        } else {
          resolve(user); // returns mongoose object
        }
      })
      .catch((err) => reject(buildErrObject(422, err.message)));
  });
};

/* Finds profile by user id */
const findProfileByUserId = async (userId) => {
  return new Promise((resolve, reject) => {
    Profile.findOne({ _id: userId })
      .then((profile) => {
        if (!profile) {
          reject(buildErrObject(422, 'Profile does not exist'));
        } else {
          resolve(profile); // returns mongoose object
        }
      })
      .catch((err) => reject(buildErrObject(422, err.message)));
  });
};

/********************
 * Public functions *
 ********************/

exports.editProfile = async (req, res) => {
  try {
    const newProfile = req.body.profile;
    let splittedSkills = [];
    if (newProfile.skills) {
      splittedSkills = newProfile.skills.split(',').map((item) => item.trim());
      newProfile.skills = splittedSkills;
    }

    newProfile.skills = splittedSkills;
    const profile = await Profile.findOneAndUpdate(
      {
        user: req.body._id,
      },
      newProfile,
      { new: true }
    );

    handleSuccess(res, profile);
  } catch (err) {
    handleError(res, buildErrObject(422, err.message));
  }
};

exports.editName = async (req, res) => {
  try {
    const newName = req.body.name;
    const profile = await findProfileByUserId(userId);

    profile.avatar = avatar.generateAvatarUrl(newName);
    profile.name = newName;
    profile.save();

    handleSuccess(res, profile);
  } catch (err) {
    handleError(res, buildErrObject(422, err.message));
  }
};

exports.getProfile = async (req, res) => {
  try {
    const profile = await findProfileByUserId(userId);

    handleSuccess(res, profile);
  } catch (err) {
    handleError(res, buildErrObject(422, err.message));
  }
};

exports.addExperience = async (req, res) => {
  try {
    console.log("masuk addEXperience")
    const profile = await findProfileByUserId(userId);

    console.log(req.body.description == "")
    let experience = {
        title: req.body.title,
        company: req.body.company,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        current: req.body.current
    }

    if (req.body.description != "") {
      experience["description"] = req.body.description;
    }

    profile.experiences.unshift(experience);
    profile.save();
    handleSuccess(res, profile);
  } catch (err) {
    handleError(res, buildErrObject(422, err.message));
  }
};

exports.deleteExperience = async (req, res) => {
  try {
    const profile = await findProfileByUserId(userId);
    const experienceId = req.params.experienceId;

    const temp = [];
    for (i = 0; i < profile.experiences.length; i++) {
      if (profile.experiences[i]._id != experienceId) {
        temp.push(profile.experiences[i]);
      }
    }

    profile.experiences = temp;
    profile.save();
    handleSuccess(res, profile);
  } catch (err) {
    handleError(res, buildErrObject(422, err.message));
  }
};

exports.addEducation = async (req, res) => {
  try {
    const profile = await findProfileByUserId(userId);

    var education = {
        school: req.body.school,
        degree: req.body.degree,
        fieldOfStudy: req.body.fieldOfStudy,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        current: req.body.current
    }

    if (req.body.description != "") {
      education["description"] = req.body.description
    }

    profile.educations.unshift(education);
    profile.save();
    handleSuccess(res, profile);
  } catch (err) {
    handleError(res, buildErrObject(422, err.message));
  }
};

exports.deleteEducation = async (req, res) => {
  try {
    const profile = await findProfileByUserId(userId);
    const educationId = req.params.educationId;
    const temp = [];
    for (i = 0; i < profile.educations.length; i++) {
      if (profile.educations[i] != null) {
        if (profile.educations[i]._id != educationId) {
          temp.push(profile.educations[i]);
        }
      }
    }

    profile.educations = temp;
    profile.save();
    handleSuccess(res, profile);
  } catch (err) {
    handleError(res, buildErrObject(422, err.message));
  }
};

exports.createProfile = async (req, res) => {
  try {
    const profile = new Profile({
      name: req.body.name,
      avatar: req.body.avatar,
      dateJoined: Date.now(),
    });

    profile.save((err, item) => {
      if (err) handleError(res, buildErrObject(422, err.message));
      handleSuccess(res, item);
    });
  } catch (err) {
    handleError(res, buildErrObject(422, err.message));
  }
};

exports.uploadProfilePicture = async (req, res) => {
  try {
    const fileStr = req.body.data;
    const profile = await findProfileByUserId(userId);
    const uploadedResponse = await cloudinary.uploader.upload(fileStr.data);

    const pictureUrl = uploadedResponse.secure_url;
    profile.avatar = pictureUrl;
    profile.save();
    handleSuccess(res, profile);
  } catch (err) {
    handleError(res, buildErrObject(422, err.message));
  }
};
