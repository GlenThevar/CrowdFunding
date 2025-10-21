import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const ButtonAuth = () => {
  const buttonRef = useRef(null);

  useEffect(() => {
    class Button {
      constructor(buttonElement) {
        this.block = buttonElement;
        this.init();
        this.initEvents();
      }

      init() {
        const el = gsap.utils.selector(this.block);

        this.DOM = {
          button: this.block,
          flair: el(".button__flair"),
        };

        this.xSet = gsap.quickSetter(this.DOM.flair, "xPercent");
        this.ySet = gsap.quickSetter(this.DOM.flair, "yPercent");
      }

      getXY(e) {
        const { left, top, width, height } =
          this.DOM.button.getBoundingClientRect();

        const xTransformer = gsap.utils.pipe(
          gsap.utils.mapRange(0, width, 0, 100),
          gsap.utils.clamp(0, 100)
        );

        const yTransformer = gsap.utils.pipe(
          gsap.utils.mapRange(0, height, 0, 100),
          gsap.utils.clamp(0, 100)
        );

        return {
          x: xTransformer(e.clientX - left),
          y: yTransformer(e.clientY - top),
        };
      }

      initEvents() {
        this.DOM.button.addEventListener("mouseenter", (e) => {
          const { x, y } = this.getXY(e);

          this.xSet(x);
          this.ySet(y);

          gsap.to(this.DOM.flair, {
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          });
        });

        this.DOM.button.addEventListener("mouseleave", (e) => {
          const { x, y } = this.getXY(e);

          gsap.killTweensOf(this.DOM.flair);

          gsap.to(this.DOM.flair, {
            xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
            yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
            scale: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        this.DOM.button.addEventListener("mousemove", (e) => {
          const { x, y } = this.getXY(e);

          gsap.to(this.DOM.flair, {
            xPercent: x,
            yPercent: y,
            duration: 0.4,
            ease: "power2",
          });
        });
      }
    }

    if (buttonRef.current) {
      new Button(buttonRef.current);
    }
  }, []);

  return (
    <div className="flex items-center justify-around flex-col min-h-screen">
      <a
        href="#"
        ref={buttonRef}
        data-block="button"
        className="
          relative inline-flex items-center justify-center gap-1.5
          px-6 py-3 rounded-full font-semibold text-lg tracking-tight leading-tight
          text-white border-2 border-white
          overflow-hidden cursor-pointer select-none
          transition-colors duration-150
          hover:text-black
        "
      >
        <span className="button__flair absolute inset-0 pointer-events-none scale-0 origin-top-left will-change-transform before:content-[''] before:absolute before:top-0 before:left-0 before:w-[170%] before:aspect-square before:rounded-full before:bg-white before:-translate-x-1/2 before:-translate-y-1/2" />

        <span className="relative text-center transition-colors duration-150">
          Get GSAP
        </span>
      </a>
    </div>
  );
};

export default ButtonAuth;
