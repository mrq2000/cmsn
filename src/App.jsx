import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FloatingDecorations from './components/FloatingDecorations';
import GiftBox from './components/GiftBox';
import BirthdayCard from './components/BirthdayCard';
import AudioToggle from './components/AudioToggle';

const OPEN_SOUND_URL =
  'https://cdn.pixabay.com/download/audio/2021/08/04/audio_bb630cc098.mp3?filename=correct-2-46134.mp3';
const BGM_URL = '/music.mp3';

function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [isMusicOn, setIsMusicOn] = useState(false);

  const bgmRef = useRef(null);
  const openSoundRef = useRef(null);
  const clickLockedRef = useRef(false);

  const particles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 10 + 6,
        delay: Math.random() * 0.35,
        duration: Math.random() * 0.8 + 1.2,
        color:
          ['#f973b6', '#fb7185', '#fcd34d', '#a78bfa', '#60a5fa'][
            Math.floor(Math.random() * 5)
          ],
      })),
    [],
  );

  const playOpenSound = async () => {
    if (!openSoundRef.current) return;
    openSoundRef.current.currentTime = 0;
    try {
      await openSoundRef.current.play();
    } catch {
      // Ignore browser autoplay restrictions for effects.
    }
  };

  const ensureMusicPlayback = async () => {
    if (!bgmRef.current) return;
    if (!bgmRef.current.paused) {
      setIsMusicOn(true);
      return;
    }

    try {
      bgmRef.current.volume = 0.45;
      await bgmRef.current.play();
      setIsMusicOn(true);
    } catch {
      setIsMusicOn(false);
    }
  };

  const toggleMusic = async () => {
    if (!bgmRef.current) return;

    if (isMusicOn) {
      bgmRef.current.pause();
      setIsMusicOn(false);
      return;
    }

    try {
      bgmRef.current.volume = 0.45;
      await bgmRef.current.play();
      setIsMusicOn(true);
    } catch {
      setIsMusicOn(false);
    }
  };

  useEffect(() => {
    if (!bgmRef.current) return undefined;

    const bgm = bgmRef.current;
    let mounted = true;

    const playMusic = async () => {
      try {
        bgm.volume = 0.45;
        await bgm.play();
        if (mounted) setIsMusicOn(true);
      } catch {
        if (mounted) setIsMusicOn(false);
      }
    };

    playMusic();

    // Fallback: if autoplay is blocked, replay on first interaction.
    const unlockAudio = () => {
      if (!bgm.paused) return;
      playMusic();
      window.removeEventListener('pointerdown', unlockAudio);
    };

    window.addEventListener('pointerdown', unlockAudio);
    return () => {
      mounted = false;
      window.removeEventListener('pointerdown', unlockAudio);
    };
  }, []);

  const handleOpenGift = async () => {
    if (clickLockedRef.current) return;
    clickLockedRef.current = true;

    // Mobile browsers allow audio reliably when triggered by user gesture.
    await ensureMusicPlayback();
    await playOpenSound();
    setIsOpened(true);

    setTimeout(() => {
      setShowCard(true);
    }, 700);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-pink-100 via-rose-100 to-purple-100 px-4 py-10">
      <FloatingDecorations />

      <audio ref={bgmRef} src={BGM_URL} loop preload="auto" autoPlay playsInline />
      <audio ref={openSoundRef} src={OPEN_SOUND_URL} preload="auto" playsInline />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.65),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(252,231,243,0.75),transparent_40%),radial-gradient(circle_at_50%_90%,rgba(233,213,255,0.6),transparent_45%)]" />

      <AudioToggle isMusicOn={isMusicOn} onToggle={toggleMusic} />

      <section className="relative z-10 flex w-full max-w-4xl flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {!showCard ? (
            <motion.div
              key="gift"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="relative flex h-[360px] w-full items-center justify-center md:h-[420px]"
            >
              <GiftBox isOpened={isOpened} onOpen={handleOpenGift} />
              {isOpened && (
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  {particles.map((particle) => (
                    <motion.span
                      key={particle.id}
                      className="absolute rounded-full opacity-90"
                      style={{
                        left: particle.left,
                        width: particle.size,
                        height: particle.size,
                        backgroundColor: particle.color,
                        top: '52%',
                      }}
                      initial={{ y: 0, scale: 0.8, opacity: 0 }}
                      animate={{
                        y: [-10, -120 - Math.random() * 90],
                        x: [0, (Math.random() - 0.5) * 80],
                        opacity: [0, 1, 0],
                        scale: [0.7, 1, 0.5],
                      }}
                      transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        ease: 'easeOut',
                      }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <BirthdayCard
              key="card"
              recipientImages={['/img1.jpg', '/img2.jpg', '/img3.jpg', '/img4.jpg']}
            />
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}

export default App;
