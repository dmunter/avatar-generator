import * as React from 'react';

export default function Skeleton() {

  return (
    <div
      className='animate-shimmer bg-[#f6f7f8]'
      style={{
        backgroundImage:
          'linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)',
        backgroundSize: '700px 100%',
        backgroundRepeat: 'no-repeat',
      }}
    />
  );
}
