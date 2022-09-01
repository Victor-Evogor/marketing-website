import {Link} from "react-router-dom"


function Nav({dropdown, search, suggestionsItems, input}){
    return (
        <nav className="navbar navbar-expand-lg bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">
            Mummy's Cake
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active">Home</Link>
              </li>
              <li className="nav-item">
                <Link to={"/layout/contact"} className="nav-link">Contact</Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  cakes
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="nav-link dropdown-item" href="/#showcase">
                      Cakes for you
                    </a>
                  </li>
                  <li>
                  <Link to={"/layout/contact"} className="nav-link dropdown-item">Order</Link>
                  </li>
                </ul>
              </li>
              
            </ul>
            {dropdown && <form className="d-flex position-relative" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search Cake"
                aria-label="Search"
                ref={input}
                onChange={search}
              />
              <ul
                className="dropdown-menu"
                id="search-dropdown"
                /* style={{
            bottom:-75
        }} */ ref={dropdown}
              >
                {suggestionsItems}
              </ul>
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>}
          </div>
        </div>
      </nav>
    );
}

export default Nav;