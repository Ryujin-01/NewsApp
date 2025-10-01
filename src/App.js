import { Component } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const route = [
  { path: "/general", category: "general" },
  { path: "/business", category: "business" },
  { path: "/entertainment", category: "entertainment" },
  { path: "/health", category: "health" },
  { path: "/science", category: "science" },
  { path: "/sports", category: "sports" },
  { path: "/technology", category: "technology" },
];

export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API_KEY;

  pageSize = 13;

  state = {
    progress: 0,
  };
  setProgress = (progress) => {
    this.setState({ progress: progress });
  };

  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <LoadingBar progress={this.state.progress} height={3} color="red" />
        <Routes>
          {/* Optional: default route */}
          <Route
            path="/"
            element={
              <News
                apiKey={this.apiKey}
                setProgress={this.setProgress}
                pageSize={this.pageSize}
                country="us"
                category="general"
                language="en"
              />
            }
          />
          {route.map((element, index) => (
            <Route
              path={element.path} // When this path is called, show this element.
              element={
                <News
                  apiKey={this.apiKey}
                  key={index}
                  setProgress={this.setProgress}
                  pageSize={this.pageSize}
                  country="us"
                  category={element.category}
                  language="en"
                />
              }
            />
          ))}
        </Routes>
      </BrowserRouter>
    );
  }
}
