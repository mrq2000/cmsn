import { motion } from 'framer-motion';

function AudioToggle({ isMusicOn, onToggle }) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      whileTap={{ scale: 0.94 }}
      whileHover={{ scale: 1.05 }}
      className="absolute right-4 top-4 z-20 rounded-full border border-white/70 bg-white/75 px-4 py-2 text-sm font-semibold text-rose-600 shadow-md backdrop-blur sm:right-8 sm:top-8"
    >
      {isMusicOn ? '🔊 Tắt nhạc' : '🎵 Bật nhạc'}
    </motion.button>
  );
}

export default AudioToggle;
