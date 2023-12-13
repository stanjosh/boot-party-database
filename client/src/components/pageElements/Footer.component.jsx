import { Image } from "react-bootstrap";

const Footer = () => {
  return (

      <div>
        <div>

          <ul>
            <li style={{justifyContent: "space-between"}}>
              <a href="https://facebook.com/alviesboots" rel="noreferrer" target="_blank">
                <Image src="../../../public/facebook-svgrepo-com.svg" height="40cqh" />
              </a>  
              <a href="https://instagram.com/alviesboots" rel="noreferrer" target="_blank">
                <Image src="../../../public/instagram-round-svgrepo-com.svg" height="40cqh" />
              </a>  
              <a href="https://youtube.com/alviesboots" rel="noreferrer" target="_blank">
                <Image src="../../../public/youtube-round-svgrepo-com.svg" height="40cqh" />
              </a>  
            </li>
              <a href="mailto:BootParty@Alvies.com">
            <li>
                bootparty@alvies.com
            </li>
              </a>
              <a href="tel:+15126197000">
            <li>
                512-619-7000
            </li>
              </a>
              <a href="https://alvies.com/" target="_blank">
            <li>
                Alvies.com
            </li>
              </a>
              <a href="https://bootparty.com/terms-of-service">
            <li>
                Terms of Service
            </li>
              </a>
            <a href="https://bootparty.com/privacy-policy">
              <li>
                  Privacy Policy
              </li>
            </a>
           
          </ul>
        </div>
        ©2022 Alvies, LLC. All rights reserved.
      </div>

  );
};

export default Footer;
