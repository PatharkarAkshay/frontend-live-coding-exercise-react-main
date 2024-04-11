import React, { Component } from "react";
import { QUESTIONS } from "./questions";

class App extends Component {
  state = {
    questions: [],
  };

  componentDidMount() {
    this.setState({
      questions: Object.keys(QUESTIONS).map((q) => ({
        number: q,
        question: QUESTIONS[q],
        yes: false,
        no: false,
        answered: false,
      })),
    });
  }

  handleClick = (id, btn) => {
    const modifiedQuestions = this.state.questions.map((q) => {
      if (q.number === id) {
        return {
          ...q,
          [btn]: true,
          answered: true,
        };
      } else {
        return q;
      }
    });

    this.setState({
      questions: modifiedQuestions,
    });
  };

  getScore = () => {
    let score = 0;
    let countYes = 0;
    if (this.state.questions.length) {
      for (let i = 0; i < this.state.questions.length; i++) {
        if (this.state.questions[i].yes) {
          countYes++;
        }
      }
    }

    score =
      100 *
      (countYes /
        (this.state.questions.length ? this.state.questions.length : 1));

    return score;
  };

  render() {
    return (
      <div className="main__wrap">
        <main className="container">
          <div>TODO</div>
          <h3>Score: {this.getScore()}</h3>
          <h3>
            Average score{" "}
            {localStorage.getItem("score") ? localStorage.getItem("score") : 0}
          </h3>
          <div>
            {this.state.questions.map((q) => (
              <div key={q.number}>
                <h4>{`${q.number}. ${q.question}`}</h4>
                <div>
                  <button
                    className="button"
                    disabled={q.answered}
                    onClick={() => this.handleClick(q.number, "yes")}
                  >
                    Yes
                  </button>
                  <button
                    className="button"
                    disabled={q.answered}
                    onClick={() => this.handleClick(q.number, "no")}
                  >
                    No
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }
}

export default App;
