import { useState } from 'react';

interface Props {
  artists: { letter: string; names: string[] }[];
}

export default function ArtistSearch({ artists }: Props) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredArtists = artists
    .map((group) => ({
      letter: group.letter,
      names: group.names.filter((name) =>
        name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((group) => group.names.length > 0);

  return (
    <>
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search artists..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {filteredArtists.length === 0 && searchTerm && (
        <p className="text-gray-500 italic mb-8">
          No artists found matching your search.
        </p>
      )}

      {filteredArtists.map((group) => (
        <div className="mb-8" key={group.letter}>
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-200 pb-2">
            {group.letter}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {group.names.map((artistName) => (
              <ArtistCard key={artistName} artist={artistName} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

function ArtistCard({ artist }: { artist: string }) {
  // Your existing color logic
  const colorFamilies = [
    'red',
    'blue',
    'green',
    'purple',
    'orange',
    'teal',
    'indigo',
    'pink',
  ];
  const colorIndex = artist.length % colorFamilies.length;
  const colorFamily = colorFamilies[colorIndex];

  const intensities = [300, 400, 500, 600];
  const intensityIndex = artist.charCodeAt(0) % intensities.length;
  const intensity = intensities[intensityIndex];

  // Replace the dynamic class generation with a color mapping
  const colorMap = {
    red: {
      300: 'bg-red-300',
      400: 'bg-red-400',
      500: 'bg-red-500',
      600: 'bg-red-600',
    },
    blue: {
      300: 'bg-blue-300',
      400: 'bg-blue-400',
      500: 'bg-blue-500',
      600: 'bg-blue-600',
    },
    green: {
      300: 'bg-green-300',
      400: 'bg-green-400',
      500: 'bg-green-500',
      600: 'bg-green-600',
    },
    purple: {
      300: 'bg-purple-300',
      400: 'bg-purple-400',
      500: 'bg-purple-500',
      600: 'bg-purple-600',
    },
    orange: {
      300: 'bg-orange-300',
      400: 'bg-orange-400',
      500: 'bg-orange-500',
      600: 'bg-orange-600',
    },
    teal: {
      300: 'bg-teal-300',
      400: 'bg-teal-400',
      500: 'bg-teal-500',
      600: 'bg-teal-600',
    },
    indigo: {
      300: 'bg-indigo-300',
      400: 'bg-indigo-400',
      500: 'bg-indigo-500',
      600: 'bg-indigo-600',
    },
    pink: {
      300: 'bg-pink-300',
      400: 'bg-pink-400',
      500: 'bg-pink-500',
      600: 'bg-pink-600',
    },
  };

  const bgColorClass =
    colorMap[colorFamily as keyof typeof colorMap][
      intensity as keyof (typeof colorMap)[keyof typeof colorMap]
    ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <a href={`/music/artist/${encodeURIComponent(artist)}`}>
        <div
          className={`aspect-square ${bgColorClass} rounded-md mb-3 flex items-center justify-center`}
        >
          <span className="text-4xl text-white">🎵</span>
        </div>
        <h2 className="font-bold text-lg leading-tight mb-1">{artist}</h2>
      </a>
    </div>
  );
}
