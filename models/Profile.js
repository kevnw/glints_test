const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    avatar: {
      type: String
    },
    dateJoined: {
      type: Date
    },
    status: {
      type: String
    },
    skills: [String],
    bio: {
      type: String
    },
    social: {
      youtube: {
        type: String,
      },
      twitter: {
        type: String,
      },
      facebook: {
        type: String,
      },
      linkedin: {
        type: String,
      },
      instagram: {
        type: String,
      }, 
      website: {
        type: String
      }
    },
    experiences: [
      {
        title: {
          type: String,
          required:true
        },
        company: {
          type: String,
          required: true
        },
        startDate: {
          type: Date,
          required: true
        },
        endDate: {
          type: Date
        },
        current: {
          type: Boolean,
          default: false
        },
        description: {
          type: String
        }
      }
    ],
    educations: [
      {
        school: {
          type: String, 
          required: true
        },
        degree: {
          type: String,
          required: true
        },
        fieldOfStudy: {
          type: String,
          required: true
        },
        startDate: {
          type: Date,
          required: true
        },
        endDate: {
          type: Date
        },
        current: {
          type: Boolean,
          default: false
        },
        description: {
          type: String
        }
      }
    ]
  }
)

module.exports = mongoose.model('Profile', ProfileSchema)
