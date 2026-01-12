import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { Link } from 'react-router-dom';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const heroImages = [
  'https://images.unsplash.com/photo-1649520937981-763d6a14de7d?q=80&w=3131&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1635749045243-dcc5c09e3032?q=80&w=2936&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542060748-10c28b62716f?q=80&w=2940&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1647013629840-13c441a3221b?q=80&w=3087&auto=format&fit=crop'
];

const aboutImage = 'https://images.unsplash.com/photo-1692975444489-1e1b6fd82190?q=80&w=3024&auto=format&fit=crop';

function Index() {
  return (
    <div className="min-h-screen w-full  text-[#1a1a1a] font-sans selection:bg-black selection:text-white">
      
      {/* --- HERO SECTION --- */}
      <section className="relative w-full min-h-[90vh] flex flex-col md:flex-row items-center overflow-hidden">
        {/* Text Content */}
        <div className="w-full md:w-1/2 p-8 md:p-20 z-10 flex flex-col items-start justify-center order-2 md:order-1">
          <span className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4 animate-fade-in">Est. 2026</span>
          <h1 className="text-6xl md:text-8xl font-light leading-[1.1] mb-6 tracking-tighter">
            Loop into <br />
            <span className="font-serif italic text-gray-400">Luxury</span>
          </h1>
          <p className="text-lg text-gray-600 mb-10 max-w-md leading-relaxed">
            Curated authentic high-fashion pieces. Pre-loved and new collections from the world's most prestigious houses.
          </p>
          <Link
            to="/product"
            className="group relative px-12 py-4 bg-black text-white text-sm uppercase tracking-widest overflow-hidden transition-all duration-500"
          >
            <span className="relative z-10">Explore Collection</span>
            <div className="absolute inset-0 bg-gray-800 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link>
        </div>

        {/* Visual Swiper */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-screen order-1 md:order-2">
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            effect="fade"
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true, dynamicBullets: true }}
            loop
            className="h-full w-full"
          >
            {heroImages.map((src, idx) => (
              <SwiperSlide key={idx}>
                <div className="h-full w-full overflow-hidden">
                  <img
                    src={src}
                    alt="Luxury item"
                    className="w-full h-full object-cover transform scale-100 hover:scale-105 transition-transform duration-[3s]"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* --- STATS BAR --- */}
      <div className="w-full border-y border-gray-100 py-10 flex flex-wrap justify-around gap-8 px-4 bg-white">
        {['Authenticity Guaranteed', 'Express Shipping', 'Curated Quality'].map((text, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="h-[1px] w-8 bg-black"></span>
            <span className="text-[10px] uppercase tracking-widest font-semibold">{text}</span>
          </div>
        ))}
      </div>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="max-w-7xl mx-auto py-24 px-6 md:px-12 flex flex-col md:flex-row gap-20 items-center">
        <div className="w-full md:w-1/2 relative group">
          <div className="absolute -inset-4 border border-gray-100 rounded-sm -z-10 group-hover:inset-0 transition-all duration-500" />
          <img
            src={aboutImage}
            alt="Craftsmanship"
            className="w-full aspect-[4/5] object-cover grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
          />
        </div>
        <div className="w-full md:w-1/2 space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif">The Loop Story</h2>
          <p className="text-xl leading-relaxed text-gray-600 font-light">
            We believe high fashion should be accessible without compromise. 
            Loop is a dedicated space for those who value 
            <span className="text-black font-normal"> provenance, craftsmanship, and timeless style.</span>
          </p>
          <div className="pt-4">
             <Link to="/about" className="text-sm font-bold uppercase tracking-widest border-b-2 border-black pb-2 hover:text-gray-500 hover:border-gray-300 transition-colors">
               Our Heritage
             </Link>
          </div>
        </div>
      </section>

      {/* --- FULL WIDTH CALLOUT --- */}
      <section className="bg-[#1a1a1a] text-white py-24 px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-light mb-8 tracking-tight">
          True luxury isn’t just about the label.
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-12 italic">
          "It’s about how confidently you wear it and the stories your clothes tell."
        </p>
        <Link to="/product" className="px-12 py-4 border border-white text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all">
          Shop Now
        </Link>
      </section>

      {/* Animation Styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 1.5s ease-out forwards;
        }
        .swiper-pagination-bullet-active {
          background: #000 !important;
        }
      `}</style>

      {/* Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Playfair+Display:italic,wght@400;700&display=swap" rel="stylesheet" />
    </div>
  );
}

export default Index;