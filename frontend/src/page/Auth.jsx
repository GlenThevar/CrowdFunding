import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

import LogIn from "../components/spline/LogIn";

gsap.registerPlugin(useGSAP, ScrambleTextPlugin);

const Auth = () => {
  useGSAP(() => {
    let headingText = gsap.timeline({
      repeat: -1,
      repeatDelay: 2,
      ease: "elastic",
    });
    headingText
      .to(".box", {
        duration: 2,
        scrambleText: { text: "Join the Funds" },
      })
      .to(".box", {
        duration: 2,
        delay: 2,
        scrambleText: {
          text: "Funding without borders",
        },
      })
      .to(".box", {
        duration: 2,
        delay: 2,
        scrambleText: {
          text: "Together Sparks Change",
        },
      })
      .to(".box", {
        duration: 2,
        delay: 2,
        scrambleText: {
          text: "Invent. Inspire. Impact.",
        },
      });
  });

  return (
    <>
      <LogIn />
      <div className="absolute left-[43vw] bottom-[50vh] flex flex-col text-center">
        <p className="box1 font-auth text-7xl">Hello</p>
        <p className="box2 font-auth text-7xl">World</p>
        <p className="box3 font-auth text-7xl">Gia</p>
      </div>
    </>
  );
};

export default Auth;
