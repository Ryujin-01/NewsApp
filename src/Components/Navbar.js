import { Component } from "react";
import { Link } from "react-router-dom";

const category = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

export class Navbar extends Component {
  render() {
    return (
      <nav
        className="navbar fixed-top navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Chick News
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              {category.map((element) => (
                <li key={element} className="nav-item">
                  <Link
                    className="nav-link"
                    aria-current="page"
                    to={`/${element}`} // Give a path to the button, so when the button is clicked, it goes to this path.
                  >
                    {element === "general"
                      ? "Home"
                      : element.charAt(0).toUpperCase() + element.slice(1)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
