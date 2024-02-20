import {
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from 'react';
import axios from 'axios';

function Profil() {

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [file, setFile] = useState(null);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleUsernameChange = (event) => {
      setUsername(event.target.value);
  };

    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
  };

    const handleConfirmPasswordChange = (event) => {
      setConfirmPassword(event.target.value);
  };

    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
};


const updateEmail = (newEmail) => {
  axios.post('/updateEmail', { email: newEmail })
      .then(response => {
          console.log('Email updated successfully:', response.data);
          // Handle success
      })
      .catch(error => {
          console.error('Error updating email:', error);
          // Handle error
      });
};

const updateUsername = (newUsername) => {
  axios.post('/updateUsername', { username: newUsername })
      .then(response => {
          console.log('Username updated successfully:', response.data);
          // Handle success
      })
      .catch(error => {
          console.error('Error updating username:', error);
          // Handle error
      });
};

const updatePassword = (newPassword) => {
  axios.post('/updatePassword', { password: newPassword })
      .then(response => {
          console.log('Password updated successfully:', response.data);
          // Handle success
      })
      .catch(error => {
          console.error('Error updating password:', error);
          // Handle error
      });
};

const uploadFile = (file) => {
  const formData = new FormData();
  formData.append('file', file);

  axios.post('/uploadFile', formData)
      .then(response => {
          console.log('File uploaded successfully:', response.data);
          // Handle success
      })
      .catch(error => {
          console.error('Error uploading file:', error);
          // Handle error
      });
};

const deleteUser = () => {
  axios.delete('/deleteUser')
      .then(response => {
          console.log('User deleted successfully:', response.data);
          // Handle success
      })
      .catch(error => {
          console.error('Error deleting user:', error);
          // Handle error
      });
};

const handleSubmit = (event) => {
  event.preventDefault();

  // Check if passwords match
  if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
  }

  updateEmail(email);
  updateUsername(username);
  updatePassword(password);
  uploadFile(file);
};

  return (
    <div className="bg-gray-700 rounded-lg p-4 w-fit mx-auto mt-8">
      <form onSubmit={handleSubmit} className="flex items-center justify-around">
        <div className="bg-gray-800 m-4 rounded-lg p-5 w-fit text-center ">
        <label htmlFor="file" className="file-input-container">
    <input
        type="file"
        id="file"
        name="file"
        onChange={handleFileChange}
        className="custom-file-input"
        required
    />
    <span className="custom-file-label">Avatar</span>
</label>
        <img src="https://placeholder.co/200" className="rounded-lg" />
        <button type="button" onClick={deleteUser} className="bg-gray-50 rounded-lg text-gray-900 p-2 m-2">Supprimer son compte</button>
      </div>
      <div className="bg-gray-800 rounded-lg p-3 m-4 h-fit">
        
        <div className="bg-gray-700 p-2 m-2 rounded-lg"><label htmlFor="email"  className="text-gray-50 underline font-semibold underline-offset-2 decoration-double">Email : </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    className="ml-2 rounded-lg p-1"
                /></div>
        <div className="bg-gray-700 p-2 m-2 rounded-lg"><label htmlFor="username"  className="text-gray-50 underline font-semibold underline-offset-2 decoration-double ">Pseudo :</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                    className="ml-2 rounded-lg p-1"
                /></div>
        <div className="bg-gray-700 p-2 m-2 rounded-lg"><label htmlFor="password" className="text-gray-50 underline font-semibold underline-offset-2 decoration-double">Mot de passe :</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    className="ml-2 rounded-lg p-1"
                />
                </div>
        <div className="bg-gray-700 p-2 m-2 rounded-lg"><label htmlFor="confirmPassword" className="text-gray-50 underline font-semibold underline-offset-2 decoration-double">Confirmation du mot de passe :</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                    className="ml-2 rounded-lg p-1"
                /></div>
                <button type="submit" className="bg-gray-50 text-gray-900 p-2 rounded-lg m-2 ">Sauvegarder les modifications</button>
      </div>
      </form>
    </div>
  );
}

export default Profil;