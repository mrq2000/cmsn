import { motion } from 'framer-motion';

const HEARTS = Array.from({ length: 10 }, (_, i) => ({
  id: `heart-${i}`,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  duration: 4 + Math.random() * 4,
  delay: Math.random() * 2,
  size: 16 + Math.random() * 16,
}));

const SPARKLES = Array.from({ length: 22 }, (_, i) => ({
  id: `spark-${i}`,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  duration: 2 + Math.random() * 3,
  delay: Math.random() * 2.5,
}));

function FloatingDecorations() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {HEARTS.map((heart) => (
        <motion.span
          key={heart.id}
          className="absolute select-none"
          style={{ left: heart.left, top: heart.top, fontSize: heart.size }}
          initial={{ opacity: 0.35, y: 0, x: 0 }}
          animate={{
            opacity: [0.25, 0.8, 0.25],
            y: [0, -20, 0],
            x: [0, 8, -6, 0],
            rotate: [0, 8, -8, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          💖
        </motion.span>
      ))}

      {SPARKLES.map((sparkle) => (
        <motion.span
          key={sparkle.id}
          className="absolute h-2 w-2 rounded-full bg-white/85 shadow-[0_0_15px_rgba(255,255,255,0.8)]"
          style={{ left: sparkle.left, top: sparkle.top }}
          initial={{ opacity: 0.2, scale: 0.8 }}
          animate={{
            opacity: [0.15, 0.95, 0.15],
            scale: [0.6, 1.35, 0.6],
          }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

export default FloatingDecorations;
