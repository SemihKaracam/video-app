import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import "./app.css"
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import Signin from "./pages/Signin/Signin";
import Video from "./pages/Video/Video";
function App() {
  const { currentUser } = useSelector(state=>state.user)
  return (
    <div className="container">
      <Navbar />
      <div className="wrapper">
        <Sidebar />
        <div className="main">
          <Routes>
            <Route path="/">
              <Route index element={<Home type="random" />} />
              <Route path="trends" element={<Home type="trend" />} />
              <Route path="subscriptions" element={currentUser ? <Home type="sub" /> : <Navigate to="/signin"/>}/>
              <Route path="search" element={<Search/>}/>
              
              <Route path="signin" element={currentUser ? <Navigate to="/"/>  : <Signin />} />
              <Route path="video">
                <Route path=":id" element={<Video />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
