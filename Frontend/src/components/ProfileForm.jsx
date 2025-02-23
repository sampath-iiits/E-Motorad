import React, { useState, useEffect } from 'react';
import { createProfile } from '../api';

export const ProfileForm = ({ activeTab, onNext, onBack, onDone }) => {
  const [basicInfo, setBasicInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [socialLinks, setSocialLinks] = useState({
    instagram: '',
    youtube: ''
  });

  useEffect(() => {
    // Disable scrolling when the form is open
    document.body.style.overflow = 'hidden';

    return () => {
      // Re-enable scrolling when the form is closed
      document.body.style.overflow = 'auto';
    };
  }, []); // Runs only on mount and unmount

  const handleBasicInfoChange = (e) => {
    const { name, value } = e.target;
    setBasicInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocialLinksChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    if (!basicInfo.name || !basicInfo.email || !basicInfo.phone) {
      alert('Please fill in all required fields');
      return;
    }
    onNext();
  };

  const handleDone = async () => {
    const formData = {
      ...basicInfo,
      insta_link: socialLinks.instagram,
      youtube_link: socialLinks.youtube
    };

    const res = await createProfile(formData);
    if (res.error) {
      alert(res.error);
    } else {
      alert(res.message || "Profile created successfully!");
    }
    console.log('Form submitted with data:', formData);
    onDone(formData);
  };

  return (
    <div className="profile-form-overlay">
      <div className="profile-form">
        {activeTab === 'basic' ? (
          <>
            <div className="form-group">
              <label>Enter Name<span className="required">*</span></label>
              <input
                type="text"
                name="name"
                value={basicInfo.name}
                onChange={handleBasicInfoChange}
                placeholder="Eg. John Doe"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Enter Email<span className="required">*</span></label>
              <input
                type="email"
                name="email"
                value={basicInfo.email}
                onChange={handleBasicInfoChange}
                placeholder="Eg. John@xyz.com"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Enter Phone<span className="required">*</span></label>
              <input
                type="tel"
                name="phone"
                value={basicInfo.phone}
                onChange={handleBasicInfoChange}
                placeholder="Eg. 9123456789"
                className="form-input"
              />
            </div>
            <div className="form-actions right">
              <button className="btn-primary" onClick={handleNext}>
                Next
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="form-group">
              <label>Instagram Link <span className="optional">(Optional)</span></label>
              <input
                type="url"
                name="instagram"
                value={socialLinks.instagram}
                onChange={handleSocialLinksChange}
                placeholder="Eg. instagram.com/username"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Youtube Link <span className="optional">(Optional)</span></label>
              <input
                type="url"
                name="youtube"
                value={socialLinks.youtube}
                onChange={handleSocialLinksChange}
                placeholder="Eg. youtube.com/username"
                className="form-input"
              />
            </div>
            <div className="form-actions">
              <button className="btn-secondary" onClick={onBack}>
                Back
              </button>
              <button className="btn-primary" onClick={handleDone}>
                Add
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileForm;
