import NavBar from "./NavBar";
import style from "../styles/Layout.module.scss";
import Head from "next/head";
const Layout = ({ children, title }: { children: React.ReactNode, title?:string }) => {
  return (
    <>
    <Head>
        <title>{ title || "Minos"}</title>
      </Head>
        <div className={style.layout} id="layout">
          <NavBar />
          <div className={style.container}>
            {children}
          </div>
        </div>
    </>
  );
};

export default Layout;
