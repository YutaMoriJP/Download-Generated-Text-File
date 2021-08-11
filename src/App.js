import Container, { Global } from "./components/Container";
import Theme from "./components/Theme";
import Form from "./components/Form";
import Fetch from "./components/Fetch";
function App() {
  return (
    <>
      <Global />
      <Container>
        <Theme />
        <Form />
        <Fetch />
      </Container>
    </>
  );
}

export default App;
