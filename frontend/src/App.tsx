import { Routes , Route} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Questions from "./pages/Questions";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <Routes>
      <Route path="/" element = {<Register/>}/>
      <Route path="/register" element = {<Register/>}/>
      <Route path="/login" element = {<Login/>}/>
      <Route path="/questions" element = {
      <ProtectedRoute>
      <Questions/>
      </ProtectedRoute>}/>
      <Route path="/dashboard" element = {
        <ProtectedRoute>
          <Dashboard/>
        </ProtectedRoute>}/>
    </Routes>
  )
}

export default App;