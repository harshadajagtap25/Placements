import { Button, Text } from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../Redux/AuthReducer/actions";
import { getData } from "../Utils/localStorage";

const Home = () => {
  const email = getData("UserEmail");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    let d = dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      <Button onClick={handleLogout}>Log Out</Button>
      <Text>{email}</Text>
    </div>
  );
};

export default Home;
