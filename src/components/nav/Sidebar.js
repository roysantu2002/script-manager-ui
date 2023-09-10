import styles from './Sidebar.module.css'; // Import the CSS module
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaSignInAlt } from "react-icons/fa";
import routes from "../../routes"
import { useUser } from "../UserContext";

const Sidebar = ({ handleSidebarToggle, sidebarMenuActive }) => {
  const { user, logout } = useUser(); // Get user and logout function from the context
  console.log(routes)
  const router = useRouter();

  const role = user && user.role || null

  const handleLogout = () => {
    logout();
    router.push("/")
  };


  const filteredRoutes = routes.filter((route) => {
    if (
      route.name.toLowerCase() === "home" 
    ) {
      return true;
    }

    if (role === "admin") {
      // Show all routes to admin
      return true;
    }

    return route.role.includes("user");
  });

  return (
    <section
      className={styles["sidebar"]}
      style={{
        position: "fixed",
        top: 0,
        left: sidebarMenuActive ? 0 : "-250px",
        width: "250px",
        height: "100%",
        overflowY: "auto",
        boxShadow: "2px 0px 5px rgba(0, 0, 0, 0.2)",
        transition: "left 0.3s ease-in-out",
      }}
    >
      <button
        className={styles["sidebar-close-btn"]}
        onClick={handleSidebarToggle}
      >
        x
      </button>

      <div className={styles["logo-container"]}>
        <Link href='/' legacyBehavior>
          <Image
            src='/images/ScriptGeniusText.png'
            alt='ScriptGeni'
            width={100}
            height={40}
          />
        </Link>
      </div>
      <hr className='text-primary' />

      <ul className={styles["sidebar-container"]}>
        {filteredRoutes && filteredRoutes.map((page, index) => (
          <li
            key={index}
            className={`${styles["sidebar-menu-item"]} ${
              router.route === page.to ? styles["active"] : styles["inactive"]
            }`}
          >
            {page.to.includes("#") ? (
              <Link href={`/${page.to}`}>
                <>
                  <span>
                    <page.Icon />
                  </span>
                  <span>{page.name}</span>
                </>
              </Link>
            ) : (
              <Link href={page.to}>
                <>
                  <span>
                    <page.Icon />{" "}
                  </span>
                  <span>{page.name}</span>
                </>
              </Link>
            )}
          </li>
        ))}
      </ul>
      <hr />

      <ul className={styles["sidebar-footer"]}>
        <li className={styles["footer-item"]}>
              <button className='btn btn-outline-danger bg-white' onClick={handleLogout}>
                <FaSignInAlt size={20} className='text-danger'/>
       
              <span className='text-danger'> LOGOUT</span>
            </button>
      
        </li>
      </ul>
    </section>
  );
};

export default Sidebar;