"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import ThemeToggle from "./ThemeToggle";
import { useDarkMode } from "../hooks/useDarkMode";
import { StateContext } from "../context/StatesContext";
import gsap from "gsap";

const Navbar = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false); // Ensure hydration is complete
  const { theme, toggleTheme } = useDarkMode();
  const { currentTheme, setShowWorks, showWorks } = useContext(StateContext);
  const worksButtonRef = useRef<HTMLButtonElement | null>(null);
  const buttonSvg = useRef(null);
  const openTl = gsap.timeline();
  const closeTl = gsap.timeline();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      document.querySelector("#home")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [router.pathname]);

  const openWorksAnim = () => {
    if (!worksButtonRef.current) return;

    gsap.to(".marquee-wrapper", {
      y: "-8dvh",
      ease: "power3.inOut",
      duration: 2,
      xPercent: -10,
    });

    openTl.to(worksButtonRef.current.children[0], {
      opacity: 0,
      yPercent: -100,
      duration: 2,
      ease: "power4.inOut",
    });

    openTl.to(
      worksButtonRef.current.children[1],
      {
        opacity: 1,
        yPercent: 0,
        duration: 2,
        ease: "power4.inOut",
      },

      "-=1.8"
    );
  };

  const closeWorksAnim = () => {
    if (!worksButtonRef.current) return;
    closeTl.to(worksButtonRef.current.children[0], {
      opacity: 1,
      yPercent: 0,
      duration: 2,
      ease: "power4.inOut",
    });

    closeTl.to(
      worksButtonRef.current.children[1],
      {
        duration: 1,
        ease: "power4.inOut",
        opacity: 0,
        yPercent: 100,
      },
      "-=4"
    );

    gsap.to(".marquee-wrapper", {
      y: 0,
      ease: "power3.inOut",
      duration: 1,
      delay: 0.5,
      xPercent: 0,
    });
  };

  const onHoverAnimation = () => {
    if (!buttonSvg.current) return;
    if (currentTheme === "dark") {
      gsap.to([(buttonSvg as any).current.children], {
        fill: "#151515",
      });
    } else {
      gsap.to([(buttonSvg as any).current.children], {
        fill: "white",
      });
    }
  };

  const onHoverOutAnimation = () => {
    if (!buttonSvg.current) return;
    if (currentTheme === "dark") {
      gsap.to((buttonSvg as any).current.children, {
        fill: "#151515",
      });
    } else {
      gsap.to((buttonSvg as any).current.children, {
        fill: "white",
      });
    }
  };

  useEffect(() => {
    if (showWorks) {
      openWorksAnim();
    } else if (!showWorks) {
      closeWorksAnim();
    }
  }, [showWorks]);

  if (!isHydrated) return null;

  const openWorksModal = () => {
    setShowWorks(!showWorks);
  };

  return (
    <div
      className={`fixed top-[1.875rem] z-[80] w-full ${
        router.pathname === "/"
          ? "nav text-[#E5E7EB]"
          : "bg-[#ffffff] text-[#374151] border-b-2 border-b-[#F7F9FC]"
      } ${
        isScrolled &&
        router.pathname === "/" &&
        "scrolledNav border-b-2 border-b-[#1F2937]"
      }`}
    >
      <div className="w-11/12 lg:w-full lg:max-w-[90rem] xl:max-w-[77rem] mx-auto flex items-center justify-between text-[1rem]">
        <div className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="46"
            viewBox="0 0 32 46"
            fill="none"
          >
            <path
              d="M0 10.4496V0.542373C7.88072 0.617419 9.30676 0.0169643 15.8365 1.74323C26.4704 4.55453 33.2282 16.0079 31.0726 28.0874C30.292 32.2904 24.9181 44.557 11.5584 45.5H0V35.6679H8.85643C11.7005 35.436 13.8851 34.9173 16.4369 33.3412C27.0196 24.4848 19.7393 10.8248 9.68203 10.4496H0Z"
              className={`dark:fill-[#ffffff]  fill-[#151515]  transition-colors duration-900`}
            />
            <rect
              y="17.7625"
              width="10.3575"
              height="10.3575"
              className={`dark:fill-[#ffffff]  fill-[#151515]  transition-colors duration-900`}
            />
          </svg>
        </div>

        <div className="marquee-wrapper overflow-hidden relative w-[40rem] lg:ml-24 max-w-[40rem]">
          <div className="marquee flex items-center gap-[10px] text-[1.875rem]">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-[10px] min-w-max pl-6 dark:text-white text-[#151515]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <g filter="url(#filter0_b_87_233)">
                    <circle cx="10" cy="10" r="10" fill="#B5FFBA" />
                  </g>
                  <circle cx="10" cy="10" r="6" fill="#43DC4D" />
                  <defs>
                    <filter
                      id="filter0_b_87_233"
                      x="-20"
                      y="-20"
                      width="60"
                      height="60"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feGaussianBlur
                        in="BackgroundImageFix"
                        stdDeviation="10"
                      />
                      <feComposite
                        in2="SourceAlpha"
                        operator="in"
                        result="effect1_backgroundBlur_87_233"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_backgroundBlur_87_233"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
                <p> accepting new projects-let&apos;s collaborate!</p>
              </div>
            ))}
          </div>
        </div>

        <button
          className={`${
            currentTheme === "dark" && "dark-button"
          }  flex flex-col items-center justify-center gap-[10px] h-max w-max max-h-max overflow-hidden  py-[0.2rem] px-[2.75rem]  border-2 text-[2.125rem]  dark:border-[#FFF] border-[#151515]  transition-colors duration-900`}
          onClick={() => {
            openWorksModal();
          }}
          ref={worksButtonRef}
          onMouseEnter={onHoverAnimation}
          onMouseLeave={onHoverOutAnimation}
        >
          <span className="min-h-max max-h-max overflow-hidden">
            <p>Works</p>
          </span>

          <svg
            viewBox="0 0 12 10"
            className="hamburger absolute opacity-0"
            height="40px"
            width="40px"
            ref={buttonSvg}
          >
            <path
              d="M10,2 L2,2"
              className="bar1 stroke-[black] dark:stroke-[white]  transition-colors duration-900"
            ></path>
            <path
              d="M2,5 L10,5"
              className="bar2 stroke-[black] dark:stroke-[white]  transition-colors duration-900"
            ></path>
            <path
              d="M10,8 L2,8"
              className="bar3 stroke-[black] dark:stroke-[white]  transition-colors duration-900"
            ></path>
          </svg>
        </button>
      </div>
      <ThemeToggle />
    </div>
  );
};

export default Navbar;
