import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Pencil, Upload } from 'lucide-react';
import type { Album } from '@/types';
import { albums } from '@/data/albums';

function FocalAlbum({
  album,
  onAlbumChange,
}: {
  album: Album;
  onAlbumChange: (album: Album) => void;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingArtist, setEditingArtist] = useState(false);
  const [titleValue, setTitleValue] = useState(album.title);
  const [artistValue, setArtistValue] = useState(album.artist);
  const [coverUrl, setCoverUrl] = useState(album.coverUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const artistInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTitleValue(album.title);
    setArtistValue(album.artist);
    setCoverUrl(album.coverUrl);
  }, [album]);

  const commitTitle = () => {
    if (titleValue.trim()) {
      onAlbumChange({ ...album, title: titleValue.trim() });
    } else {
      setTitleValue(album.title);
    }
    setEditingTitle(false);
  };

  const commitArtist = () => {
    if (artistValue.trim()) {
      onAlbumChange({ ...album, artist: artistValue.trim() });
    } else {
      setArtistValue(album.artist);
    }
    setEditingArtist(false);
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setCoverUrl(dataUrl);
        onAlbumChange({ ...album, coverUrl: dataUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      key={album.id}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center gap-6"
    >
      {/* Cover Art */}
      <div
        className="relative group cursor-pointer"
        style={{ width: 'clamp(220px, 40vw, 320px)', height: 'clamp(220px, 40vw, 320px)' }}
        onClick={() => fileInputRef.current?.click()}
      >
        <img
          src={coverUrl}
          alt={album.title}
          className="w-full h-full rounded-[24px] object-cover"
        />
        <div className="absolute inset-0 rounded-[24px] bg-black/0 group-hover:bg-black/45 transition-all flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-medium transition-opacity">
            <Upload className="h-4 w-4" />
            Change cover
          </span>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleCoverChange}
        />
      </div>

      {/* Title */}
      <div className="relative w-full max-w-md">
        {editingTitle ? (
          <input
            ref={titleInputRef}
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            onBlur={commitTitle}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commitTitle();
              if (e.key === 'Escape') {
                setTitleValue(album.title);
                setEditingTitle(false);
              }
            }}
            autoFocus
            className="w-full text-center text-3xl sm:text-4xl md:text-5xl font-black bg-transparent border-b-2 border-[#A8800A] outline-none text-[#F4F3EF] px-2"
          />
        ) : (
          <div
            className="flex items-center justify-center gap-2 cursor-pointer group"
            onClick={() => {
              setEditingTitle(true);
              setTimeout(() => titleInputRef.current?.focus(), 10);
            }}
          >
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#F4F3EF]">
              {album.title}
            </h3>
            <Pencil className="h-4 w-4 text-[#F4F3EF]/30 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        )}
      </div>

      {/* Artist */}
      <div className="relative w-full max-w-md">
        {editingArtist ? (
          <input
            ref={artistInputRef}
            value={artistValue}
            onChange={(e) => setArtistValue(e.target.value)}
            onBlur={commitArtist}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commitArtist();
              if (e.key === 'Escape') {
                setArtistValue(album.artist);
                setEditingArtist(false);
              }
            }}
            autoFocus
            className="w-full text-center text-lg sm:text-xl md:text-2xl font-medium bg-transparent border-b-2 border-[#A8800A] outline-none text-[#F4F3EF]/70 px-2"
          />
        ) : (
          <div
            className="flex items-center justify-center gap-2 cursor-pointer group"
            onClick={() => {
              setEditingArtist(true);
              setTimeout(() => artistInputRef.current?.focus(), 10);
            }}
          >
            <p className="text-lg sm:text-xl md:text-2xl text-[#F4F3EF]/70">
              {album.artist}
            </p>
            <Pencil className="h-3.5 w-3.5 text-[#F4F3EF]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        )}
      </div>

      {/* Transport Controls */}
      <div className="flex flex-col items-center gap-3 mt-2">
        <div className="flex items-center gap-6">
          <button className="text-[#D7E2EA]/70 hover:text-[#D7E2EA] transition-colors">
            <SkipBack className="h-6 w-6" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-14 h-14 rounded-full bg-[#A8800A] flex items-center justify-center text-black hover:bg-[#c2990b] transition-colors"
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
          </button>
          <button className="text-[#D7E2EA]/70 hover:text-[#D7E2EA] transition-colors">
            <SkipForward className="h-6 w-6" />
          </button>
        </div>
        <div className="w-48 h-1 bg-[#262626] rounded-full overflow-hidden">
          <div className="w-1/3 h-full bg-[#A8800A] rounded-full" />
        </div>
      </div>
    </motion.div>
  );
}

function AscendingCoverflow({
  albums: albumList,
  onSelect,
  activeId,
}: {
  albums: Album[];
  onSelect: (album: Album) => void;
  activeId: string;
}) {
  const N = albumList.length;
  const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 180 : 300;
  const heightStep = 12;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ perspective: '800px', minHeight: '500px' }}
    >
      <div
        className="animate-helix"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {albumList.map((album, i) => {
          const angle = i * (360 / N);
          const yOffset = i * heightStep - (N * heightStep) / 2;
          return (
            <div
              key={album.id}
              className="absolute left-1/2 top-1/2 cursor-pointer transition-transform duration-150 hover:scale-[1.08]"
              style={{
                transform: `rotateY(${angle}deg) translateZ(${radius}px) translateY(${yOffset}px) translateX(-50%)`,
                transformStyle: 'preserve-3d',
              }}
              onClick={() => onSelect(album)}
            >
              <img
                src={album.coverUrl}
                alt={album.title}
                className={`w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] rounded-[16px] object-cover border transition-all duration-200 ${
                  album.id === activeId
                    ? 'border-[#A8800A] opacity-100'
                    : 'border-[#262626] opacity-80 hover:opacity-100'
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function AlbumPage() {
  const [focalAlbum, setFocalAlbum] = useState<Album>(albums[0]);

  const handleAlbumChange = useCallback((updated: Album) => {
    setFocalAlbum(updated);
  }, []);

  const handleSelect = useCallback((album: Album) => {
    setFocalAlbum(album);
  }, []);

  return (
    <section
      id="albums"
      className="relative bg-[#0C0C0C] min-h-screen py-20 sm:py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h2
          className="hero-heading font-black uppercase tracking-tight text-center mb-16 sm:mb-20 font-kanit"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Album Gallery
        </h2>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-start">
          {/* Focal Album - Left */}
          <div className="w-full lg:w-[45%] flex items-center justify-center lg:sticky lg:top-32">
            <AnimatePresence mode="wait">
              <FocalAlbum key={focalAlbum.id} album={focalAlbum} onAlbumChange={handleAlbumChange} />
            </AnimatePresence>
          </div>

          {/* Ascending Coverflow - Right */}
          <div className="w-full lg:w-[55%]">
            <AscendingCoverflow
              albums={albums}
              onSelect={handleSelect}
              activeId={focalAlbum.id}
            />
          </div>
        </div>
      </div>
    </section>
  );
}