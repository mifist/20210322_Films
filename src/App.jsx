import React, { Component } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "components/ErrorFallback";
import FilmCard from "pages/FilmsPage/components/FilmCard";
import { films } from "data";

class App extends Component {
  state = {
    films: [],
  };

  componentDidMount() {
    this.setState({ films });
  }

  onReset = () => this.setState({ films });

  render() {
    const { films } = this.state;
    return (
      <div className="ui container mt-3">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={this.onReset}
          resetKeys={[films]}
        >
          <FilmCard film={films[0]} />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
