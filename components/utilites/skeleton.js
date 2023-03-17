import * as React from 'react';

export default function Skeleton() {

  return (
    <div
      className='animate-shimmer bg-neutral z-10'
      style={{
        backgroundImage:
          'linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)',
        width: '100%',
        height: '100%',
        backgroundRepeat: 'no-repeat',
      }}
    />
  );
}
