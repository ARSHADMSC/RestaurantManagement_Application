import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import {useParams} from 'react-router-dom'
import { useNavigate } from "react-router-dom";

import axios from 'axios';
import Swal from 'sweetalert2';

export default function Vedio() {
    const navigate = useNavigate();
    const [food, setFood] = useState([]);
    const id=useParams().id
    console.log(id);
    const url=`http://localhost:5000/api/user/getfood/${id}`;
    useEffect(() => {
        axios.get(url)
        .then((res)=>{
            setFood(res.data)
            // console.log(food.videoUrl);
        })
        .catch((err)=>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                })
        })
    }, [url])

    const paied=()=>{
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Payment Successfull!',
            })
            navigate("/foodlist");
    }
  return (
    <Container>
        <Content>
            <OrderBill>
                <h1>Order Bill</h1>
                <h2>Food Name: {food.name}</h2>
                <h3>Price: ₹ {food.price}</h3>
            <PayButton type='button' onClick={paied}>
                Pay
            </PayButton>
            </OrderBill>
        </Content>
    </Container>
  )
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

const Content = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const OrderBill = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.2);
    h1{
        font-size: 30px;
        font-weight: 600;
        margin-bottom: 20px;
    }
    h2{
        font-size: 20px;
        font-weight: 500;
        margin-bottom: 10px;
    }
    h3{
        font-size: 20px;
        font-weight: 500;
        margin-bottom: 10px;
    }
`;

const PayButton = styled.button`    
    width: 300px;
    height: 50px;
    background-color: #000;
    color: #fff;
    border: none;
    outline: none;
    border-radius: 10px;
    padding: 10px;
    margin-top: 20px;
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
`;





