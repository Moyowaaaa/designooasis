"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import gsap from "gsap";
import Image from "next/image";
import WorkCard, { work } from "./WorkCard";

const WorkGallery = () => {
  const projects = [
    { image: "/images/abundance", title: "Abundance" },
    { image: "/images/moniezone", title: "Moniezone" },
    { image: "/images/jordan", title: "Jordan" },
    { image: "/images/ajo", title: "Ajo" },
    { image: "/images/options", title: "Options" },
    { image: "/images/bliplat", title: "Bliplat Logistics" },
  ] as work[];

  const [currentBackground, setCurrentBackground] = useState<string>("");

  const backgroundImage = useMemo(() => {
    if (currentBackground)
      return {
        currentBackground,
      };
    else {
      return "none";
    }
  }, [currentBackground]);

  console.log([{ currentBackground }, { backgroundImage }]);

  return (
    <div className="h-full w-full flex absolute flex-col justify-center ">
      {/* <div className="absolute h-screen w-full mx-6 self-center flex flex-col justify-center">
        <div className="w-full max-w-full overflow-auto flex items-center gap-16 self-center pl-16">
          {projects.map((project, index) => (
            <WorkCard key={index} work={project} />
          ))}
        </div>
      </div> */}

      <div
        className="fixed  top-0 h-screen w-full  "
        id="jumbotron"
        style={{ backgroundImage: `url(${currentBackground}Large.png)` }}
      ></div>
      <div className="h-full w-full  flex flex-col justify-center">
        <div className="flex items-center gap-[0.5rem] w-10/12 mx-auto h-[25rem] ">
          {projects?.map((p, index) => (
            <div
              className="hover-image"
              key={index}
              onMouseEnter={() => setCurrentBackground(p.image)}
              onMouseLeave={() => setCurrentBackground("none")}
            >
              <div className="h-full w-full relative ">
                <Image
                  src={`${p.image}.png`}
                  alt={`Project ${p.title}`}
                  fill
                  className="absolute object-cover w-full"
                />
              </div>

              <div className="flex items-center w-full justify-between dark:text-white text-black  transition-colors duration-900 border-2 border-[red] ">
                <h1 className="text-3xl ">{p.title}</h1>
                {p?.desc?.map((d, i) => (
                  <p
                    className="text-[14px] dark:text-[#EAEAEA] font-[satoshi] font-[400] transition-colors duration-100"
                    key={i}
                  >
                    {d}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkGallery;
