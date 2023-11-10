// import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faGithub } from "@fortawesome/free-brands-svg-icons";
// import "../style/Footer.css";

// Developers' Github name, url, icon, and color.
const socials = [
  {
    name: "Ibrahim's GitHub",
    url: "https://github.com/IbrahimAllison",
    icon: '',//faGithub,
    color: "#ffd700",
  },
  {
    name: "Joshua's GitHub",
    url: "https://github.com/stanjosh",
    icon: '',//faGithub,
    color: "#ffd700",
  },
  {
    name: "Evelyn's GitHub",
    url: "https://github.com/Eveykins86",
    icon: '',//faGithub,
    color: "#ffd700",
  },
  {
    name: "Alexis' GitHub",
    url: "https://github.com/alexisstrong11",
    icon: '',//faGithub,
    color: "#ffd700",
  },
];

// Footer component
const Footer = () => {
  return (
    <footer className="footer bg-goldenbrown text-white">
      <div className="footer-container">
        <section className="social-icons-wrapper d-flex flex-md-row justify-content-center">
          {socials.map(({ name, url, icon, color }) => (
            <div
              key={name}
              className="d-flex flex-column align-items-center mx-md-2 transparent-bg"
            >
              <a
                href={url}
                className={`icon ${name}`}
                target="_blank"
                rel="noreferrer"
              >
                {/* <FontAwesomeIcon
                  icon={icon}
                  bounce
                  className="footer-icon-size"
                  style={{ color: color }}
                />
                
                
                just put in a github logo here i guess -josh*/}

                
              </a>
              <a href={url} target="_blank" rel="noreferrer">
                <span className="d-inline-block mx-1 name">{name}</span>
              </a>
            </div>
          ))}
        </section>
        <section className="form-footer">
          <h5 className="designer-text">Designed by InventoryWiz Team</h5>
          
            <h6 className="copyright-text">&copy; {new Date().getFullYear()}</h6>
          
        </section>
      </div>
    </footer>
  );
};
// Export Footer
export default Footer;
