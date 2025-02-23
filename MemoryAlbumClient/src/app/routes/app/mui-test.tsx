import Button from "@mui/material/Button";
import axios from "axios";

// TODO: https://www.youtube.com/watch?v=h9KevTtI5O0&list=PLDxCaNaYIuUlG5ZqoQzFE27CUOoQvOqnQ&index=1

async function callApi() {
  const URL = "http://localhost:5226";

  const response = await axios.get(`${URL}/api/Albums`, {});

  console.log(response);
}

export default function MuiTest() {
  return (
    <Button variant="contained" onClick={callApi}>
      Call API
    </Button>
  );
}
