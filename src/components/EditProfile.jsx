import React from 'react';
import { ImagesOutline, CloseOutline } from 'react-ionicons';
import './editProfile.css';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Ronald Ding',
      userId: '@ronald_ding',
      bio: '🐿️ 🏕️ 📖🤖🏋️🎥☕️🍫Live Love Laugh Be kind',
      profilePic: '/assets/person/1.jpeg',
    };
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleUserIdChange = (event) => {
    this.setState({ userId: event.target.value });
  };

  handleBioChange = (event) => {
    this.setState({ bio: event.target.value });
  };

  handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      this.setState({ profilePic: e.target.result });
    };
    reader.readAsDataURL(file);
  };

  render() {
    const { name, userId, bio, profilePic } = this.state;

    return (
      <div className="editProfileOverlay">
        <div className="editProfilePopup">
          <button className="closeButton" onClick={this.props.onClose}>
            <CloseOutline color="#ffffff" height="20px" width="20px" />
          </button>
          <h2>Edit Profile</h2>
          <div className="profileForm">
            <div className="profilePictureColumn">
              <label className="profilePictureLabel" htmlFor="profilePicUpload">
                <img
                  className="profilePicture"
                  src={profilePic}
                  alt="Profile"
                />
                <input
                  type="file"
                  id="profilePicUpload"
                  accept="image/*"
                  onChange={this.handleProfilePicChange}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
            <div className="profileDetailsColumn">
              <div className="profileField">
                <label htmlFor="nameInput">Name:</label>
                <input
                  type="text"
                  id="nameInput"
                  value={name}
                  onChange={this.handleNameChange}
                />
              </div>
              <div className="profileField">
                <label htmlFor="userIdInput">User ID:</label>
                <input
                  type="text"
                  id="userIdInput"
                  value={userId}
                  onChange={this.handleUserIdChange}
                />
              </div>
              <div className="profileField">
                <label htmlFor="bioInput">Bio:</label>
                <textarea
                  id="bioInput"
                  value={bio}
                  onChange={this.handleBioChange}
                />
              </div>
            </div>
          </div>
          <button className="saveButton">Save</button>
        </div>
      </div>
    );
  }
}

export default EditProfile;