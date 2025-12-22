import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, Mic2, X } from "lucide-react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EventsPage from "./EventsPage";
import AgencyPage from "./AgencyPage";

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-neon selection:text-black">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-60">
        <div className="absolute inset-0 z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

        <video
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          controls={false}
          preload="auto"
          className="h-full w-full object-cover grayscale contrast-125"
        >
          <source src="/logo-3d.mp4" type="video/mp4" />
        </video>
      </div>

      <nav className="fixed left-0 top-0 z-50 flex w-full items-center justify-between p-6 mix-blend-difference">
        <Link
          to="/"
          className="font-display text-xl font-bold uppercase tracking-widest"
        >
          Pluglab&#174;
        </Link>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white md:hidden"
          type="button"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        <div className="hidden gap-8 text-sm font-bold uppercase tracking-widest md:flex">
          <Link to="/popups" className="transition-colors hover:opacity-80">
            <img src="/pop-ads.png" alt="Pop Ads" className="h-6 w-auto" />
          </Link>
          <Link to="/parties" className="transition-colors hover:opacity-80">
            <img src="/parties.png" alt="Parties" className="h-6 w-auto" />
          </Link>
          <Link to="/agency" className="transition-colors hover:text-neon">
            Agency
          </Link>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed left-0 top-[72px] z-40 w-full bg-black/90 px-6 py-6 text-sm font-bold uppercase tracking-widest text-white backdrop-blur md:hidden">
          <div className="flex flex-col gap-4">
            <Link
              to="/popups"
              className="flex items-center"
              onClick={() => setMenuOpen(false)}
            >
              <img src="/pop-ads.png" alt="Pop Ads" className="h-6 w-auto" />
              <span className="sr-only">Pop Ads</span>
            </Link>
            <Link
              to="/parties"
              className="flex items-center"
              onClick={() => setMenuOpen(false)}
            >
              <img src="/parties.png" alt="Parties" className="h-6 w-auto" />
              <span className="sr-only">Parties</span>
            </Link>
            <Link to="/agency" onClick={() => setMenuOpen(false)}>
              Agency
            </Link>
          </div>
        </div>
      )}

      <main className="relative z-10 flex h-screen flex-col items-center justify-center px-4 text-center">
        <div className="relative mb-12">
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="font-display text-[18vw] font-black uppercase leading-[0.8] text-white mix-blend-difference"
          >
            CULTURE
            <br />
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "2px white" }}
            >
              HUB
            </span>
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid w-full max-w-md grid-cols-1 gap-4 px-4 md:max-w-4xl md:grid-cols-3"
        >
          <Link to="/popups" className="flex-1">
            <button className="flex w-full items-center justify-center border-2 border-white bg-transparent px-8 py-4 transition-all hover:bg-white">
              <img
                src="/pop-ads.png"
                alt="Pop Ads"
                className="h-8 w-auto"
              />
            </button>
          </Link>

          <Link to="/parties" className="flex-1">
            <button className="flex w-full items-center justify-center border-2 border-neon bg-neon px-8 py-4 shadow-[0_0_20px_rgba(204,255,0,0.3)] transition-all hover:bg-transparent">
              <img
                src="/parties.png"
                alt="Parties"
                className="h-8 w-auto"
              />
            </button>
          </Link>

          <Link to="/agency" className="flex-1">
            <button className="flex w-full items-center justify-center border-2 border-white/60 bg-black/50 px-8 py-4 text-white transition-all hover:border-white hover:bg-white hover:text-black">
              <span className="flex items-center gap-3 font-bold uppercase tracking-wider">
                <Mic2 className="h-5 w-5" />
                Booking Agency
              </span>
            </button>
          </Link>
        </motion.div>
      </main>

      <div className="fixed bottom-0 z-40 w-full overflow-hidden border-t-2 border-black bg-neon py-2 text-black">
        <motion.div
          className="font-display flex whitespace-nowrap text-base font-bold uppercase"
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className="mx-16 inline-flex items-center gap-6 whitespace-nowrap"
            >
              <span className="mr-4">Artist Management</span>
              <span aria-hidden="true" className="mr-4">
                —
              </span>
              <img
                src="/pop-ads.png"
                alt="Pop Ads"
                className="mr-4 h-6 w-auto"
              />
              <span aria-hidden="true" className="mr-4">
                —
              </span>
              <img src="/parties.png" alt="Parties" className="h-6 w-auto" />
              <span aria-hidden="true" className="ml-4">
                —
              </span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/popups" element={<EventsPage category="popup" />} />
        <Route path="/parties" element={<EventsPage category="party" />} />
        <Route path="/agency" element={<AgencyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
