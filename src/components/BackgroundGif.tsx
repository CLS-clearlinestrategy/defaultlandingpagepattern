import { cn } from '@/lib/utils';

import React from 'react';

export interface BackgroundGifProps {
  gifUrl?: string;
  overlayColor?: string;
  blur?: string;
  className?: string;
  children?: React.ReactNode;
}

export function BackgroundGif({
  gifUrl = "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmpxcXoxN252N3R2MzZzaTRvcGJzNHY5MDJ2aXNzM3hranRtdXI0dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3BZHlKZbrJwL0buDOc/giphy.gif",
  overlayColor = "bg-black/80", 
  blur = "blur-3xl",
  className,
  children
}: BackgroundGifProps) {
  return (
    <>
      <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      <div 
        className={cn("absolute -inset-[10%] bg-cover bg-center bg-no-repeat", blur)}
        style={{ 
          backgroundImage: `url(${gifUrl})`,
        }}
      />
        <div className={cn("absolute inset-0", overlayColor)} />
      </div>
      {children}
    </>
  );
}
