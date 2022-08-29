function Footer() {
  return (
    <footer className="py-2">
      <div className="container text-center">
        <p className="small text-light">
          Mummy's Cake | copyright {new Date().getFullYear()}&copy;
        </p>
        <div
          className="alert alert-danger d-flex align-items-center"
          role="alert"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2 "
            viewBox="0 0 16 16"
            role="img"
            aria-label="Warning:"
            style={{
              width: "20px",
              height: "20px",
            }}
          >
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
          <div className="small">
            <strong>DISCLAIMER:</strong> This website was made by{" "}
            <a href="#" className="alert-link">
              Victor Evogor
            </a>{" "}
            as a personal project! None of the cakes or orders are real.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
