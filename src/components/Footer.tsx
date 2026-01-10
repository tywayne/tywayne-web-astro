import { useState, useCallback, useEffect, useRef, type MouseEvent } from 'react';
import { format } from 'date-fns';

// Import SVGs as raw strings for inline use
import InstagramIcon from '../assets/instagram.svg?raw';
import GithubIcon from '../assets/github.svg?raw';
import EmailIcon from '../assets/email.svg?raw';
import BaseballIcon from '../assets/baseball.svg?raw';
import RssIcon from '../assets/rss.svg?raw';
import BlueSkyIcon from '../assets/bluesky.svg?raw';

const DARK_MODE_KEY = 'DARK_MODE';

// SVG wrapper component
function Icon({ svg, className = '' }: { svg: string; className?: string }) {
  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

export default function Footer() {
  const darkModePref = useRef<MediaQueryList | null>(null);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const setDarkMode = useCallback((on: boolean, skipStorage: boolean = false) => {
    const styleObj = document.documentElement.style;

    styleObj.setProperty('--color-foreground', on ? '#e4dbcd' : '#33403d');
    styleObj.setProperty('--color-background', on ? '#33403d' : '#e4dbcd');
    styleObj.setProperty('--color-background-alt', on ? '#56625e' : '#bbb5aa');

    if (!skipStorage) localStorage.setItem(DARK_MODE_KEY, JSON.stringify(on));
  }, []);

  useEffect(() => {
    setMounted(true);
    darkModePref.current = window.matchMedia('(prefers-color-scheme: dark)');
  }, []);

  const handleColorSchemeChange = useCallback(
    (e: MediaQueryListEvent) => {
      setDarkMode(e.matches, true);
      setDarkModeEnabled(e.matches);
    },
    [setDarkMode]
  );

  useEffect(() => {
    if (!mounted) return;

    const storedPref = localStorage.getItem(DARK_MODE_KEY);
    const currentPref = darkModePref.current as MediaQueryList;

    const handler = (e: MediaQueryListEvent) => {
      if (storedPref !== null) return;
      handleColorSchemeChange(e);
    };

    currentPref.addEventListener('change', handler);

    return () => currentPref.removeEventListener('change', handler);
  }, [mounted, handleColorSchemeChange]);

  const toggleDarkMode = useCallback(
    (on: boolean) => {
      setDarkMode(on);
      setDarkModeEnabled(on);
    },
    [setDarkMode]
  );

  const handleClickToggle = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      toggleDarkMode(!darkModeEnabled);
    },
    [toggleDarkMode, darkModeEnabled]
  );

  useEffect(() => {
    if (!mounted) return;

    const storedValue = localStorage.getItem(DARK_MODE_KEY);
    const matchMediaValue = (darkModePref.current as MediaQueryList).matches;

    const enabled = storedValue !== null ? JSON.parse(storedValue) : matchMediaValue;
    setDarkModeEnabled(enabled);
    setDarkMode(enabled, storedValue === null);
  }, [mounted, setDarkMode]);

  return (
    <footer className="flex justify-between items-center flex-wrap pt-8 pb-16 px-[5%]">
      <div className="order-2 flex-[1_0_100%] text-center md:flex-[0_0_auto] md:order-1 md:text-left">
        <p className="m-0 mb-8 px-12 md:px-0 leading-tight">
          &copy; {format(Date.now(), 'y')} &mdash; Ty Carlson
        </p>
        <p className="m-0 mb-8 px-12 md:px-0 leading-tight">
          <button
            className="bg-transparent text-foreground border-none outline-none cursor-pointer transition-colors duration-200 focus-visible:outline-dotted focus-visible:outline-1 focus-visible:outline-foreground"
            onClick={handleClickToggle}
          >
            Turn the lights {darkModeEnabled ? 'ON' : 'OFF'}
          </button>
        </p>
      </div>
      <ul className="m-0 mb-12 md:mb-0 p-0 list-none text-center order-1 flex-[1_0_100%] md:flex-[0_0_auto] md:order-2">
        <li className="inline-block mr-8 mb-6 leading-normal last:mr-0">
          <a
            href="https://instagram.com/tywayne"
            title="Instagram"
            className="text-2xl text-foreground shadow-none transition-opacity duration-200 hover:opacity-80 focus:opacity-80 focus-visible:outline-dotted focus-visible:outline-1 focus-visible:outline-foreground [&_svg]:w-[22px] [&_svg]:h-[22px]"
          >
            <span className="visually-hidden">View me on Instagram</span>
            <Icon svg={InstagramIcon} />
          </a>
        </li>
        <li className="inline-block mr-8 mb-6 leading-normal last:mr-0">
          <a
            href="https://bsky.app/profile/tywayne.com"
            title="BlueSky"
            className="text-2xl text-foreground shadow-none transition-opacity duration-200 hover:opacity-80 focus:opacity-80 focus-visible:outline-dotted focus-visible:outline-1 focus-visible:outline-foreground [&_svg]:w-[22px] [&_svg]:h-[22px]"
          >
            <span className="visually-hidden">View me on BlueSky</span>
            <Icon svg={BlueSkyIcon} />
          </a>
        </li>
        <li className="inline-block mr-8 mb-6 leading-normal last:mr-0">
          <a
            href="https://github.com/tywayne"
            title="Github"
            className="text-2xl text-foreground shadow-none transition-opacity duration-200 hover:opacity-80 focus:opacity-80 focus-visible:outline-dotted focus-visible:outline-1 focus-visible:outline-foreground [&_svg]:w-[22px] [&_svg]:h-[22px]"
          >
            <span className="visually-hidden">View me on Github</span>
            <Icon svg={GithubIcon} />
          </a>
        </li>
        <li className="inline-block mr-8 mb-6 leading-normal last:mr-0">
          <a
            href="mailto:tywayne@fastmail.com"
            title="Email"
            className="text-2xl text-foreground shadow-none transition-opacity duration-200 hover:opacity-80 focus:opacity-80 focus-visible:outline-dotted focus-visible:outline-1 focus-visible:outline-foreground [&_svg]:w-[22px] [&_svg]:h-[22px]"
          >
            <span className="visually-hidden">Send an Email</span>
            <Icon svg={EmailIcon} />
          </a>
        </li>
        <li className="inline-block mr-8 mb-6 leading-normal last:mr-0">
          <a
            href="/rss.xml"
            title="RSS Feed"
            className="text-2xl text-foreground shadow-none transition-opacity duration-200 hover:opacity-80 focus:opacity-80 focus-visible:outline-dotted focus-visible:outline-1 focus-visible:outline-foreground [&_svg]:w-[22px] [&_svg]:h-[22px]"
          >
            <span className="visually-hidden">Subscribe to RSS Feed</span>
            <Icon svg={RssIcon} />
          </a>
        </li>
        <li className="inline-block mr-8 mb-6 leading-normal last:mr-0">
          <a
            href="/rowengartner"
            title="Rowengartner"
            className="text-2xl text-foreground shadow-none transition-opacity duration-200 hover:opacity-80 focus:opacity-80 focus-visible:outline-dotted focus-visible:outline-1 focus-visible:outline-foreground [&_svg]:w-[22px] [&_svg]:h-[22px]"
          >
            <span className="visually-hidden">Rowengartner</span>
            <Icon svg={BaseballIcon} />
          </a>
        </li>
      </ul>
    </footer>
  );
}
