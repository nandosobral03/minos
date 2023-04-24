import { useRouter } from "next/router";
import styles from "../styles/NavBar.module.scss";
import icon from "../public/icon.png";
import Image from "next/image";
const NavBar = () => {
  const router = useRouter();
  const currentRoute = router.asPath;

  const routes = [
    {
      name: "Visualizer",
      path: "/visualizer",
    },
    {
      name: "About",
      path: "/about",
    },
  ];

  return (
    <div className={styles.nav}>
      <div className={styles.navigation}>
        {routes.map((route, index) => (
          <div
            key={index}
            className={`${styles.navItem} ${
              currentRoute === route.path ? styles.active : ""
            }`}
            onClick={() => (window.location.pathname = route.path)}
          >
            {route.name}
          </div>
        ))}
      </div>
      <div className={styles.icon}>
        <Image src={icon} alt="icon" width={100} height={100} />
      </div>
    </div>
  );
};

export default NavBar;
