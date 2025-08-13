/* eslint-disable no-unused-vars */
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Loading() {
  return (
    <div className="fixed z-1000 top-0 left-0 flex items-center justify-center mt-20 w-full h-full">
      <DotLottieReact
        src="/lotties/loading.lottie"
        loop
        autoplay
        style={{ width: 120, height: 120 }}
      />
    </div>
  );
}
