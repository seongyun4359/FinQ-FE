import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat/ChatPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
