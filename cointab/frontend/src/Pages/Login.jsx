import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/AuthReducer/actions";
import { Link, useNavigate } from "react-router-dom";
import { storeData } from "../Utils/localStorage";
import { COLORS } from "../Components/colors";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const isError = useSelector((store) => store.isError);

  const handleLogin = () => {
    const payload = { email: email, password: password };
    dispatch(login(payload)).then((r) => {
      if (r === "LOGIN_SUCCESS") {
        storeData("UserEmail", email);
        navigate("/");
      }
      if (r === "LOGIN_FAILURE") {
        setError(isError);
      }
    });
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      backgroundImage={
        "linear-gradient(to right , rgba(240, 163, 188, 0.2), rgba(240, 163, 188, 1))"
      }
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textColor={COLORS.purple}>
            Login to your account
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <HStack mb={"10px"} justifyContent={"center"}>
            {error && (
              <Text align={"center"} color={"red"}>
                {error}
              </Text>
            )}
          </HStack>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel textColor={COLORS.purple}>Email address</FormLabel>
              <Input type="email" onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password">
              <FormLabel textColor={COLORS.purple}>Password</FormLabel>
              <Input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Button
                // size="lg"
                bg={COLORS.purple}
                color={"white"}
                _hover={{
                  bg: "rgba(155, 69, 178, 0.8)",
                }}
                onClick={handleLogin}
              >
                Login
              </Button>
            </Stack>
            <HStack pt={6} justifyContent={"center"}>
              <Text align={"center"}>Don't have account? </Text>
              <Link to="/signup">
                <Text color={COLORS.purple}>Signup</Text>
              </Link>
            </HStack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
