import React, { useState, useEffect, useRef } from "react";
import Square from "./Square";
import styled from "styled-components";
import randomPoints from "../utils/randomPoints";
import mario from "../assets/mario.jpg";
import sprite from "../assets/sprite.png";

function Game(props) {
  const [cordX, setCordX] = useState(null);
  const [cordY, setCordY] = useState(null);

  //random coordinate state
  const [xCord, setXCord] = useState([]);
  const [yCord, setYCord] = useState([]);

  // Get number of width and heigth
  useEffect(() => {
    const row = prompt("Hello users please enter the board width");
    const column = prompt("Hello users please enter enter the board height");

    setCordY(parseInt(row, 10));
    setCordX(parseInt(column, 10));
  }, []);

  // Create array of rows and columns
  let array = [];
  for (let i = 0; i < cordX; i++) {
    array.push([]);
    for (let j = 0; j < cordY; j++) {
      array[i][j] = null;
    }
  }

  //get the half of the rows and column in other to position the player at the middle point when the game starts
  const xP = Math.floor(cordX / 2) - 1;
  const yP = Math.floor(cordY / 2) - 1;

  const [x, setX] = useState("");
  const [y, setY] = useState("");
  //update the x and y coordinates when available
  useEffect(() => {
    if (cordX && cordY) {
      setX(xP);
      setY(yP);
    }
  }, [cordX, cordY, xP, yP]);

  //watch user moves
  let score = useRef(0);

  //handles the player movement using the arrow keys and then increment the score on any movement
  useEffect(() => {
    function handleKey(e) {
      switch (e.key) {
        case "ArrowRight":
          if (x < cordX - 1) {
            score.current += 1;
            setX(x + 1);
          }
          break;
        case "ArrowLeft":
          if (x > 0) {
            score.current += 1;
            setX(x - 1);
          }
          break;
        case "ArrowUp":
          if (y > 0) {
            score.current += 1;
            setY(y - 1);
          }
          break;
        case "ArrowDown":
          if (y < cordY - 1) {
            score.current += 1;
            setY(y + 1);
          }
          break;
        default:
          console.log("unknown");
          break;
      }
    }

    window.addEventListener("keydown", handleKey);
    //removing event listener to prevent memory leakage
    return () => window.removeEventListener("keydown", handleKey);
  }, [y, x, cordX, cordY]);

  //get random x and y coordinates using the useEffect hook and make it run once during a game
  useEffect(() => {
    if (cordX && cordY) {
      const xCord = randomPoints(cordX, cordX);
      const yCord = randomPoints(cordY, cordX);
      console.log(xCord, yCord);
      setXCord(xCord);
      setYCord(yCord);
    }
  }, [xP, yP, cordX, cordY]);

  //create and array to hold the game sprites
  const [alp, gh] = useState([]);

  useEffect(() => {
    let array1 = [];

    if (cordX) {
      for (let i = 0; i < cordX; i++) {
        array1.push(i);
      }
      array1.fill(<Image className="img" src={sprite} alt="food" />);
      gh(array1);
    }
  }, [cordX]);

  //it tracks the number of food remaing on the game
  let tracker = useRef(0);

  //Assigns 4 food to a position on the game using the random coordinates

  if (xCord.length > 0) {
    for (let i = 0; i < xCord.length; i++) {
      array[xCord[i]][yCord[i]] = <div>{[alp[i]]}</div>;
    }

    //removes food if player gets to the point of the food and also track if food has been remove
    for (let i = 0; i < xCord.length; i++) {
      if (x === yCord[i] && y === xCord[i]) {
        alp[i] = <EmptyCell></EmptyCell>;
        tracker.current += 1;
      }
    }
  }

  //check if theres no food on the board and ends game and display the number of moves taken by the user to collect all foods
  if (xCord.length > 0 && tracker.current === xCord.length) {
    setTimeout(() => {
      alert(`Game over, You completed game in ${score.current} moves`);
      props.endGame();
    });
  }
  //check if the coordinate are returned and place the player on the middle point of the game
  //the extra check for x or y = 0 is because x = 0 or y == 0 is a falsy value hence the position will not be updated

  if ((x && y) || x === 0 || y === 0) {
    array[y][x] = <Image className="img" src={mario} alt="player" />;
  }

  return (
    <Container>
      {array.length > 0
        ? array.map((item, i) => <Square data={item} key={i} />)
        : "Waiting for width and height..."}
    </Container>
  );
}

const Container = styled.div``;
const Image = styled.img`
  width: 30px;
  height: 32px;
`;
const EmptyCell = styled.p`
  width: 30px;
  height: 32px;
`;
export default Game;
