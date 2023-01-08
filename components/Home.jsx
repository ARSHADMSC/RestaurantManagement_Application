import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  const [logIn, setLogIn] = useState(true);
  useEffect(() => {
    if (localStorage.getItem("UserToken")) {
      setLogIn(false);
    }
  }, []);
  return (
    <Container>
        <Content>
          <H1>Food Restaurant</H1>
          {logIn && (<HomeButtoms onClick={() => navigate("/login")}>Get Started</HomeButtoms>)}
          
        </Content>
    </Container>
  );
}

export default Home;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
  display: flex;
    flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8MHx8&w=1000&q=80");

  background-repeat: no-repeat;
  background-size: cover;
`;

const HomeButtoms = styled.button`
  width: 200px;
  font-size: 20px;
  height: 40px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 0 10px;
  outline: none;
  background-color: #000;
  color: #fff;
  cursor: pointer;
`;

const H1 = styled.h1`
    font-size: 100px;
    color: red;
    text-align: center;
`;



const Content = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8MHx8&w=1000&q=80");
  background-repeat: no-repeat;
  background-size: cover;
`;