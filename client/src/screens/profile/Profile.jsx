import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
// import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feed/Feed";
import Spinner from "../../components/spinner/Spinner";
import "./profile.css";
import { REACT_APP_PUBLIC_FOLDER } from "../../logic/keys";

const Profile = ({ currentUser, setCurrentUser }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const id = useParams().id;

  useEffect(() => {
    setIsLoading(true);
    const fetchUser = async () => {
      const res = await axios.get(`/users/${id}`);
      setUser(res.data);
      setIsLoading(false);
    };
    fetchUser();
  }, [id]);

  return (
    <>
      {!isLoading ? (
        <>
          <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
          <div className="profile">
            <div className="profileRight">
              <div className="profileRightTop">
                <div className="profileCover">
                  <img
                    className="profileCoverImg"
                    src={
                      user?.coverPicture
                        ? REACT_APP_PUBLIC_FOLDER + user?.coverPicture
                        : REACT_APP_PUBLIC_FOLDER + "cover.jpg"
                    }
                    alt="profileCoverImg"
                  />
                  <img
                    className="profileUserImg"
                    src={
                      user?.profilePicture
                        ? REACT_APP_PUBLIC_FOLDER + user?.profilePicture
                        : REACT_APP_PUBLIC_FOLDER + "user.png"
                    }
                    alt="profileUserImg"
                  />
                </div>
                <div className="profileInfo">
                  <h4 className="profileInfoName">
                    {user?.name} {user?.lastName}
                  </h4>
                  <span className="profileInfoDesc">{user?.about}</span>
                </div>
              </div>
              <div className="profileRightBottom">
                <Feed user={user} currentUser={currentUser} />
                <Rightbar user={user} currentUser={currentUser} setCurrentUser={setCurrentUser} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Profile;

// useEffect(() => {
//   setIsLoading(true);
//   axios
//     .get(`/users/${currentUser?.id}`)
//     .then(function (response) {
//       console.log(response.data);
//       setCurrentUser(response.data);
//       setIsLoading(false);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }, []);

// useEffect(() => {
//   const fetchUser = async() => {
//     const res = await axios.get('')
//   }
// })

// useEffect(() => {
//   async function fetchUser() {
//     setIsLoading(true);
//     const res = await axios.get(`/newuser/${currentUser?.email}`);
//     setCurrentUser(res.data);
//     setIsLoading(false);
//   }
//   fetchUser();
// }, []);
