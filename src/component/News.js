import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    this.updateNews();
  }

  async updateNews(){
    const url = `https://techcrunch.com/wp-json/wp/v2/posts?per_page=${this.props.pageSize}&context=embed&page=${this.state.page}`;

    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({ articles: parseData, loading: false });
  }

  handleNextClick = async () => {

    this.setState({
      page:this.state.page+1
    });
    this.updateNews();
  };

  handlePrevClick = async () => {

    this.setState({
      page:this.state.page-1
    });
    this.updateNews();
  };

  fetchMoreData = async () => {
    this.props.setProgress(0);
    this.setState({page:this.state.page +1})
    const url = `https://techcrunch.com/wp-json/wp/v2/posts?per_page=${this.props.pageSize}&context=embed&page=${this.state.page}`;
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({ articles: this.state.articles.concat(parseData)});
    this.props.setProgress(100);
  };

  render() {
    return (
      <div className="container">
        <div className="alert alert-warning my-2 text-center" role="alert">
          <b>
            <h4>Get Updated !! Best Latest Daily News for free.</h4>
          </b>
        </div>
        {this.state.loading && <Spinner  />}
        <div className="card">
         
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== 100}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className="row">
            {this.state.articles.map((e) => {
              return (
                <div className="col-md-4" key={e.id}>
                  <NewsItem
                    imgurl={e.jetpack_featured_media_url}
                    title={e.title.rendered}
                    desc={e.excerpt.rendered.slice(3, 80)}
                    newsUrl={e.shortlink}
                  />
                </div>
              );
            })}
          </div>
          </div>
          </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between mx-3">
              <button
                type="button"
                disabled={this.state.page <= 1}
                className="btn btn-primary"
                onClick={this.handlePrevClick}
              >
                
                &larr; Previous
              </button>
              <button
                type="button"
                disabled={
                  this.state.page + 1 > Math.ceil(100 / this.props.pageSize)
                }
                className="btn btn-primary"
                onClick={this.handleNextClick}
              >
                Next &rarr;
              </button>
            </div> */}
          </div>
        </div>
      
    );
  }
}

export default News;
