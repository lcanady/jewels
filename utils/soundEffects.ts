import { Howl } from 'howler';

const soundEffects = {
  match: new Howl({ src: ['/sounds/match.mp3'] }),
  swap: new Howl({ src: ['/sounds/swap.mp3'] }),
  drop: new Howl({ src: ['/sounds/drop.mp3'] }),
};

export const playSound = (sound: keyof typeof soundEffects) => {
  soundEffects[sound].play();
};

