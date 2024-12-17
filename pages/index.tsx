"use client";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import PageContentLayout from "../layouts/PageContent";
import Navbar from "../components/Navbar";
import { useContext, useEffect, useRef, useState } from "react";

import { useDarkMode } from "../hooks/useDarkMode";
import { StateContext } from "../context/StatesContext";
import gsap from "gsap";
import WorkGallery from "../components/works/WorkGallery";

const Home: NextPage = () => {
  const currentYear = new Date().getFullYear();
  const { currentTheme, showWorks } = useContext(StateContext);
  const { theme, toggleTheme } = useDarkMode();
  const [isHydrated, setIsHydrated] = useState(false);
  const pageContentRef = useRef<HTMLDivElement | null>(null);
  const openTl = gsap.timeline({ paused: true });
  const closeTl = gsap.timeline({ paused: true });
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, [toggleTheme]);

  const showWorksModal = () => {
    if (!overlayRef.current) return;
    gsap.set(overlayRef.current, { display: "flex" });

    openTl.to(
      overlayRef.current,
      { top: 0, duration: 2, ease: "expo.inOut" },
      "-0.5"
    );
  };

  const removeWorksModal = () => {
    if (!overlayRef.current) return;
    gsap.set(overlayRef.current, { display: "flex" });

    closeTl.to(
      overlayRef.current,
      {
        top: "100%",
        duration: 1.5,
        ease: "expo.inOut",
        onComplete: () => {
          gsap.set(overlayRef.current, { display: "none", top: "100%" });
        },
      },
      "+=0.5"
    );
  };

  useEffect(() => {
    if (!isHydrated) return;
    if (!overlayRef.current) return;
    if (showWorks) {
      showWorksModal();
      openTl.play();
    } else if (!showWorks) {
      removeWorksModal();
      closeTl.play();
    }

    return () => {
      openTl?.current?.kill();
      closeTl?.current?.kill();
    };
  }, [showWorks]);

  if (!isHydrated) return null;

  return (
    <>
      <Head>
        <title>
          Design Ooasis | TRANSFORMING IDEAS INTO IMPACTFUL DIGITAL SOLUTIONS
        </title>
        <meta
          name="description"
          content="TRANSFORMING IDEAS INTO IMPACTFUL DIGITAL SOLUTIONS"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="https://res.cloudinary.com/dyap7epew/image/upload/c_crop,g_auto,h_1200,w_630/v1732028378/projects/kenksyw6rw1yioatlts2.png"
        />
        <link
          rel="preload"
          href="/fonts/fonts/MangoGrotesque-Regular.otf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/MangoGrotesque-Bold.otf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />

        {/* -----Facebook Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Design Ooasis" />
        <meta
          property="og:description"
          content="Design Ooasis &mdash; TRANSFORMING IDEAS INTO IMPACTFUL DIGITAL SOLUTIONS"
        />

        {/* ----Twitter Meta tags */}
        <meta name="twitter:title" content="Design Ooasis" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:domain"
          content="https://designooasis-flax.vercel.app/"
        />
        <meta
          property="twitter:url"
          content="https://designooasis-flax.vercel.app/"
        />
        <meta
          name="twitter:description"
          content="Design Ooasis &mdash; TRANSFORMING IDEAS INTO IMPACTFUL DIGITAL SOLUTIONS"
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dyap7epew/image/upload/c_crop,g_auto,h_1200,w_630/v1732028378/projects/kenksyw6rw1yioatlts2.png"
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/dyap7epew/image/upload/c_crop,g_auto,h_1200,w_630/v1732028378/projects/kenksyw6rw1yioatlts2.png"
        />
      </Head>

      <PageContentLayout>
        <div
          className="home-page dark:bg-[#182b2a] bg-[white] h-screen flex items-center flex-col  relative  justify-center transition-colors duration-900"
          id="home"
        >
          <div
            className="w-max  flex flex-col items-center justify-center w-[31.25rem] gap-[2rem]"
            ref={pageContentRef}
          >
            <h1 className="font-[400] font-[grotesk-light] dark:text-white text-[#151515] transition-colors duration-900 text-[9.375rem] leading-[100%] text-center">
              Design <br />
              <span className="font-[grotesk-bold] text-[12rem] text-[#43DC4D]">
                Ooasis
              </span>
            </h1>

            <button
              className={`${
                currentTheme === "dark" && "dark-button"
              }  flex items-center justify-center gap-[10px] p-[0.8rem] border-2  w-[15rem] text-[1.875rem]  dark:border-[#FFF] border-[#151515]  transition-colors duration-900`}
            >
              <span>
                <p>START A PROJECT</p>
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="9"
                viewBox="0 0 25 9"
                fill="none"
              >
                <path
                  d="M24.5 4.5L17 0.169873V8.83013L24.5 4.5ZM0.5 5.25H17.75V3.75H0.5V5.25Z"
                  className="dark:fill-[#ffffff]  fill-[#151515]  transition-colors duration-900"
                />
              </svg>
            </button>

            <p className="text-[0.875rem] font-[satoshi] dark:text-white text-[#151515] transition-colors duration-900">
              TRANSFORMING IDEAS INTO IMPACTFUL DIGITAL SOLUTIONS
            </p>

            <div className="flex gap-[2rem] items-center w-max mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M17.0365 0H6.97548C2.6053 0 0 2.604 0 6.972V17.016C0 21.396 2.6053 24 6.97548 24H17.0245C21.3947 24 24 21.396 24 17.028V6.972C24.012 2.604 21.4067 0 17.0365 0ZM12.006 16.656C9.4367 16.656 7.34766 14.568 7.34766 12C7.34766 9.432 9.4367 7.344 12.006 7.344C14.5753 7.344 16.6643 9.432 16.6643 12C16.6643 14.568 14.5753 16.656 12.006 16.656ZM19.1135 5.856C19.0535 6 18.9694 6.132 18.8614 6.252C18.7413 6.36 18.6093 6.444 18.4652 6.504C18.3211 6.564 18.1651 6.6 18.009 6.6C17.6848 6.6 17.3847 6.48 17.1565 6.252C17.0485 6.132 16.9645 6 16.9044 5.856C16.8444 5.712 16.8084 5.556 16.8084 5.4C16.8084 5.244 16.8444 5.088 16.9044 4.944C16.9645 4.788 17.0485 4.668 17.1565 4.548C17.4327 4.272 17.8529 4.14 18.2371 4.224C18.3211 4.236 18.3932 4.26 18.4652 4.296C18.5372 4.32 18.6093 4.356 18.6813 4.404C18.7413 4.44 18.8014 4.5 18.8614 4.548C18.9694 4.668 19.0535 4.788 19.1135 4.944C19.1736 5.088 19.2096 5.244 19.2096 5.4C19.2096 5.556 19.1736 5.712 19.1135 5.856Z"
                  className="dark:fill-[#ffffff]  fill-[#151515]  transition-colors duration-900"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="20"
                viewBox="0 0 24 20"
                fill="none"
              >
                <path
                  d="M18.9014 0.25H22.5816L14.5415 8.51L24 19.75H16.5941L10.7935 12.933L4.15631 19.75H0.473926L9.07356 10.915L0 0.25H7.59394L12.8372 6.481L18.9014 0.25ZM17.6098 17.77H19.649L6.48589 2.126H4.29759L17.6098 17.77Z"
                  className="dark:fill-[#ffffff]  fill-[#151515]  transition-colors duration-900"
                />
              </svg>
            </div>
          </div>

          <div className="absolute bottom-[30px] w-full  text-center flex justify-center items-center">
            <p className="text-[0.875rem] text-black dark:text-white font-[satoshi] font-[700]">
              © designooasis, {currentYear}
            </p>
          </div>
        </div>

        <div
          className="page-transition fixed z-[60] top-full left-0 w-screen h-screen px-[5%] bg-white dark:bg-[black] hidden items-center justify-center "
          ref={overlayRef}
          id="overlay"
        >
          <WorkGallery />
        </div>
      </PageContentLayout>
    </>
  );
};

export default Home;
