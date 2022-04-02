import React, { useState, useContext, useEffect } from "react";
import Row from "./Row";
import { ThemeContext, LocaleContext } from "../MediaQuery/context";
import "./Greeting.css";

// export default class Greeting extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: "Mary",
//       surname: "Jones",
//       width: window.innerWidth,
//     };
//     this.handleNameChange = this.handleNameChange.bind(this);
//     this.handleSurnameChange = this.handleSurnameChange.bind(this);
//     this.handleResize = this.handleResize.bind(this);
//   }

//   handleNameChange(e) {
//     this.setState({
//       name: e.target.value,
//     });
//   }
//   handleSurnameChange(e) {
//     this.setState({
//       surname: e.target.value,
//     });
//   }

//   handleResize() {
//     this.setState({
//       width: window.innerWidth,
//     });
//   }
//   componentDidMount() {
//     document.title = this.state.name + " " + this.state.surname;
//     window.addEventListener("resize", this.handleResize);
//   }

//   componentDidUpdate() {
//     document.title = this.state.name + " " + this.state.surname;
//     window.addEventListener("resize", this.handleResize);
//   }

//   componentWillUnmount() {
//     window.removeEventListener("resize", this.handleResize);
//   }

//   render() {
//     return (
//       <ThemeContext.Consumer>
//         {(theme) => (
//           <section className={theme}>
//             <Row label="Name">
//               <input value={this.state.name} onChange={this.handleNameChange} />
//             </Row>
//             <Row label="Surname">
//               <input
//                 value={this.state.surname}
//                 onChange={this.handleSurnameChange}
//               />
//             </Row>
//             <LocaleContext>
//               {(locale) => <Row label="language">{locale}</Row>}
//             </LocaleContext>

//             <Row label="Width">{this.state.width}</Row>
//           </section>
//         )}
//       </ThemeContext.Consumer>
//     );
//   }
// }

export default function Greeting(props) {
  const name = useFormInput("Mary");
  const surname = useFormInput("Jones");
  const theme = useContext(ThemeContext);
  const locale = useContext(LocaleContext);
  const width = useWindowWidth();
  useDocumentTitle(name.value + " " + surname.value);

  return (
    <section className={theme}>
      <Row label="Name">
        <input {...name} />
      </Row>
      <Row label="Surname">
        <input {...surname} />
      </Row>
      <Row label="Language">{locale}</Row>
      <Row label="Width">{width}</Row>
    </section>
  );
}

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return width;
}

function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  });
}

function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  function handleChanged(e) {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChanged,
  };
}
