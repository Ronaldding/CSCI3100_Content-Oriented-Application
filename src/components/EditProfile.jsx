import React from 'react';
import { ImagesOutline, CloseOutline } from 'react-ionicons';
import './editProfile.css';
import axios from 'axios';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.username,
      userId: this.props._id,
      email: this.props.email,
      profilePic: this.props.profilePicture ? this.props.profilePicture : "assets/person/1.jpeg"
    };
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleUserIdChange = (event) => {
    this.setState({ userId: event.target.value });
  };

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      this.setState({ profilePic: e.target.result });
    };
    reader.readAsDataURL(file);
  };

  handleSaveBtn = () => {
    const { profilePicture ,name, email } = this.state;
    const updatedUser = {
      profilePicture: profilePicture,
      username: name,
      email: email
    };
  
    axios.put(`http://localhost:8800/admin_manage_user/${this.props._id}`, updatedUser)
      .then((res) => {
        console.log(res.data); // Handle success response
        this.props.onClose(); // Close the edit profile popup
        window.location.reload(); // Refresh the page
      })
      .catch((err) => {
        console.error(err); // Handle error response
        this.props.onClose();
        window.location.reload(); // Refresh the page
      });
  };


  render() {
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
                  src={this.state.profilePic}
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
                  value={this.state.name}
                  onChange={this.handleNameChange}
                />
              </div>
              {/* <div className="profileField">
                <label htmlFor="userIdInput">User ID:</label>
                <input
                  type="text"
                  id="userIdInput"
                  value={this.state.userId}
                  onChange={this.handleUserIdChange}
                />
              </div> */}
              <div className="profileField">
                <label htmlFor="emailInput">Email:</label>
                <input
                  type="email"
                  id="emailInput"
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                />
              </div>
            </div>
          </div>
          <button className="saveButton" onClick={this.handleSaveBtn}>Save</button>
        </div>
      </div>
    );
  }
}

export default EditProfile;