import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { ArrowLeft, ShoppingBag, Ticket } from "lucide-react";
import { Link } from "react-router-dom";
import { events } from "./eventsData";

interface EventsPageProps {
  category: "party" | "popup";
}

export default function EventsPage({ category }: EventsPageProps) {
  const filteredEvents = events.filter((event) => event.type === category);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (category !== "popup") return;
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.loop = false;
    video.currentTime = 0;
    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {});
    }
  }, [category]);
  return (
    <div className="relative min-h-screen bg-black p-4 text-white md:p-8">
      {category === "popup" ? (
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            disablePictureInPicture
            controls={false}
            preload="auto"
            className="h-full w-full object-cover"
          >
            <source src="/logo-3d.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/70" />
        </div>
      ) : (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/events-bg.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/70" />
        </div>
      )}
      <div className="relative z-10">
      <nav className="sticky top-0 z-50 mb-12 flex items-center justify-between mix-blend-difference">
        <Link
          to="/"
          className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors hover:text-neon"
        >
          <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>
        <div className="flex items-center gap-4">
          <img src="/pop-ads.png" alt="Pop Ads" className="h-6 w-auto" />
          <img src="/parties.png" alt="Parties" className="h-6 w-auto" />
        </div>
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 flex justify-center"
      >
        <img
          src={category === "party" ? "/parties.png" : "/pop-ads.png"}
          alt={category === "party" ? "Parties" : "Pop Ads"}
          className="h-16 w-auto md:h-24"
        />
      </motion.div>

      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative aspect-[3/4] cursor-pointer overflow-hidden border border-white/10 bg-neutral-900 transition-colors hover:border-neon/50"
            >
              <img
                src={event.image}
                alt={event.title}
                loading="lazy"
                className="h-full w-full object-cover grayscale transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0"
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 p-4 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="mb-2 rounded-full border border-neon px-2 py-1 font-mono text-xs uppercase tracking-widest text-neon">
                  {event.date}
                </span>
                <h3 className="mb-2 font-display text-2xl font-bold uppercase leading-none">
                  {event.title}
                </h3>
                <p className="mb-6 font-mono text-sm text-gray-300">
                  {event.location}
                </p>

                {event.status === "SOLD OUT" ? (
                  <span className="flex items-center gap-2 bg-white/20 px-6 py-2 text-xs font-bold uppercase tracking-wider text-white/70">
                    {category === "party" ? (
                      <Ticket className="h-4 w-4" />
                    ) : (
                      <ShoppingBag className="h-4 w-4" />
                    )}
                    Sold Out
                  </span>
                ) : (
                  <a
                    href="https://www.enterticket.es"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 bg-white px-6 py-2 text-xs font-bold uppercase tracking-wider text-black transition-colors hover:bg-neon"
                  >
                    {category === "party" ? (
                      <Ticket className="h-4 w-4" />
                    ) : (
                      <ShoppingBag className="h-4 w-4" />
                    )}
                    Info & Tickets
                  </a>
                )}
              </div>

              <div className="absolute right-4 top-4 border border-white/20 bg-black px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                {event.status}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex h-64 items-center justify-center border border-white/10 font-mono uppercase tracking-widest text-gray-500">
          No upcoming {category} events announced yet.
        </div>
      )}
      </div>
    </div>
  );
}
