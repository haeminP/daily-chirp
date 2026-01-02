import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const adjectives = [
  // 기존
  "Happy",
  "Brave",
  "Smart",
  "Kind",
  "Calm",
  "Wise",
  "Fast",
  "Bright",
  "Gentle",
  "Bold",
  "Cute",
  "Cool",
  "Cheerful",
  "Energetic",
  "Quiet",
  "Passionate",
  "Creative",
  "Fun",
  "Serious",
  "Optimistic",
  "Fluffy",
  "Bubbly",
  "Sunny",
  "Sweet",
  "Snuggly",
  "Chubby",
  "Peppy",
  "Bouncy",
  "Cozy",
  "Tiny",
  "Sparkly",
  "Wiggly",
  "Cuddly",
  "Playful",
  "Puppyish",
];

const nouns = [
  "Panda",
  "Tiger",
  "Eagle",
  "Dolphin",
  "Fox",
  "Wolf",
  "Bear",
  "Lion",
  "Hawk",
  "Whale",
  "Rabbit",
  "Elephant",
  "Giraffe",
  "Monkey",
  "Penguin",
  "Hedgehog",
  "Squirrel",
  "Dinosaur",
  "Parrot",
  "Hamster",
];

export const getRandomNickname = () => {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const number = Math.floor(Math.random() * 100);

  return `${adjective}${noun}${number}`;
};
