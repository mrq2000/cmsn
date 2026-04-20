import { useMemo } from 'react';
import { motion } from 'framer-motion';

const QR_PLACEHOLDER =
  'https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=Happy%20Birthday%20Hong%20Nhung';

const PHOTO_QUOTES = [
  'Chúc em luôn xinh đẹp',
  'hạnh phúc',
  'thành công',
  '21/4/2001'
];

const PHOTO_ROTATIONS = [-16, 14, -11, 18];

const PHOTO_ZONES = [
  { topMin: 8, topMax: 22, leftMin: 8, leftMax: 24 },
  { topMin: 8, topMax: 22, leftMin: 76, leftMax: 92 },
  { topMin: 78, topMax: 92, leftMin: 8, leftMax: 24 },
  { topMin: 78, topMax: 92, leftMin: 76, leftMax: 92 },
];

function BirthdayCard({ recipientImages = [] }) {
  const photos = recipientImages.slice(0, 4);
  const photoCards = useMemo(
    () =>
      photos.map((photo, index) => {
        const quote = PHOTO_QUOTES[index];
        const zone = PHOTO_ZONES[index % PHOTO_ZONES.length];
        const top = zone.topMin + Math.random() * (zone.topMax - zone.topMin);
        const left = zone.leftMin + Math.random() * (zone.leftMax - zone.leftMin);

        return {
          id: `${photo}-${index}`,
          photo,
          quote,
          top,
          left,
          rotate: PHOTO_ROTATIONS[index % PHOTO_ROTATIONS.length],
          delay: 0.15 + index * 0.12,
        };
      }),
    [photos],
  );

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.88, y: 26 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative w-full max-w-2xl rounded-3xl border border-white/60 bg-white/75 p-6 text-center shadow-[0_18px_70px_rgba(236,72,153,0.25)] backdrop-blur-md sm:p-10"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(254,205,211,0.55),transparent_30%),radial-gradient(circle_at_85%_20%,rgba(233,213,255,0.55),transparent_35%),radial-gradient(circle_at_50%_95%,rgba(252,231,243,0.65),transparent_40%)]" />

      <div className="pointer-events-none absolute inset-0 z-[2] hidden md:block">
        {photoCards.map((card) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, scale: 0.85, y: 14, rotate: 0 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotate: card.rotate }}
          transition={{ delay: card.delay, duration: 0.55, ease: 'easeOut' }}
          className="absolute h-44 w-32 rounded-md border border-zinc-200 bg-white p-2 pb-7 shadow-[0_18px_36px_rgba(17,24,39,0.24)] lg:h-52 lg:w-36"
          style={{
            top: `${card.top}%`,
            left: `${card.left}%`,
            translate: '-50% -50%',
          }}
        >
          <span className="absolute -top-2 left-1/2 h-6 w-3 -translate-x-1/2 rotate-12 rounded-sm bg-amber-300/95 shadow-sm" />
          <img
            src={card.photo}
            alt="Ky niem dep"
            className="h-full w-full rounded-[2px] object-cover"
          />
          <p className="absolute bottom-2 left-0 w-full px-1 text-center text-[10px] font-medium uppercase tracking-[0.12em] text-zinc-600 lg:text-[11px]">
            {card.quote}
          </p>
        </motion.div>
        ))}
      </div>

      <div className="relative z-20">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.55 }}
          className="mb-5 grid grid-cols-2 gap-3 md:hidden"
        >
          {photoCards.map((card) => (
            <div
              key={`${card.id}-mobile`}
              className="relative rounded-md border border-zinc-200 bg-white p-1.5 pb-5 shadow-[0_12px_20px_rgba(17,24,39,0.16)]"
              style={{ transform: `rotate(${card.rotate * 0.35}deg)` }}
            >
              <span className="absolute -top-2 left-1/2 h-5 w-2.5 -translate-x-1/2 rotate-12 rounded-sm bg-amber-300/95 shadow-sm" />
              <img src={card.photo} alt="Ky niem dep" className="h-32 w-full rounded-[2px] object-cover" />
              <p className="absolute bottom-1 left-0 w-full px-1 text-center text-[8px] font-medium uppercase tracking-[0.08em] text-zinc-600">
                {card.quote}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xl font-bold leading-relaxed text-rose-700 [text-shadow:-1px_-1px_0_rgba(255,255,255,0.9),1px_-1px_0_rgba(255,255,255,0.9),-1px_1px_0_rgba(255,255,255,0.9),1px_1px_0_rgba(255,255,255,0.9),0_4px_14px_rgba(190,24,93,0.25)] sm:text-3xl"
        >
          Chúc mừng sinh nhật Hồng Nhung 🎉
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.8 }}
          className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-rose-600 [text-shadow:-1px_-1px_0_rgba(255,255,255,0.85),1px_-1px_0_rgba(255,255,255,0.85),-1px_1px_0_rgba(255,255,255,0.85),1px_1px_0_rgba(255,255,255,0.85),0_3px_12px_rgba(190,24,93,0.16)] sm:text-lg"
        >
          Chúc em luôn xinh đẹp, hạnh phúc và đạt được mọi điều mong muốn!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.82 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.65, ease: 'easeOut' }}
          className="mx-auto mt-8 w-fit rounded-2xl bg-white/90 p-3 shadow-xl"
        >
          <img
            src={QR_PLACEHOLDER}
            alt="QR nhận quà sinh nhật"
            className="h-32 w-32 rounded-xl object-cover sm:h-48 sm:w-48"
          />
          <p className="mt-3 text-sm font-semibold text-rose-600 sm:text-base">
            Nhận quà 🎁
          </p>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-yellow-300"
            style={{
              left: `${8 + i * 8}%`,
              top: `${10 + (i % 4) * 18}%`,
            }}
            initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1.1, 0.5],
              rotate: [0, 20, -20, 0],
            }}
            transition={{
              duration: 2.4 + (i % 3) * 0.4,
              delay: i * 0.08,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            ✦
          </motion.span>
        ))}
      </div>
    </motion.article>
  );
}

export default BirthdayCard;
