import { useRef, useState } from "react";

import countries from "../data/countries.json";


function Contact() {
  let input = useRef();
  let [wordCount, setWordCount] = useState(0);
  let [shortCode, setShortCode] = useState("");
  const MAX = 1000;
  const MIN = 20;
  

  function count() {
    setWordCount(input.current.value.length);
  }

  

  return (
    <section className="container my-3">
      <form className="row g-3" action="/layout/order">
        <div className="col-md-6">
          <label htmlFor="input-email" className="form-label">
            Email
          </label>
          <input type="email" className="form-control" id="input-email" required/>
        </div>
        <div className="col-md-6">
          <label htmlFor="input-name" className="form-label">
            Name
          </label>
          <input type="name" className="form-control" id="input-name" required/>
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="inputCity" className="form-label">
            City
          </label>
          <input type="text" className="form-control" id="inputCity" required/>
        </div>
        <div className="col-md-4">
          <label htmlFor="input-country" className="form-label">
            Country
          </label>
          <select id="input-country" className="form-select" required onChange={event => {

            setShortCode(event.target.value);
          }}>
            <option defaultValue value={""}>Choose...</option>
            {countries.sort((a,b)=>{
              return a.name.localeCompare(b.name);
            }).map((country, index)=>{
              return <option value={country.code} key={index}>{country.name}</option>
            })}
          </select>
        </div>
        <div className="col-md-2">
          <label htmlFor="inputZip" className="form-label">
            Zip
          </label>
          <input type="text" className="form-control" id="inputZip" required/>
        </div>

        <div className="col-md-8">
          <label htmlFor="cake-description" className="form-label">
            Cake Description
          </label>
          <div className="input-group">
            <span className="input-group-text">
              {wordCount}/{MAX}
            </span>
            <textarea
              className="form-control"
              id="cake-description"
              maxLength={MAX}
              minLength={MIN}
              placeholder="Atleast 20 characters"
              ref={input}
              onChange={count}
              required
            ></textarea>
          </div>
        </div>
        <div className="col-md-4">
          <label htmlFor="phone-number" className="form-label">
            Phone Number
          </label>
          <div className="input-group">
            <span className="input-group-text" id="basic-addon1">
              {shortCode[0] !== '+' && '+'}{shortCode || ""}
            </span>
            <input type="number" className="form-control" id="phone-number" required/>
          </div>
        </div>

        <div className="col-12">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="gridCheck"
            />
            <label className="form-check-label" htmlFor="gridCheck">
              I would like to recieve notification emails
            </label>
          </div>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Make Order
          </button>
        </div>
      </form>
    </section>
  );
}

export default Contact;
