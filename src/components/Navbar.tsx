import "../App.css"
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import SearchComponent from "../pages/SearchComponent";

export default function Navbar(): JSX.Element {
  return (
    <nav className="nav navbar navbar-light">
      <Link to="/" className="site-title">
        NPM Registry
      </Link>

      {/* <ul>
        <SearchComponent />
      </ul> */}
    </nav>
  );
}
