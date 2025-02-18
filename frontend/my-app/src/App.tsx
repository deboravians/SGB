import { Outlet } from "react-router-dom";
import SideBar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Header />
      <SideBar />
      <Outlet />
    </>
  );
}

export default App;
