CREATE TABLE IF NOT EXISTS Music (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  format TEXT NOT NULL,
  artist TEXT NOT NULL,
  title TEXT NOT NULL,
  release_year INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_music_artist ON Music(artist);
CREATE INDEX IF NOT EXISTS idx_music_format ON Music(format);
CREATE UNIQUE INDEX IF NOT EXISTS idx_music_artist_title ON Music(artist, title);

CREATE TABLE IF NOT EXISTS Tracks (
  track_id INTEGER PRIMARY KEY,
  name TEXT,
  artist TEXT,
  album TEXT,
  genre TEXT,
  duration INTEGER,
  year INTEGER,
  date_added DATETIME DEFAULT CURRENT_TIMESTAMP,
  play_count INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_tracks_artist ON Tracks(artist);
CREATE INDEX IF NOT EXISTS idx_tracks_album ON Tracks(album);
CREATE UNIQUE INDEX IF NOT EXISTS idx_tracks_artist_name ON Tracks(artist, name);
