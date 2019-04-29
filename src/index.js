import React from "react";
import ReactDOM from "react-dom";

import "./imports.js";

import logo from "../public/presentation-assets/img/new_logo.png";
import hipster_white from "../public/presentation-assets/img/news_white.png";

import { Pop2 } from "./pops/pop2.js";

const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("bd6c75ce07f548c495161947b459a3de");

const Logo = () => {
  return (
    <a
      rel="noopener noreferrer"
      target="_blank"
      href="https://santoshge-reddy.github.io/Santosh/"
    >
      <div className="logo-container">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="brand">News</div>
      </div>
    </a>
  );
};

const Title = () => {
  return (
    <div className="page-description page-description-header">
      <div className="hipster-container">
        <img src={hipster_white} alt="hipster" />
      </div>
    </div>
  );
};

class App extends React.Component {
  constructor(Props) {
    super(Props);
    this.state = {
      articles: [],
      country: "us",
      language: "en",
      q: "",
      category: "",
      sources: "",
      className: ""
    };
  }

  componentDidMount() {
    // var url = new URL("https://newsapi.org/v2/top-headlines"),
    //   params = {
    //     apiKey: "bd6c75ce07f548c495161947b459a3de",
    //     country: "in",
    //     category: "health",
    //     pageSize: 50
    //   };
    // Object.keys(params).forEach(key =>
    //   url.searchParams.append(key, params[key])
    // );

    const query = {
      language: this.state.language,
      country: this.state.country,
      q: this.state.q,
      category: this.state.category,
      sources: this.state.sources
    };
    newsapi.v2.topHeadlines(query).then(data => {
      let news = data.articles.map(article => {
        return <Pop2 key={article.url} article={article} />;
      });

      this.setState({ articles: news });
      this.setState({ className: "masonry-container" });
      console.log(news);
    });
  }

  render() {
    return (
      <div className="wrapper">
        <Logo />
        <div className="container">
          <Title />
          <div className={this.state.className}>{this.state.articles}</div>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
