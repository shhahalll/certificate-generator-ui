import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListTable from "./components/ListTable";
import NotFound from "./components/not-found";
import Box from "./components/certificate-form";
import CoreBox from "./components/core-certificate-form";
import LoginBox from "./components/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Box />} />
        <Route path="/core/" element={<CoreBox />} />
        <Route path="/login/" element={<LoginBox />} />
        <Route path="/list/" element={<ListTable />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
