import Container, { Global } from "./components/Container";
import Theme from "./components/Theme";
import Form from "./components/Form";

function App() {
  return (
    <>
      <Global />
      <Container>
        <Theme />
        <Form />
      </Container>
    </>
  );
}

export default App;
