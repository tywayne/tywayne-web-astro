import { useEffect, useState } from "react";

const Parts = [
  new Set([
    "Rulen",
    "Raven",
    "Rosen",
    "Roven",
    "Roger",
    "Rowen",
    "Runna",
    "Rollin",
  ]),
  new Set([
    "verter",
    "boozer",
    "gagger",
    "grueter",
    "grooten",
    "gardener",
    "gartner",
    "mucker",
    "fruiter",
  ]),
];

function getRandomItem(set: Set<string>) {
  const items = Array.from(set);
  return items[Math.floor(Math.random() * items.length)];
}

export default function Rowengartner() {
  const [lastName, setLastName] = useState(() => {
    return `${getRandomItem(Parts[0])}${getRandomItem(Parts[1])}`;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLastName(`${getRandomItem(Parts[0])}${getRandomItem(Parts[1])}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <article
      className="fixed inset-0 flex items-end justify-center p-8"
      style={{
        background: "url('/images/henry.jpg') top center no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div>
        <h1 className="text-4xl md:text-6xl font-bold text-white text-center drop-shadow-lg">
          Henry <span className="block md:inline">{lastName}</span>
        </h1>
      </div>
    </article>
  );
}
