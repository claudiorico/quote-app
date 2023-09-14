import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import $ from "jquery";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <div className="box-container">
//     <div id="quote-box">
//       <p id="text">
//         <i className="bi bi-quote"></i>Change your thoughts and you change your
//         world.
//       </p>
//       <p id="author" className="text-author">
//         - Norman Vincent Peale
//       </p>
//       <div className="bottom-container d-flex justify-content-between">
//         <div>
//           <a href="#" id="tweet-quote">
//             <i className="fa fa-twitter"></i>
//           </a>
//           <a href="#" id="tumblr">
//             <i className="fa fa-tumblr"></i>
//           </a>
//         </div>
//         <button id="new-quote" className="btn btn-primary">
//           New quote
//         </button>
//       </div>
//     </div>
//   </div>
// );

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: [
        "#16a085",
        "#27ae60",
        "#2c3e50",
        "#f39c12",
        "#e74c3c",
        "#9b59b6",
        "#FB6964",
        "#342224",
        "#472E32",
        "#BDBB99",
        "#77B1A9",
        "#73A857",
      ],
      color: "#16a085",
      quotes: [],
      quote: "",
      author: "",
    };
    this.getQuotes = this.getQuotes.bind(this);
    this.newQuote = this.newQuote.bind(this);
    this.setQuotes = this.setQuotes.bind(this);
  }

  newQuote() {
    console.log("newQuote");
    let newQuote = this.getRandomQuote();
    this.setState((state) => {
      let indx = state.colors.indexOf(state.color);
      return {
        quote: newQuote.quote,
        author: newQuote.author,
        color: state.colors[indx + 1],
      };
    });
  }

  getRandomQuote() {
    return this.state.quotes[
      Math.floor(Math.random() * this.state.quotes.length)
    ];
  }

  componentDidMount() {
    const buttonNext = document.getElementById("new-quote");
    buttonNext.addEventListener("click", this.newQuote);
    this.getQuotes();
  }

  async setQuotes(jsonQuotes) {
    if (typeof jsonQuotes === "string") {
      let quotesData = JSON.parse(jsonQuotes);
      console.log("quotesData");
      console.log(quotesData);
      this.setState(quotesData);
      this.newQuote();
    }
  }

  getQuotes() {
    return $.ajax({
      headers: {
        Accept: "application/json",
      },
      url: "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json",
      // success: function (jsonQuotes) {
      //   if (typeof jsonQuotes === "string") {
      //     quotesData = JSON.parse(jsonQuotes);
      //     console.log("quotesData");
      //     console.log(quotesData);
      //     this.setState((quotesData) => {
      //       return { quotes: quotesData };
      //     });
      //   }
      // },
      success: this.setQuotes,
    });
  }

  componentWillUnmount() {}

  render() {
    let inputStyle = { backgroundColor: `${this.state.color}` };
    let hrefTwitter =
      "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
      encodeURIComponent('"' + this.state.quote + '" ' + this.state.author);
    let hreftumb =
      "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=" +
      encodeURIComponent(this.state.author) +
      "&content=" +
      encodeURIComponent(this.state.quote) +
      "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button";

    return (
      <main className="custom-container" style={inputStyle}>
        <div className="box-container">
          <div id="quote-box">
            <p id="text">
              <i className="bi bi-quote"></i>
              {this.state.quote}
            </p>
            <p id="author" className="text-author">
              - {this.state.author}
            </p>
            <div className="bottom-container d-flex justify-content-between">
              <div className="link-container d-flex justify-content-between">
                <a
                  href={hrefTwitter}
                  id="tweet-quote"
                  className="btn"
                  style={inputStyle}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-twitter"></i>
                </a>
                <a
                  href={hreftumb}
                  id="tumblr"
                  className="btn"
                  style={inputStyle}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-tumblr"></i>
                </a>
              </div>
              <button
                id="new-quote"
                className="btn custom-btn"
                style={inputStyle}
              >
                New quote
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
