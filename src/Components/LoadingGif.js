import loadingGif from "../Images/LoadingGif.gif";
import { Component } from "react";

export default class Loading extends Component {
  render() {
    return (
      <div className="text-center">
        <img
          style={{ height: "80px", marginTop: "5rem" }}
          src={loadingGif}
          alt="Loading Gif"
        />
      </div>
    );
  }
}
