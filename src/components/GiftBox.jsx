import { motion } from 'framer-motion';

function GiftBox({ isOpened, onOpen }) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      whileTap={{ scale: 0.96 }}
      disabled={isOpened}
      aria-label="Open birthday gift"
      className="group relative cursor-pointer rounded-3xl focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-300/60 disabled:cursor-default"
    >
      <motion.div
        animate={
          isOpened
            ? { scale: 0.95, opacity: 0.92 }
            : {
                y: [0, -8, 0],
                rotate: [0, -2.2, 2.2, -1.2, 1.2, 0],
              }
        }
        transition={{
          duration: isOpened ? 0.45 : 2.7,
          repeat: isOpened ? 0 : Infinity,
          ease: 'easeInOut',
        }}
        className="relative w-[230px] sm:w-[280px]"
      >
        <div className="absolute -bottom-6 left-1/2 h-5 w-[82%] -translate-x-1/2 rounded-full bg-rose-300/45 blur-md" />

        <motion.div
          animate={isOpened ? { y: -105, rotate: -5, opacity: 0.85 } : { y: 0, rotate: 0 }}
          transition={{ duration: 0.75, ease: 'easeInOut' }}
          className="relative z-20 mx-auto h-16 w-[94%] rounded-2xl bg-gradient-to-r from-rose-400 via-fuchsia-400 to-pink-400 shadow-[0_18px_30px_rgba(244,114,182,0.35)]"
        >
          <div className="absolute inset-x-0 top-1/2 h-4 -translate-y-1/2 bg-white/40" />
          <div className="absolute left-1/2 top-0 h-full w-6 -translate-x-1/2 bg-white/40" />
          <div className="absolute left-1/2 top-0 h-9 w-14 -translate-x-1/2 -translate-y-8 rounded-full border-[9px] border-pink-200 border-b-0" />
          <div className="absolute left-1/2 top-0 h-9 w-14 -translate-x-1/2 -translate-y-8 rotate-90 rounded-full border-[9px] border-pink-200 border-b-0" />
          <div className="absolute inset-0 rounded-2xl ring-1 ring-white/30" />
        </motion.div>

        <div className="relative h-44 rounded-[1.1rem] bg-gradient-to-br from-pink-500 via-rose-500 to-fuchsia-500 shadow-[0_24px_70px_rgba(244,114,182,0.5)]">
          <div className="absolute inset-y-0 left-1/2 w-7 -translate-x-1/2 bg-white/40" />
          <div className="absolute inset-x-0 top-1/2 h-5 -translate-y-1/2 bg-white/40" />
          <div className="absolute inset-x-2 top-2 h-6 rounded-md bg-white/10" />
          <div className="absolute inset-0 rounded-[1.1rem] ring-1 ring-white/35" />
        </div>

        {!isOpened && (
          <motion.p
            initial={{ opacity: 0.7 }}
            animate={{ opacity: [0.45, 1, 0.45] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="mt-6 text-center text-lg font-semibold text-rose-600"
          >
            Nhấn để mở quà
          </motion.p>
        )}
      </motion.div>
    </motion.button>
  );
}

export default GiftBox;
