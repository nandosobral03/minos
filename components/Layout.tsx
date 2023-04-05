import NavBar from "./NavBar";
import style from "../styles/Layout.module.css";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={style.layout}>
      <NavBar />
       <div className={style.container}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
