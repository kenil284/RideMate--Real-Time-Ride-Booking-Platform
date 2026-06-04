import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const BottomSheet = ({ stage, contentKey, children }) => {
  const sheetRef = useRef(null);
  const contentRef = useRef(null);
  const isFirstRender = useRef(true);

  useGSAP(() => {
    const sheet = sheetRef.current;
    const content = contentRef.current;

    if (!sheet || !content) return;

    gsap.killTweensOf(sheet);

    const currentHeight = sheet.offsetHeight;


    const targetHeight =
      stage === "navigating"
        ? Math.max(window.innerHeight * 0.1, 86)
        : content.scrollHeight;

    if (isFirstRender.current) {
      gsap.set(sheet, { height: targetHeight });
      isFirstRender.current = false;
      return;
    }

    gsap.fromTo(
      sheet,
      { height: currentHeight },
      {
        height: targetHeight,
        duration: 0.45,
        ease: "power3.inOut",
      }
    );
  }, [stage, contentKey]);

  return (
    <div
      ref={sheetRef}
      className="fixed bottom-0 left-0 right-0 z-[9999] bg-white overflow-hidden shadow-2xl rounded-t-[34px]"
    >
      <div
        ref={contentRef}
        className={`
        w-full max-w-[430px] mx-auto px-5 py-4
        ${stage === "navigating" ? "h-full py-3" : ""}
      `}
      >
        <div className="mx-auto h-1.5 w-12 rounded-full bg-gray-300 mb-5" />

        {children}
      </div>
    </div>
  );
};

export default BottomSheet;