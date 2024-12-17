"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import gsap from "gsap";
import Image from "next/image";
import WorkCard, { work } from "./WorkCard";

const WorkGallery = () => {
  const projects = [
    {
      image: "/images/abundanceLogo",
      title: "Abundance Food Farms",

      desc: ["Web Design", "Development", "CopyWriting"],
    },
    { image: "/images/JN", title: "Jordan" },

    {
      image: "",
      title: "Moniezone",
      desc: ["Web Design", "Development", "Mobile App Design"],
    },
    { image: "", title: "Ajo" },
    { image: "", title: "Options" },
    { image: "", title: "Bliplat Logistics" },
  ] as work[];
  const [currentProject, setCurrentProject] = useState<work | null>(null);

  const selectedWork = useMemo(() => {
    if (currentProject)
      return {
        currentProject,
      };
    else {
      return null;
    }
  }, [currentProject]);

  // console.log([{ currentBackground }, { backgroundImage }]);

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
        style={{
          backgroundImage: `url(${selectedWork?.currentProject}Large.png)`,
        }}
      ></div>
      <div className="h-full w-full  flex flex-col justify-center">
        <div className="flex items-center gap-[0.5rem] w-10/12 mx-auto h-[25rem] relative">
          {projects?.map((p, index) => (
            <div
              className="hover-image"
              key={index}
              onMouseEnter={() => setCurrentProject(p)}
              onMouseLeave={() => setCurrentProject(null)}
            >
              <div className="h-full w-full shadow-xl relative dark:bg-black bg-white flex items-center justify-center">
                {/* <Image
                  src={`${p.image}.svg`}
                  alt={`Project ${p.title}`}
                  fill
                  className=" object-contain w-full "
                /> */}
                <p>Project</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-12 w-full   py-4">
        <div className="w-10/12 mx-auto  justify-between">
          {currentProject && (
            <div className="flex items-center w-full justify-between dark:text-white text-black  transition-colors duration-900  ">
              <h1 className="text-3xl ">Project Title</h1>

              {/* <div className="flex gap-2 items-center">
                {currentProject &&
                  currentProject?.desc?.map((d, i) => (
                    <p
                      className="text-[14px] dark:text-[#EAEAEA] font-[satoshi] font-[400] transition-colors duration-100"
                      key={i}
                    >
                      {d}
                    </p>
                  ))}
              </div> */}
            </div>
          )}

          <p></p>
        </div>
      </div>
    </div>
  );
};

export default WorkGallery;
