import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import jwt_decode from "jwt-decode";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const url = "http://localhost:5000/api/user/login";
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All fields are required!",
      });
    } else {
      try {
        await axios
          .post(url, {
            email,
            password,
          })
          .then((res) => {
            if (res.data) {
              localStorage.setItem("UserToken", res.data);
              const decoded = jwt_decode(res.data);
              if (decoded.isAdmin === true) {
                Swal.fire({
                  icon: "success",
                  title: "Login Successfull",
                  text: "Welcome Admin",
                });
                navigate("/addfood");
              } else {
                Swal.fire({
                  icon: "success",
                  title: "Login Successfull",
                  text: "Welcome User",
                });
                navigate("/foodlist");
              }
            }
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Container>
      <Form>
        <FormTitle>Sign In</FormTitle>
        <Inputs
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Inputs
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Passwordforgot>
          <A href="/sendmail">Forgot Password?</A>
        </Passwordforgot>
        <Button type="button" onClick={handleSubmit}>
          Sign In
        </Button>
        <NewAccount>
          <A href="/register">Create a new account</A>
        </NewAccount>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8MHx8&w=1000&q=80");
  background-repeat: no-repeat;
  background-size: cover;
`;

const Form = styled.form`
  width: 400px;
  height: 400px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const Inputs = styled.input`
  width: 300px;
  height: 40px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0 10px;
  outline: none;
`;

const Button = styled.button`
  width: 300px;
  height: 40px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0 10px;
  outline: none;
  background-color: #000;
  color: #fff;
  cursor: pointer;
`;

const FormTitle = styled.h1`
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 20px;
`;

const Passwordforgot = styled.div`
  width: 300px;
  height: 40px;
  margin: 10px 1;
  display: flex;
  justify-content: flex-end;
`;

const A = styled.a`
  text-decoration: none;
  color: #000;
  font-size: 14px;
  font-weight: 500;
`;

const NewAccount = styled.div`
  width: 300px;
  height: 40px;
  margin: 10px 0;
  display: flex;
  justify-content: center;
`;
