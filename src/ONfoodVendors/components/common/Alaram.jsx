import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Alarm = ({ alertLoop }) => {
  return (
    <div className="flex items-center justify-center w-12 h-12 rounded-md  ">
      <DotLottieReact
        src="/lotties/RingingBell.lottie"
        loop={alertLoop}
        autoplay={alertLoop}
      />
    </div>
  );
};

export default Alarm;
