'use client';
import React from 'react';
import styles from './ThemeToggle.module.css';
import { Sun, Moon } from 'react-feather';
import VisuallyHidden from '../VisuallyHidden';
import { DARK_TOKENS, LIGHT_TOKENS } from '@/constants';

function ThemeToggle({ initialTheme }) {
  const [theme, setTheme] = React.useState(initialTheme);
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.cookie = `theme=${newTheme}; path=/; max-age=31536000`;
    const themeStyles = newTheme === 'light' ? LIGHT_TOKENS : DARK_TOKENS;
    document.documentElement.setAttribute('data-color-theme', newTheme);
    Object.entries(themeStyles).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  };
  return (
    <button className={styles.action} onClick={toggleTheme}>
      {theme === 'dark' ? <Moon size="1.5rem" /> : <Sun size="1.5rem" />}
      <VisuallyHidden>
        Toggle dark / light mode
      </VisuallyHidden>
    </button>
  )
}

export default ThemeToggle;
