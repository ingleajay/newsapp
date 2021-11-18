import React, { Component } from "react";

export class NewsItem extends Component {
  // state is used when u need to change varaible again and again
  // props only read

  render() {
    let { title, desc, imgurl, newsUrl} = this.props;

    return (
      <div className="container-fluid">
        <div className="card my-2">
          <img alt="Avatar" src={imgurl}  className="img_post"/>
          <div className="container">
            <h4>
              <b>{title}</b>
            </h4>
            <p>{desc}</p>
            <a href={newsUrl} className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
