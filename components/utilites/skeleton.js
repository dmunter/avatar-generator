import * as React from 'react';

export default function Skeleton() {

  return (
  // <div className="relative"
  // style={{
  //   backgroundImage:
  //     '',
  //   backgroundRepeat: 'no-repeat',
  // }}>

    <div
      
      className='bg-gradient-to-r from-transparent via-neutral-700/10 to-transparent
      [...] -translate-x-full animate-[shimmer_2s_infinite]'
      style={{
        backgroundImage:
          '',
        width:'100%',
        height:'100%',
        backgroundRepeat: 'no-repeat',
      }}
    >
  </div>
  // </div>
  );
}
