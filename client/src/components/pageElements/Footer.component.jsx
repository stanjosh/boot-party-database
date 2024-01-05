import { Image } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>

        <div className="footerContainer">

          <ul >
            <li className="socials">
              <a href="https://facebook.com/alviesboots" rel="noreferrer" target="_blank">
                <Image src="/facebook-svgrepo-com.svg" height="40cqh" />
              </a>  
              <a href="https://instagram.com/alviesboots" rel="noreferrer" target="_blank">
                <Image src="/instagram-round-svgrepo-com.svg" height="40cqh" />
              </a>  
              <a href="https://youtube.com/alviesboots" rel="noreferrer" target="_blank">
                <Image src="/youtube-round-svgrepo-com.svg" height="40cqh" />
              </a>  
            </li>
            <li>
              <a href="mailto:BootParty@Alvies.com">
                bootparty@alvies.com
              </a>
            </li>
            <li>
              <a href="tel:+15126197000">
                512-619-7000
              </a>
            </li>

            <li>
              <a href="https://bootparty.com/terms-of-service">
                Terms of Service
              </a>
            </li>
            <li>
            
              <a href="https://bootparty.com/privacy-policy">
                  Privacy Policy
              </a>

            </li>
            <li>
              <a href="https://alvies.com/" target="_blank" rel="noreferrer">
                Alvies.com
              </a>
            </li>
          </ul>
          
        </div>

    <div style={{width: "100%", textAlign: "end"}}>©2022 Alvies, LLC. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
