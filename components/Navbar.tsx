"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import ThemeToggle from "./ThemeToggle";
import { useDarkMode } from "../hooks/useDarkMode";
import { StateContext } from "../context/StatesContext";

const Navbar = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false); // Ensure hydration is complete
  const { theme, toggleTheme } = useDarkMode();
  const { currentTheme, setShowWorks, showWorks } = useContext(StateContext);

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

  if (!isHydrated) return null;

  console.log({ showWorks });

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
              className="dark:fill-[#ffffff]  fill-[#151515]  transition-colors duration-900"
            />
            <rect
              y="17.7625"
              width="10.3575"
              height="10.3575"
              className="dark:fill-[#ffffff]  fill-[#151515]  transition-colors duration-900"
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
                <p> accepting new projects—let's collaborate!</p>
              </div>
            ))}
          </div>
        </div>

        <button
          className={`${
            currentTheme === "dark" && "dark-button"
          }  flex items-center justify-center gap-[10px] h-max w-max  py-[0.2rem] px-[2.75rem]  border-2 text-[2.125rem]  dark:border-[#FFF] border-[#151515]  transition-colors duration-900`}
          onClick={() => openWorksModal()}
        >
          <span>
            <p>Works</p>
          </span>
        </button>
      </div>
      <ThemeToggle />
    </div>
  );
};

export default Navbar;
