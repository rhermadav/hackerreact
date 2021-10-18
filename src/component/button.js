import React from "react";
import styled from "styled-components";

function button(props) {
  console.log(props);
  return <Button {...props}>{props.text}</Button>;
}

const Button = styled.button`
  width: 150px;
  height: 50px;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  outline: none;
  margin: 50px;
  background: ${(props) => (props.active ? "red" : "green")};
`;
export default button;
