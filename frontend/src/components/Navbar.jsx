import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        HN Stories
      </Link>

      <div style={styles.links}>
        {user ? (
          <>
            <Link to="/bookmarks" style={styles.link}>
              Bookmarks
            </Link>
            <span style={styles.name}>{user.name}</span>
            <button onClick={handleLogout} style={styles.button}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>
              Login
            </Link>
            <Link to="/register" style={styles.link}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 24px",
    backgroundColor: "#ff6600",
    color: "white",
  },
  logo: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "18px",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
  name: {
    color: "white",
  },
  button: {
    backgroundColor: "transparent",
    border: "1px solid white",
    color: "white",
    padding: "4px 10px",
    cursor: "pointer",
    borderRadius: "4px",
  },
};

export default Navbar;