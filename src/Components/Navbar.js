import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {  } from "firebase/storage";
import { auth } from "../firebase-config";
import { addItem, removeItem } from "../utils";

function NavBar() {
  const [userProfile, setUserProfile] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      addItem("profile", { token: currentUser?.uid });
      setUserProfile(currentUser);
    });
  }, [userProfile]);
  
  const logout = async () => {
    navigate("/login");
    removeItem("profile");
    await signOut(auth);
  };

  return (
    <header className="header">
      <nav className="navbar">
        <ul className="left">
          <li>
            <Link to="/">
              <img src="/logo.png" />
            </Link>
          </li>
          <li>
            <Link className="links" to="/users">
              Users
            </Link>
          </li>
          <li>
            <Link className="links" to="/posts">
              Posts
            </Link>
          </li>
        </ul>
        <ul className="right">
          <li>
            {userProfile ? (
              userProfile?.photoURL ? (
                <img
                  className="rounded-circle"
                  style={{ width: "40px", height: "40px" }}
                  src={userProfile.photoURL}
                  onClick={() => logout()}
                />
              ) : (
                <Link className="links" onClick={() => logout()}>
                  {userProfile.displayName
                    ? userProfile.displayName
                    : userProfile?.email?.split("@")[0]}
                </Link>
              )
            ) : (
              <Link className="links" to="/login">
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default NavBar;
