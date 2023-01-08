import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

export default function Cards({ image, name, description, id,price }) {
  const decoded = jwt_decode(localStorage.getItem("UserToken"));

  const navigate = useNavigate();
  const handleFood = () => {
    navigate(`/food/${id}`);
  };
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>₹ {price}</Card.Text>
        {!decoded.isAdmin&&<Button variant="primary" type="button" onClick={handleFood}>
          Order
        </Button>}
      </Card.Body>
    </Card>
  );
}
