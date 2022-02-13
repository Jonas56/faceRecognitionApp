import React, { Component } from "react";
import Clarifai from "clarifai";
import Particles from "react-particles-js";
import Navigation from "./components/Navigation/Navigation";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import "./App.css";
import "tachyons";

const app = new Clarifai.App({
  apiKey: "4376bda10da84304aa28e5b854373016",
});

const particlesOption = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 400,
      },
    },
  },
  InteractivityDetect: {
    onhover: {
      enable: true,
    },
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imgeURL: "",
      box: {},
      route: "signin",
    };
  }

  calculateFaceBox = (data) => {
    const clarifaiFaceBox =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const imageInput = document.getElementById("imageinput");
    const width = imageInput.width;
    const height = imageInput.height;
    return {
      leftCol: clarifaiFaceBox.left_col * width,
      topRow: clarifaiFaceBox.top_row * height,
      rightCol: width - clarifaiFaceBox.right_col * width,
      bottomRow: height - clarifaiFaceBox.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    console.log(box);
    return this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageURL: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) => this.displayFaceBox(this.calculateFaceBox(response)))
      .catch((err) => console.error(err));
  };

  onRouteChange = (route) => {
    this.setState({ route });
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOption} />
        <Navigation
          route={this.state.route}
          onRouteChange={this.onRouteChange}
        />
        {this.state.route === "home" ? (
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition
              box={this.state.box}
              imageURL={this.state.imageURL}
            />
          </div>
        ) : this.state.route === "signin" ? (
          <Signin onRouteChange={this.onRouteChange} />
        ) : (
          <Register onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
