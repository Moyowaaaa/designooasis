"use client";
import gsap from "gsap";
import Image from "next/image";
import React, { useRef } from "react";

export interface work {
  title: string;
  image: string;
  desc?: string[];
  largeImage?: string;
  svg?: HTMLOrSVGImageElement;
  bgColor?: string;
}

const WorkCard = ({ work }: { work: work }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  let mm = gsap.matchMedia();

  const onHoverAnimation = () => {
    if (imageRef.current) {
      gsap.killTweensOf(imageRef.current.children);
      gsap.to(imageRef.current.children, {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(imageRef.current.children, {
        scale: 2,
        duration: 30,
        ease: "power4.inOut",
        delay: 0.3,
      });
    }

    if (cardRef.current) {
      const desc = cardRef.current.children[1];
      mm.add("(min-width: 1020px)", () => {
        gsap.killTweensOf(desc);
        gsap.to(desc, {
          opacity: 1,
          duration: 0.3,
          stagger: 0.1,
        });
      });
    }
  };

  const onHoverOutAnimation = () => {
    if (imageRef.current) {
      gsap.killTweensOf(imageRef.current.children);
      gsap.to(imageRef.current.children, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    if (cardRef.current) {
      const desc = cardRef.current.children[1];
      mm.add("(min-width: 1020px)", () => {
        gsap.killTweensOf(desc);
        gsap.to(desc, {
          opacity: 0,
          duration: 0.3,
        });
      });
    }
  };

  return (
    <>
      <div
        className="min-w-[32.75rem] h-[23.438rem] max-h-[23.438rem] overflow-hidden flex flex-col gap-2 justify-between "
        onMouseEnter={onHoverAnimation}
        onMouseLeave={onHoverOutAnimation}
        ref={cardRef}
      >
        <div className="work-image-container w-full h-[20rem] max-h-[20rem] overflow-hidden   ">
          <div className="w-full h-full relative" ref={imageRef}>
            <Image
              src={work.image}
              alt={`Project ${work.title}`}
              fill
              className="absolute object-cover w-full"
            />
          </div>
        </div>
        <div className="flex items-center w-full justify-between dark:text-white text-black  transition-colors duration-900 opacity-0">
          <h1 className="text-3xl ">{work.title}</h1>
          {work.desc?.map((d, i) => (
            <p
              className="text-[14px] dark:text-[#EAEAEA] font-[satoshi] font-[400] transition-colors duration-100"
              key={i}
            >
              {d}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default WorkCard;
