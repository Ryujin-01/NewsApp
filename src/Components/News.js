import { Component } from "react";
import NewsItems from "./NewsItems";
import Loading from "./LoadingGif";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Sets the initial state of the components.
      art: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${
      this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)
    } - Chicken Butt News`;
  }

  async componentDidMount() {
    try {
      this.props.setProgress(10);
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&language=${this.props.language}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true }); // So that the loading GIF shows when data is being fetched.
      this.props.setProgress(40);

      let data = await fetch(url);
      let parsedData = await data.json();
      this.props.setProgress(70);
      this.setState({
        art: parsedData.articles || [], // So that when we don't fetch any data, the articles array becomes empty.
        totalResults: parsedData.totalResults,
        loading: false, // Loading becomes false when data is fetched.
      });
      // console.log(parsedData);
      this.props.setProgress(100);
    } catch (error) {
      // Gives you an error message in the console if there is an error in fetching the data.
      console.error("Error fetching data:", error);
    }
  }

  fetchMoreData = async () => {
    try {
      let url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${this.props.category}&language=${
        this.props.language
      }&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${
        this.props.pageSize
      }`;
      this.setState({ page: this.state.page + 1 }); // Changes the page of the url.
      // We used this function here because it takes some time to set new state, and the url was already fetched. Earlier it was "this.setState({page: this.state.page+1})" and then let url = "...${this.state.page}...".
      // But due to the time lag it was causing same page (i.e. page 1) to reload. Hence we changed the url itself and then changed the state. The url is now "...${this.state.page+1}...".
      // Earlier it used to load page 1 and then set page 2, now it loads page 2 and sets page 2, which is correct.
      // You can try to change the code to see the error.
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        art: this.state.art.concat(parsedData.articles), // Add new elements to the previous array.
        totalResults: parsedData.totalResults,
      });
      // console.log(parsedData);
    } catch (error) {
      // Gives you an error message in the console if there is an error in fetching the data.
      console.error("Error fetching data:", error);
    }
  };

  render() {
    return (
      <div className="container my-3">
        {/* Shows Loading. */}
        {this.state.loading && <Loading />}

        {/* Show message if no articles */}
        {!this.state.loading &&
          this.state.art.length === 0 && ( // When not loading and array art is empty
            <div style={{ marginTop: "25%" }} className="text-center">
              <h3>No articles found for this category</h3>
              <p>Try a different category or check back later.</p>
            </div>
          )}

        {/* Else renders this. */}
        {!this.state.loading &&
          this.state.art.length > 0 && ( // So that when there is no articles, it does not say top headlines.
            <h1
              style={{ marginTop: "6rem", marginBottom: "2rem" }}
              className="text-center"
            >
              Chicken Butt News - Top{" "}
              {this.props.category === "general"
                ? ""
                : this.props.category.charAt(0).toUpperCase() +
                  this.props.category.slice(1)}{" "}
              Headlines
            </h1>
          )}
        <InfiniteScroll
          dataLength={this.state.art.length}
          next={this.fetchMoreData}
          hasMore={
            this.state.page <=
            Math.ceil(this.state.totalResults / this.props.pageSize)
          }
          loader={<Loading />}
          endMessage={
            // So that it does not displays at the start of the loading.
            this.state.art.length > 0 && (
              <p className="text-center">
                <b>Yay! You have seen it all</b>
              </p>
            )
          }
        >
          <div className="my-4 d-flex flex-wrap gap-3 justify-content-evenly">
            {this.state.art.map((element, index) => {
              // To loop the contents of the array "articles".
              return (
                <div className="mb-3" key={index}>
                  <NewsItems
                    title={element.title ? element.title.slice(0, 45) : ""}
                    author={element.author}
                    date={element.publishedAt}
                    description={
                      element.description
                        ? element.description.slice(0, 90)
                        : ""
                    }
                    image={element.urlToImage}
                    newsUrl={element.url}
                  />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}
