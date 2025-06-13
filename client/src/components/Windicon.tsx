'use client';

import { forwardRef, useImperativeHandle, useRef, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface WindiconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface WindiconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const Windicon = forwardRef<WindiconHandle, WindiconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => {
          controls.start(i => ({
            pathLength: [0, 1],
            pathOffset: [1, 0],
            opacity: [0.1, 1, 0.1],
            transition: {
              duration: 2,
              delay: i * 1,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
            },
          }));
          
        },
        stopAnimation: () => {
          controls.start(i => ({
            pathLength: 1,
            opacity: 1,
            pathOffset: 0,
            transition: {
              duration: 0.3,
              ease: 'easeInOut',
              delay: i,
            },
          }));
        },
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start(i => ({
            pathLength: [0, 1],
            opacity: [0, 1],
            pathOffset: [1, 0],
            transition: {
              duration: 0.8,
              ease: 'easeInOut',
              delay: i,
              repeat: Infinity,
              repeatType: 'loop',
            },
          }));
        } else {
          onMouseEnter?.(e);
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start(i => ({
            pathLength: 1,
            opacity: 1,
            pathOffset: 0,
            transition: {
              duration: 0.3,
              ease: 'easeInOut',
              delay: i,
            },
          }));
        } else {
          onMouseLeave?.(e);
        }
      },
      [controls, onMouseLeave]
    );

    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            d="M12.8 19.6A2 2 0 1 0 14 16H2"
            animate={controls}
            initial={false}
            custom={0.2}
          />
          <motion.path
            d="M17.5 8a2.5 2.5 0 1 1 2 4H2"
            animate={controls}
            initial={false}
            custom={0}
          />
          <motion.path
            d="M9.8 4.4A2 2 0 1 1 11 8H2"
            animate={controls}
            initial={false}
            custom={0.4}
          />
        </svg>
      </div>
    );
  }
);

Windicon.displayName = 'Windicon';

export { Windicon };
