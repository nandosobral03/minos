import { useRouter } from 'next/router';
import styles from '../styles/NavBar.module.css'

const NavBar = () =>{
    const router = useRouter();
    const currentRoute = router.asPath

    const routes = [
        {
            name: 'Visualizer',
            path: '/',
        },
        {
            name: 'About',
            path: '/about'
        }
    ]
    
    
    return (
        <div className={styles.nav}>
            {routes.map((route, index) => 
            (
                <div key={index} className={`${styles.navItem} ${currentRoute === route.path ? styles.active : ''}`}
                    onClick={() => window.location.pathname = route.path}
                    >
                    {route.name}
                </div>
            )
        )}
        </div>
    )


}

export default NavBar