import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { artists } from "./artistsData";

export default function AgencyPage() {
  const formatInstagramHandle = (url: string) => {
    const trimmed = url.replace(/\/$/, "");
    const handle = trimmed.split("/").pop() || "";
    return handle.startsWith("@") ? handle : `@${handle}`;
  };

  return (
    <div className="min-h-screen bg-black p-4 text-white md:p-8">
      <nav className="sticky top-0 z-50 mb-16 flex items-center justify-between mix-blend-difference">
        <Link
          to="/"
          className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors hover:text-neon"
        >
          <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          Back
        </Link>
        <div className="hidden font-display tracking-widest text-neon md:block">
          PLUGLAB AGENCY ROSTER
        </div>
      </nav>

      <div className="mb-16 border-b border-white/20 pb-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 font-display text-5xl font-black uppercase text-transparent md:text-8xl"
          style={{ WebkitTextStroke: "1px white" }}
        >
          Representing
          <br />
          The Culture
        </motion.h1>
        <p className="max-w-xl font-mono text-sm text-gray-400 md:text-base">
          Gestionamos el talento que define la escena underground. DJs,
          Productores y Creativos visuales disponibles para bookings
          internacionales.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
        {artists.map((artist, index) => (
          <motion.div
            key={artist.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer"
          >
            <div className="relative mb-4 aspect-[3/4] overflow-hidden bg-neutral-900">
              <img
                src={artist.image}
                alt={artist.name}
                loading="lazy"
                className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
              />

              <div className="absolute bottom-0 left-0 w-full translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0">
                <a
                  href={`mailto:pluglab.pluglab@gmail.com?subject=${encodeURIComponent(
                    artist.name,
                  )}&body=${encodeURIComponent(
                    "Hola, me interesa booking para " + artist.name + ".",
                  )}`}
                  className="flex w-full items-center justify-center gap-2 bg-neon py-3 font-bold uppercase text-black transition-colors hover:bg-white"
                >
                  <Mail className="h-4 w-4" />
                  Contactar
                </a>
              </div>
            </div>

            <div className="border-b border-white/10 pb-2 transition-colors group-hover:border-neon">
              <div className="flex items-end justify-between">
                <h3 className="font-display text-2xl font-bold uppercase transition-colors group-hover:text-neon">
                  {artist.name}
                </h3>
                <ArrowUpRight className="h-6 w-6 text-gray-600 transition-colors group-hover:text-white" />
              </div>
              <p className="font-mono text-xs uppercase tracking-widest text-gray-400">
                {artist.role}
              </p>
              <a
                href={artist.instagram}
                target="_blank"
                rel="noreferrer"
                className="mt-3 block font-mono text-xs uppercase tracking-widest text-white/70 transition-colors hover:text-neon"
              >
                {formatInstagramHandle(artist.instagram)}
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-32 border-t border-white/10 py-16 text-center">
        <h2 className="mb-6 font-display text-2xl uppercase md:text-4xl">
          Are you an artist?
        </h2>
        <a
          href="mailto:talent@pluglab.com"
          className="inline-block border border-white px-8 py-3 uppercase tracking-widest transition-colors hover:bg-white hover:text-black"
        >
          Send your demo
        </a>
      </div>
    </div>
  );
}
