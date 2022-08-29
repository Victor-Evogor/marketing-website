//import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Dropdown, Carousel as Carousels } from "bootstrap/dist/js/bootstrap.esm.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import camelcase from "camelcase";
import images from "../data/images.js";
import { useState, useRef, useEffect, useContext, createContext, } from "react";
import "./home.css";
import cakes from "../data/cakes.json";
let { hero } = images;

let GlobalStore = createContext();


//window.dropdwon = Dropdown;

function Header() {
  let input = useRef();
  let dropdown = useRef();
  let { cakeList } = cakes;
  let [suggestionsItems, setItems] = useState([]);
  let suggestions;
  const div = useContext(GlobalStore);

  useEffect(() => {}, []);

  function scrollToItem(event) {
    let index = event.target.getAttribute("data-index");
    const carousel = new Carousels(div.current);
    carousel.to(index);
    carousel.pause();
    suggestions.hide();
    input.current.value = "";
  }

  function addSuggestion(array) {
    setItems([]);
    array.forEach((elem, key) => {
      setItems((val) =>
        val.concat(
          <li className="" key={key} onClick={scrollToItem}>
            <a className="dropdown-item" href="#showcase" data-index={elem.id - 1}>
              {elem.name}
            </a>
          </li>
        )
      );
    });
  }

  function search() {
    suggestions = new Dropdown(dropdown.current);
    let { value } = input.current;
    if (!value) return suggestions.hide();

    let regexp = new RegExp(`^${value}`, "i");
    let result = cakeList.reduce((acc, cakeName) => {
      if (cakeName.name.match(regexp)) {
        return acc.concat(cakeName);
      }

      return acc;
    }, []);

    if (result) {
      if (result.length) {
        addSuggestion(result);
        suggestions.show();
      } else {
        suggestions.hide();
      }
    }
  }

  return (
    <header>
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
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  contact
                </a>
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
                    <a className="dropdown-item" href="#">
                      Cakes for you
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Order
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Sign Up
                </a>
              </li>
            </ul>
            <form className="d-flex position-relative" role="search">
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
            </form>
          </div>
        </div>
      </nav>
      <section
        id="hero"
        className="text-light d-flex justify-content-center align-items-center "
      >
        <div>
          <h1 className="text-primary display-2 fw-bold text-center">
            <span className="text-milk">Mummy's</span> Cake
          </h1>
          <p className="text-center lead fw-bold">
            We deliver the best cake at affordable prices
            <br />
            Make your orders today
          </p>
        </div>
      </section>
    </header>
  );
}

function Showcase() {
  let { cakeList } = cakes;


  return (
    <section id="showcase" className="row py-3  container">
      <div className="  col-sm-5">
        <Carousel>
          {cakeList.reduce((a, cake, index) => {
            let img = images[camelcase(cake.name)];
            return a.concat(
              <Card
                title={cake.name}
                body={cake.desc}
                price={cake.price}
                img={img}
                key={index}
              />
            );
          }, [])}
        </Carousel>
      </div>
      <div className="col-sm-7">
        <h2>Any type of cake shipped to your doorstep!</h2>
        <p className="lead">
          We are the leading brand in the cake industry in over five continents.
          Started in 1982, we have delivered cakes to millions around the globe
          bringing joy to people of different colors and ethnicity.
        </p>
        <p className="lead">
          From almost anywhere in the world, order your cake and have it
          delivered to you in less than a week.
          <br />
          Looking for something unique? Contact us on our contact page and have
          a custom cake ready for you!
        </p>
        <figure>
          <blockquote className="blockquote">
            <p>
              Fast and reliable, the best cake delivery service of the 21st
              century!
            </p>
          </blockquote>
          <figcaption className="blockquote-footer">
            CEO of anonymous, John Doe.{" "}
            <cite title="Source Title">21st Century News</cite>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function Carousel({ children }) {

  let carousel = useContext(GlobalStore);

  return (
    <div
      id="display-carousel"
      className="carousel slide w-100"
      data-bs-ride="carousel"
      ref={carousel}
    >
      <div className="carousel-inner ">
        {children.reduce((a, item, index) => {
          if (index === 0)
            return a.concat(
              <div
                className="carousel-item active"
                key={index}
                data-bs-interval="6000"
              >
                {item}
              </div>
            );
          return a.concat(
            <div className="carousel-item" key={index} data-bs-interval="6000">
              {item}
            </div>
          );
        }, [])}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#display-carousel"
        data-bs-slide="prev"
      >
        <span
          className="carousel-control-prev-icon text-primary"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#display-carousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

function Card({ img, title, body, price }) {
  return (
    <div className="card">
      <img className="card-img-top" src={img} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{body}</p>
        <a href="#" className="btn btn-primary">
          Order
        </a>
      </div>
      <div className="card-footer">${price}</div>
    </div>
  );
}

function Footer() {
  return <footer className="py-2">
    <div className="container text-center">
      <p className="small text-light">Mummy's Cake | copyright {(new Date()).getFullYear()}&copy;</p>
      <div className="alert alert-danger d-flex align-items-center" role="alert" >
  <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2 " viewBox="0 0 16 16" role="img" aria-label="Warning:" style={{
    width:"20px",
    height:"20px"
  }}>
    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
  </svg>
  <div className="small">
    <strong>DISCLAIMER:</strong> This website was made by <a href="#" className="alert-link">Victor Evogor</a> as a personal project! None of the cakes or orders are real.
  </div>
</div>
      
    </div>
  </footer>;
}

function Home() {
  let [carousel,_] = useState(useRef());

  return (
    <>
      <GlobalStore.Provider value={carousel}>
      <Header />
      <Showcase />
      </GlobalStore.Provider>
      <Footer/>
    </>
  );
}

export default Home;
