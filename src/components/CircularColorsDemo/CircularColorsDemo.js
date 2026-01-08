'use client';
import React, { use } from 'react';
import clsx from 'clsx';
import {
  Play,
  Pause,
  RotateCcw,
} from 'react-feather';
import { motion } from 'framer-motion';

import Card from '@/components/Card';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './CircularColorsDemo.module.css';
import { set } from 'date-fns';

const COLORS = [
  { label: 'red', value: 'hsl(348deg 100% 60%)' },
  { label: 'yellow', value: 'hsl(50deg 100% 55%)' },
  { label: 'blue', value: 'hsl(235deg 100% 65%)' },
];

function CircularColorsDemo() {
  const id = React.useId();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [timeElapsed, setTimeElapsed] = React.useState(0);

  // TODO: This value should cycle through the colors in the
  // COLORS array:
  const selectedColor = COLORS[timeElapsed % COLORS.length];

  React.useEffect(() => {
    if (!isPlaying) {
      return;
    }
    const interval = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected =
            color.value === selectedColor.value;
          const layoutId = `${id}-circular-color-demo`;
          return (
            <li
              className={styles.color}
              key={`${color.label}-${index}`}
            >
              {isSelected && (
                <motion.div
                  layoutId={layoutId}
                  className={
                    styles.selectedColorOutline
                  }
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected &&
                  styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>
                  {color.label}
                </VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          {!isPlaying && (
            <button onClick={() => {
              setIsPlaying(true);
              setTimeElapsed(timeElapsed + 1);
            }}>
              <Play />
              <VisuallyHidden>Play</VisuallyHidden>
            </button>
          )}
          {isPlaying && (
            <button onClick={() => setIsPlaying(false)}>
              <Pause />
              <VisuallyHidden>Pause</VisuallyHidden>
            </button>
          )}
          <button onClick={() => {
            setTimeElapsed(0);
            setIsPlaying(false);
          }}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
