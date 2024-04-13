import React, { useEffect, useState } from "react";
import ExploreProfileCard from "../components/ExploreProfileCard";
import "../styles/explore.css";
import { toast } from "react-toastify";
import { ExploreCardSkeleton } from "../utils/skeleton";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { getData } from "../lib/api";

export default function Explore() {
  const [users, setUsers] = useState();
  const [userID, setUserID] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  let status = "";
  const numberOfSkeletonCards = 9;

  useEffect(() => {
    setTimeout(async () => {
      try {
        const response = await getData("data");
        let data = response.data;
        if (data.status === "ok") {
          setUserID(data.userID);
          setLoading(false);
        } else {
          toast.error("Kindly login first!");
          navigate("/verify/login");
          return;
        }
        data = await data.Users;
        setUsers(data);
      } catch (err) {
        toast.error("There was an error in loading. Kindly refresh!");
        return;
      }
    }, 1000);
  });

  const skeletonCards = Array.from({ length: numberOfSkeletonCards }).map(
    () => <ExploreCardSkeleton />
  );

  return (
    <>
      <div id="profile-card-container">
        {users &&
          users
            .filter((User) => User._id !== userID) //filter user
            .filter((User) => !User.friends.includes(userID)) //filter users' friends
            .map(
              (User) => (
                User.requestRecieved.includes(userID)
                  ? (status = "Pending...")
                  : (status = "Connect +"), // Status based on request sent or not.
                (
                  <ExploreProfileCard
                    key={User._id}
                    id={User._id}
                    name={User.name}
                    breed={User.breed}
                    gender={User.gender}
                    bio={User.bio}
                    image={User.image}
                    status={status}
                    loading={loading}
                  />
                )
              )
            )}
        {!users && <>{skeletonCards}</>}
      </div>
    </>
  );
}
