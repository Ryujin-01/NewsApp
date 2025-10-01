import { Component } from "react";
import { Link } from "react-router-dom";
import errorImage from "../Images/Error-loading.webp";

export default class NewsItems extends Component {
  render() {
    // This is "destructuring in JavaScript".
    // Instead of writing "this.props.image" we can simply write "image".
    // True for all the other props.
    const { image, description, title, newsUrl, author, date } = this.props;

    return (
      <div className="card" style={{ width: "18rem" }}>
        <img src={image || errorImage} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text">
            <small className="text-body-secondary">
              By {author || "Unknown"} on{" "}
              {new Date(date).toGMTString() || "Few days ago"}
            </small>
          </p>
          <Link
            to={newsUrl}
            target="_blank"
            rel="noopener noreferrer" // Prevents the security risk when opening a new tab through "target='_blank'"
            className="btn btn-sm btn-dark"
          >
            Read More
          </Link>
        </div>
      </div>
    );
  }
}
