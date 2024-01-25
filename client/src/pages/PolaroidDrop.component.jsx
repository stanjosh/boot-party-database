


import React from 'react';

const PolaroidDrop = () => {
    return (
        <div style={{position: "relative", width: "100cqw", height: "0"}} className="smallHide">
        <div style={{
          backgroundImage: "url(https://alvies-test.imgix.net/Image_20220613_0001.jpg?ar=1.04%3A1&auto=compress%2Cformat&dm=1656514443&fit=crop&ixlib=php-3.1.0&w=400)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          position: "absolute", display: "block", width: "32cqh", height: "32cqh", top: `-18cqh`, right: "0%", backgroundColor: "#123455", zIndex: "4", transform: `translateY(${.45 * scrollY}px) rotate3d(2, 2, -1, ${scrollY * 0.04}deg)`} }>
          <img src="https://alvies-test.imgix.net/polaroid/polaroid-frame.png?auto=compress%2Cformat&dm=1654211509&fit=clip&ixlib=php-3.1.0&w=400" style={{position: "relative", top: "-5px", left: "-5px", width: "34cqh", height: "34cqh"}}></img>
        </div>
        <div style={{
          backgroundImage: "url(https://alvies-test.imgix.net/IMG-1037.jpg?ar=1.04%3A1&auto=compress%2Cformat&dm=1656515997&fit=crop&ixlib=php-3.1.0&w=400)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          position: "absolute", display: "block", width: "32cqh", height: "32cqh", top: `-48cqh`, right: "0%", backgroundColor: "#123455", zIndex: "4", transform: `translateY(${.30 * scrollY}px) rotate3d(2,-1,0, ${scrollY * -0.03}deg)`} }>
          <img src="https://alvies-test.imgix.net/polaroid/polaroid-frame.png?auto=compress%2Cformat&dm=1654211509&fit=clip&ixlib=php-3.1.0&w=400" style={{position: "relative", top: "-5px", left: "-5px", width: "34cqh", height: "34cqh"}}></img>
        </div>
        <div style={{
          backgroundImage: "url(https://alvies-test.imgix.net/gsmith_20220611_0184.jpg?ar=1.04%3A1&auto=compress%2Cformat&dm=1656514656&fit=crop&ixlib=php-3.1.0&w=300)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          position: "absolute", display: "block", width: "32cqh", height: "32cqh", top: `-48cqh`, left: "0%", backgroundColor: "#123455", zIndex: "4", transform: `translateY(${.30 * scrollY}px) rotate3d(2, -1, -2, ${scrollY * 0.05}deg)`} }>
          <img src="https://alvies-test.imgix.net/polaroid/polaroid-frame.png?auto=compress%2Cformat&dm=1654211509&fit=clip&ixlib=php-3.1.0&w=400" style={{position: "relative", top: "-5px", left: "-5px", width: "34cqh", height: "34cqh"}}></img>
        </div>
        <div style={{
          backgroundImage: "url(https://alvies-test.imgix.net/gsmith_20220611_0264.jpg?ar=1.04%3A1&auto=compress%2Cformat&dm=1656515268&fit=crop&ixlib=php-3.1.0&w=300)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          position: "absolute", display: "block", width: "32cqh", height: "32cqh", top: `0cqh`, left: "0%", backgroundColor: "#123455", zIndex: "4", transform: `translateY(${.30 * scrollY}px) rotate3d(-3, -4, 3, ${scrollY * 0.03}deg)`} }>
          <img src="https://alvies-test.imgix.net/polaroid/polaroid-frame.png?auto=compress%2Cformat&dm=1654211509&fit=clip&ixlib=php-3.1.0&w=400" style={{position: "relative", top: "-5px", left: "-5px", width: "34cqh", height: "34cqh"}}></img>
        </div>
      </div>
    );
};

export default PolaroidDrop;
