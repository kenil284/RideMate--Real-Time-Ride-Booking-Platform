import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const BottomSheet = ({ stage, children }) => {
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
      stage === "search"
        ? window.innerHeight * 0.7
        : content.scrollHeight;

    // first render direct height set, no ugly jump
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
  }, [stage]);

  return (
    <div
      ref={sheetRef}
      className="fixed bottom-0 left-0 right-0 z-[9999] bg-white overflow-hidden shadow-2xl rounded-t-3xl"
    >
      {stage === "looking" && (
        <div className="absolute top-0 left-0 w-full h-[4px] bg-blue-100 overflow-hidden">
          <div className="h-full looking-line"></div>
        </div>
      )}

      {stage === "loading" && (
        <div className="h-full flex items-center justify-center">
          <p className="text-sm font-semibold text-gray-500">
            Checking active ride...
          </p>
        </div>
      )}

      <div
        ref={contentRef}
        className={`w-full max-w-[430px] mx-auto px-5 py-4 ${stage === "search" ? "h-[70dvh]" : ""
          }`}
      >
        {children}
      </div>
    </div>
  );
};

export default BottomSheet;