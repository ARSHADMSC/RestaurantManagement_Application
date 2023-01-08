import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import axios from "axios";
import Cards from './Cards';

function FoodList() {
  const [foods, setFoods] = useState([]);
  const url="http://localhost:5000/api/user/getfoods";
  const getvedios = async () => {
    try {
      await axios.get(url,{
      }).then((res)=>{
        if(res.data){
          setFoods(res.data);
        }
      }).catch((err)=>{
        console.log(err.message);
      })
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    getvedios();
  },[])
  return (
    <Container>
      <div className="row">
        <Title>
        <H1>Food List</H1>
        </Title>
        {foods.map((food,index) => (
          <div className="col-md-4 mt-4">
            <Cards
              key={index}
              image={food.image}
              title={food.name}
              description={food.description}
              price={food.price}
              id={food._id}
            />
          </div>
        ))}
      </div>

    </Container>
  )
}

export default FoodList

const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8MHx8&w=1000&q=80");
    background-repeat: no-repeat;
    background-size: cover;
    
`;

const H1 = styled.h1`
    color: white;
    font-size: 50px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 50px;
`;

const Title = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;
`;



