interface AudioPlayer {
  audioVolume: number;
  songDuration: number;
  song: string;
  details: Details;
}

interface Details {
  author: string;
  year: number;
}

const audioPlayer: AudioPlayer = {
  audioVolume: 90,
  songDuration: 36,
  song: 'Highway to Hell',
  details: {
    author: 'AC/DC',
    year: 1979,
  },
};

const { song } = audioPlayer;
const { details } = audioPlayer;
const { author } = details;

console.log(song);
console.log(author);
console.table({ ...audioPlayer });

const avengers: string[] = [
  'Iron Man',
  'Captain America',
  'Hulk',
  'Thor',
  'Black Widow',
  'Hawkeye',
];
const [, , greenHero]: string[] = avengers;
console.log(greenHero);
