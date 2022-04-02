import React, { useState, useEffect } from "react";

// function useMedia(query) {
//   const [matches, setMatches] = useState(window.matchMedia(query).matches);
//   useEffect(() => {
//     let media = window.matchMedia(query);
//     if (media.matches !== matches) {
//       setMatches(media.matches);
//     }
//     let listener = () => setMatches(media.matches);
//     media.addEventListener("change", listener);
//     return () => {
//       media.removeEventListener("change", listener);
//     };
//   }, [query]);
//   return matches;
// }

// function App() {
//   const small = useMedia("(max-width: 400px)");
//   const large = useMedia("(min-width: 800px)");
//   return (
//     <div className="media">
//       <h1>Media</h1>
//       <p>Small ? {small ? "Yep" : "Nope"}</p>
//       <p>Large ? {large ? "Yep" : "Nope"}</p>
//     </div>
//   );
// }

class Media extends React.Component {
  state = {
    matches: window.matchMedia(this.props.query),
  };

  componentDidMount() {
    this.setup();
  }
  setup() {
    let media = window.matchMedia(this.props.query);
    if (media.matches !== this.state.matches) {
      this.setState({
        matches: media.matches,
      });
    }
    let listener = () => this.setState({ matches: media.matches });
    media.addEventListener("change", listener);
    this.removeListener = () => media.removeEventListener("change", listener);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      this.removeListener();
      this.setup();
    }
  }

  componentWillUnmount(prevProps) {
    this.removeListener();
  }

  render() {
    return this.props.children(this.state.matches);
  }
}

function App() {
  return (
    <Media query="(max-width: 400px)">
      {(small) => (
        <Media query="(min-width: 800px)">
          {(large) => (
            <div className="media">
              <h1>Media</h1>
              <p>Small ? {small ? "Yep" : "Nope"}</p>
              <p>Large ? {large ? "Yep" : "Nope"}</p>
            </div>
          )}
        </Media>
      )}
    </Media>
  );
}

export default App;
