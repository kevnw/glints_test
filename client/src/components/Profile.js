import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Overview from './Overview';
import ProfileTop from './ProfileTop';
import BioFormModal from './BioFormModal';
import SkillsFormModal from './SkillsFormModal';
import HeaderFormModal from './HeaderFormModal';
import EducationFormModal from './EducationFormModal';
import ExperienceFormModal from './ExperienceFormModal';
import {
  getProfileById,
  getCurrentProfile,
} from '../actions/profile';

const Profile = ({
  match,
  getProfileById,
  getCurrentProfile,
  profile
}) => {
  useEffect(() => {
    getProfileById('test')
  }, [getProfileById]);

  const [activeTab, setActiveTab] = useState('overview');
  const [isShowingBio, setShowingBio] = useState(false);
  const [isShowingSkills, setShowingSkills] = useState(false);
  const [isShowingHeader, setShowingHeader] = useState(false);
  const [isShowingEducation, setShowingEducation] = useState(false);
  const [isShowingExperience, setShowingExperience] = useState(false);
  const currentProfile = profile.profile;
  const profileLoading = profile.loading;
  const id = match.params.id;
  
  return (
    <Fragment>
      {!currentProfile ||
      profileLoading ||
      (
        <div>
          <div className="container-body">

            <div className="ui stackable grid">
              <div className="twelve wide centered column">
                <ProfileTop
                  profile={currentProfile}
                  setShowingHeader={setShowingHeader}
                />
                <div className="ui secondary pointing menu">
                  <a
                    onClick={() => setActiveTab('overview')}
                    className={`item ${
                      activeTab === 'overview' ? 'active' : ''
                    }`}
                  >
                    Overview
                  </a>
                </div>
                <div className="">
                  <Overview
                    profile={currentProfile}
                    setShowingBio={setShowingBio}
                    setShowingSkills={setShowingSkills}
                    setShowingEducation={setShowingEducation}
                    setShowingExperience={setShowingExperience}
                  />
                </div>
              </div>
            </div>
          </div>
          {isShowingBio && (
            <BioFormModal
              setShowingBio={setShowingBio}
              profile={currentProfile}
            />
          )}
          {isShowingSkills && (
            <SkillsFormModal
              setShowingSkills={setShowingSkills}
              profile={currentProfile}
            />
          )}
          {isShowingHeader && (
            <HeaderFormModal
              setShowingHeader={setShowingHeader}
              profile={currentProfile}
            />
          )}
          {isShowingEducation && (
            <EducationFormModal
              setShowingEducation={setShowingEducation}
              profile={currentProfile}
            />
          )}
          {isShowingExperience && (
            <ExperienceFormModal
              setShowingExperience={setShowingExperience}
              profile={currentProfile}
            />
          )}
        </div>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, {
  getProfileById,
  getCurrentProfile
})(Profile);
