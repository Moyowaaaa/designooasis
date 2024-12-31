"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import gsap from "gsap";
import Image from "next/image";
import WorkCard, { work } from "./WorkCard";
import SplitType from "split-type";

const WorkGallery = () => {
  const target = useRef(null);
  const portfolioCardRef = useRef<HTMLDivElement | null>(null);
  const mm = useRef(gsap.matchMedia()); // MatchMedia instance

  const projects = [
    { image: "/images/abundance", title: "Abundance Food Farms" },
    {
      image: "/images/moniezone",
      title: "Monezone Credit",
      bgColor: "#FAB716",
    },
    { image: "/images/jordann", title: "Jordan's Tade", bgColor: "#5F23DA" },
    {
      image: "/images/options",
      title: "Options Dynamics Bookstore",
      bgColor: "#094581",
    },
    { image: "/images/bliplat", title: "Bliplat Logistics" },
  ] as work[];

  const [currentProject, setCurrentProject] = useState<work | null>(null);
  const [selectedProject, setSelectedProject] = useState<work | null>(null);

  useEffect(() => {
    if (currentProject) {
      setSelectedProject(currentProject);
    } else {
      setSelectedProject(null);
    }
  }, [currentProject]);

  const onHoverAnimation = (project: any, card: HTMLDivElement) => {
    setCurrentProject(project);

    const textElement = card.querySelector("#project-desc");
    if (textElement) {
      mm.current.add("(min-width: 1020px)", () => {
        gsap.killTweensOf(textElement);
        gsap.fromTo(
          textElement,
          { opacity: 0, yPercent: 20, display: "none" },
          {
            opacity: 1,
            yPercent: 0,
            duration: 0.6,
            display: "flex",
            ease: "power3.out",
          }
        );
      });
    }
  };

  const onHoverOutAnimation = (card: HTMLDivElement) => {
    setCurrentProject(null);

    const textElement = card.querySelector("#project-desc");
    if (textElement) {
      mm.current.add("(min-width: 1020px)", () => {
        gsap.killTweensOf(textElement);
        gsap.to(textElement, {
          opacity: 0,
          yPercent: 20,
          duration: 0.4,
          display: "none",
          ease: "power3.in",
        });
      });
    }
  };

  useEffect(() => {
    return () => {
      mm.current.revert();
    };
  }, []);

  return (
    <div className="h-full w-full flex absolute flex-col justify-center">
      <div
        className="fixed top-0 h-screen w-full flex items-center justify-center"
        style={{
          background: `${
            currentProject?.bgColor ? currentProject?.bgColor : "none"
          }`,
        }}
      >
        <div
          className={
            currentProject?.bgColor
              ? `h-[30rem] w-[30rem] mx-auto`
              : "h-full w-full"
          }
          style={{ backgroundImage: `url(${currentProject?.image}.png)` }}
          id="jumbotron"
        ></div>
      </div>
      <div className="h-full w-full flex flex-col justify-center  ">
        <div className="flex items-center gap-[0.5rem] w-10/12 mx-auto h-[28rem]">
          {projects.map((p, index) => (
            <div
              className="hover-image flex flex-col justify-between"
              key={index}
              onMouseEnter={(e) => onHoverAnimation(p, e.currentTarget)}
              onMouseLeave={(e) => onHoverOutAnimation(e.currentTarget)}
              ref={portfolioCardRef}
            >
              <div className="h-[25rem] w-full relative">
                <Image
                  src={`${p.image}.png`}
                  alt={`Project ${p.title}`}
                  fill
                  className="absolute object-cover w-full"
                />
              </div>
              <div
                id="project-desc"
                className={`flex items-center w-full justify-between transition-colors duration-900 hidden
                  ${p.title === projects[4].title ? "text-black" : "text-white"}
                  `}
              >
                <h1 className="text-3xl ">{p.title}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkGallery;
