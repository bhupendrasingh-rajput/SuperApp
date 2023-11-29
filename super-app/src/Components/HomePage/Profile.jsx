import React from 'react'
import './HomePage.css';
import ProfileLogo from '../../Assets/ProfileLogo.png'

const Profile = () => {
  const profileData = JSON.parse(localStorage.getItem('userData'));
  const selectedItems = JSON.parse(localStorage.getItem('selectedCategories'));
  console.log(selectedItems)
  return (
    <div className="profile-box">
      <img src={ProfileLogo} className="profile-logo" />
      <div className="profile-info">
        <div className="bio">
          <p>{profileData.name}</p>
          <p>{profileData.email}</p>
          <h1>{profileData.username}</h1>
        </div>
        <div className="selected-items">
          {
            selectedItems.map( (item, index) => (
              <div key={index} className="item">{item}</div>
            ))
          }
        </div>

      </div>
    </div>
  )
}

export default Profile