import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import PolaroidDrop from "./PolaroidDrop.component";
import { EventForm } from "../components/forms";


const LandingPage = () => {
    const [scrollY, setScrollY] = useState(0);
    const [showNewEventModal, setShowNewEventModal] = useState(false);

    useEffect(() => {
      window.addEventListener("scroll", () => {
        setScrollY(window.scrollY);
      });
    }, [scrollY])

    return (
      <>
        <div className="landingPageBox" style={{minWidth: "100%", textAlign: "center", alignContent: "center"}}>
          <div style={{maxWidth: "600px", margin: "auto"}}>
            <h1 className="landingPageTitle">boot fittings anywhere</h1>
          
          <Button onClick={() => setShowNewEventModal(true)} className="landingPageButton" style={{borderRadius: "2px"}}>book in austin</Button>
          </div>
        </div>

        <div className="landingPageBox" 
            style={{
            backgroundColor: "aliceblue",
            minWidth: "100%", 
            justifyContent: "center", 
            alignContent: "Center", 
            alignItems: "center",
            overflow: "hidden"
          }}>
            <PolaroidDrop />
          <div className="landingPageTextBlock" style={{maxWidth:"600px"}}>


            <h2 className="landingPageTitle">KICK UP YOUR FEET</h2>
            <h3 className="landingPageTitle">WE&apos;LL COME TO YOU</h3>

            
            {secondPanelContent}

            <Button onClick={() => setShowNewEventModal(true)} className="landingPageButton"  style={{borderRadius: "2px"}}>LET&apos;S GO</Button>
          </div>
        </div>
          <div className="landingPageBox imageBG" style={{
            marginTop: "0", 
            minWidth: "100%",
            backgroundImage: "url(https://alvies-test.imgix.net/gsmith_20220611_0019.jpg?ar=1%3A1&auto=compress%2Cformat&dm=1656514717&fit=crop&ixlib=php-3.1.0&w=1500"
        }}>
            <div className="pblock" style={{textAlign: "left", alignSelf: "start"}}>
            <h4>THE REVIEWS ARE IN:</h4>
            { reviewsContent }
          </div>
          <div className="pblock" style={{textAlign: "right", alignSelf: "end", display: "inline-block"}}>
              <h4>CHOOSE YOUR BOOT PARTY</h4>
              <strong><a href="/book">Party of 1 (just you)</a></strong>
              <p>
              It&apos;s kinda like the Uber of boots, with a personalized boot fitter that knows 
              everything there is to know about boots, fit, and a good experience. One-time $50 
              delivery fee.
              </p>
              <strong><a href="/book">BFF aka - Boot Fitting Friend - (2 people)</a> </strong>
              <p>
              This could be a couple, roommates, a best bud, a first date, or you and your Mom. Whose eye do you trust most? One-time $50 delivery fee.
              </p>
              <strong><a href="/book">Boot Pachanga (3-5 people)</a></strong>
              <p>
              Perfect for a few friends, groomsmen, family gift buying, and hippie communes. One-time $50 delivery fee.
              </p>

              <strong><a href="/book">Bootenanny (5-15 people)</a></strong>
              
              <p>            
              We can come to your Christmas party, fantasy draft, happy hour, surprise party. And it’s FREE.
              </p>
              
              <strong><a href="/book">Boot-Spree (Corporate events, 15+ people parties)</a></strong>
              <p>
              What better way to celebrate with the folks who walk the walk with you? We can accommodate all sizes of companies — from mom &amp; pops and start-ups to inter-galactic tech companies.
              </p>
          </div>
        </div>
        <div style={{width: "100%", backgroundColor: "aliceblue", paddingTop: "15px", paddingBottom: "15px", textAlign: "center"}}>
          <Button onClick={() => setShowNewEventModal(true)} className="landingPageButton"  style={{borderRadius: "2px"}}>KICK IT OFF</Button>
        </div>
        <Modal show={showNewEventModal} onHide={() => setShowNewEventModal(false)} >
                    
                    
    
                    <Modal.Body className="text-light" style={{backgroundColor: "var(--alviesBlue)"}}>
                        <EventForm submitText={'create'} success={() => setShowNewEventModal(false)}/>
                    </Modal.Body>
          </Modal>
      </>
    );
  };
  
  export default LandingPage;


  const secondPanelContent = (
    <>
      <p style={{fontFamily: '"work-sans",sans-serif', fontWeight: "600",  fontSize: "1.5cqh" }}>
        We want to provide the best guest experience in all of footwear. 
        Because if you can’t have fun trying on boots, you’re doing it wrong. 
        We will literally drive a van-full of boots to you for a personal 
        boot-fitting, wherever you are. Your couch? Cool. Work, no problemo. 
        Got a favorite park bench? Drop us a pin. We want you to feel 
        comfortable trying on our boots, and pulling them off. We’ll bring a 
        few sizes and styles of your choice, for you (and whoever else may be 
        joining) to find the perfect pair, and answer all your boot-wearin’ 
        questions with trusted expertise.
      </p>
    </> )

  const reviewsContent = (
    <>
      <p>&quot;Our Boot Party was a huge success! Alvies arrived timely with 
      all the boots (for 12 people) and they were set up and ready to start 
      fitting as soon as we started to arrive. Everything was timely, not 
      rushed, and they took care of everyone individually like they were the 
      only one there. Two days post-party and everyone is wearing their boots 
      into the office and still reflecting on the fun event. I&apos;ve never 
      received as many kudos at previous events I&apos;ve planned.&quot;</p>
        <p>
          &quot;I highly recommend using Alvies Boot Party for any event including 
          companies and friends&apos; gatherings. Thank you, Alvies!!&quot;
        </p>
        <p style={{textAlign: "right"}}>
          &mdash; Stephanie Martin
        </p>
    </> )