import React, { Component} from "react";
import Game from "./component/Game";
import Button from "./component/button";

class App extends Component {
  state = {
    start: false,
  };

  setStart = () => {
    this.setState({ start: !this.state.start });
  };

  render() {
    let { start } = this.state;
    return (
      <div className="App">
        <Button
          onClick={this.setStart}
          text={!start ? "Start Game" : "Stop"}
          active={start}
        ></Button>
        {start && <Game endGame={() => this.setStart()} />}
      </div>
    );
  }
}
// const App = (props) => {
//   const [start, setStartstate] = useState(false);
 
// return (
//         <div className="App">
//           {/* <button className={style}>{!start ? "Start Game" : "Stop"}</button> */}
  
//           <Button
//             onClick={() => setStartstate(true)}
//             text={!start ? "Start Game" : "Stop"}
//             active={start}
//           ></Button>
//           {start && <Game endGame={() => setStartstate(false)} />}
//         </div>
//       );

// }
export default App;
