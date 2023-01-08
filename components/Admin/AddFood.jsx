import axios from 'axios';
import React from 'react'
import styled from "styled-components";
import Swal from 'sweetalert2';

export default function AddFood() {
  const [name, setname] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [image, setImage] = React.useState("");
  const url="http://localhost:5000/api/admin/addfood";
 const uploadFood = async (e) => {
    e.preventDefault();
  if(!name || !description || !price || !image ){
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill all the fields!',
        })
  }else{
    try {
        await axios.post(url,{
          name,
          image,
          price,
          description,
        }).then((res)=>{
            if(res.data){
                Swal.fire({
                    icon: 'success',
                    title: 'Food Added',
                    text: 'Food Added Successfully',
                    })
            }
        }).catch((err)=>{
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Food Not Added!",
            })
        })
    } catch (error) {
        console.log(error);
    }
  }
 }
  return (
    <Container>
      <Form>
      <Heading>
        <h1>Add Food</h1>
      </Heading>
        <Inputs type="text" placeholder="Name" onChange={(e)=>setname(e.target.value)} required />
        <Inputs type="text" placeholder="Image" onChange={(e)=>setImage(e.target.value)} required />
        <Inputs type="number" placeholder="Price" onChange={(e)=>setPrice(e.target.value)} required />
        <TextArea placeholder="Description" onChange={(e)=>setDescription(e.target.value)} required/>
        <Button type="button" onClick={uploadFood}>Add Food</Button>
      </Form>
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

const Form = styled.form`
  width: 800px;
  height: 500px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const Inputs = styled.input`  
  width: 600px;
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

const Heading = styled.div`
  width: 100%;
  height: 50px;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px 10px 0 0;
  color: #fff;
`;

const TextArea = styled.textarea`
  width: 600px;
  height: 100px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0 10px;
  outline: none;
`;




