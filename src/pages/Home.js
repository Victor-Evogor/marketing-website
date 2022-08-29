//import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Dropdown, Carousel as Carousels } from "bootstrap/dist/js/bootstrap.esm.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import camelcase from "camelcase";
import images from "../data/images.js";
import { useState, useRef, useEffect, useContext, createContext, } from "react";
import "./home.css";
import cakes from "../data/cakes.json";
import Nav from "../components/nav.js";
import Footer from "../components/footer.js";
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
      <Nav dropdown={dropdown} suggestionsItems={suggestionsItems} search={search} input={input}/>
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
