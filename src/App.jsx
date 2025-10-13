
import './App.css'
import Button from "@mui/material/Button";
import MainContend from './components/MainContend';
import Container from "@mui/material/Container";
function App() {
 

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",   
          width: "100vw",
        }}
      >
        <Container maxWidth="xl">
          <MainContend />
        </Container>
      </div>
    </>
  );
}

export default App;
