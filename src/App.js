
import React from "react";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import SearchPhotos from "./components/searchPhotos";
import ImageView from "./components/Image";
import "./App.css"

function App() {
    let imgObj = {}

    // used props to share the data between components
    let catchDetails = (e) => {
       console.log(e);
       imgObj = e;
       console.log("imgObj==>"+imgObj);
    }

  return (
    <div className="App">
      <div className="container">
        {/* used Browser Router and Switch to jump from one componenet to another componenet */}
        <Router>
          <Switch>
                <Route path="/" exact render={()=><SearchPhotos imageDetails={catchDetails}/>}></Route>
                <Route path="/images/:imageId" exact render={()=> <ImageView imageObj={imgObj}/>} ></Route>
           </Switch>
        </Router>
      </div>
    </div>
  );
}
export default App;