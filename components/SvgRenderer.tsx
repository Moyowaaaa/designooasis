import React from "react";

const SvgRenderer = ({ svg }: { svg: any }) => {
  return (
    <>
      {/* <div dangerouslySetInnerHTML={svg}></div>; */}
      <svg dangerouslySetInnerHTML={svg}></svg>
    </>
  );
};

export default SvgRenderer;
