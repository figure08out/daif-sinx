import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const Section = ({ children, className = "" }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInUp}
      transition={{ duration: 0.6 }}
      className={`py-14 md:py-24 ${className}`}
    >
      {children}
    </motion.section>
  );
};

const eventImages = [
  '/IMG_7912.JPG',
  '/IMG-20250425-WA0117.jpg',
  '/IMG_7914.JPG',
  '/IMG_7913.JPG'
];

const products = {
  b2b: [
    { name: 'Bundlr', url: 'https://bundlr.sinxsolutions.ai', logo: '/Bundlr.svg' },
    { name: 'Sinx Solutions', url: 'https://www.sinxsolutions.ai', logo: '/SinX.svg' }
  ],
  b2c: [
    { name: 'Knowtice AI', url: 'https://www.knowtice.ai', logo: '/Knowtice.svg' },
    { name: 'Career Growth AI', url: 'https://www.mycareergrowth.ai', logo: '/MCG.svg' }
  ]
};

function Slideshow({ images }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIndex(i => (i + 1) % images.length), 3500);
    return () => clearInterval(timer);
  }, [images.length]);
  return (
    <div className="relative w-full h-96 xs:h-[28rem] sm:h-96 md:h-[32rem] lg:h-[38rem] rounded-xl overflow-hidden shadow-xl bg-white/30">
      {images.map((src, i) => (
        <motion.div
          key={src}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: i === index ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          style={{ pointerEvents: i === index ? 'auto' : 'none' }}
        >
          <Image
            src={src}
            alt={`Event highlight ${i + 1}`}
            fill
            style={{ objectFit: 'cover' }}
            priority={i === 0}
            sizes="(max-width: 768px) 100vw, 80vw"
          />
        </motion.div>
      ))}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full border-2 border-purple-400 bg-white transition-all ${i === index ? 'bg-purple-500 scale-125' : 'opacity-60'}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [feedbackProduct, setFeedbackProduct] = useState('Bundlr');
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Head>
        <title>SinX at Dubai AI Festival 2025</title>
        <meta name="description" content="Highlights from the Dubai AI Festival 2025 - A celebration of artificial intelligence and innovation" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&display=swap" rel="stylesheet" />
      </Head>

      {/* Animated/Blob Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[60vw] h-[60vw] bg-gradient-to-br from-purple-300 via-purple-200 to-purple-100 rounded-full blur-3xl opacity-60 animate-pulse" />
        <div className="absolute top-1/2 right-0 w-[40vw] h-[40vw] bg-gradient-to-tr from-purple-400 via-fuchsia-200 to-white rounded-full blur-2xl opacity-40 animate-pulse delay-1000" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[30vw] bg-gradient-to-r from-fuchsia-200 via-purple-100 to-white rounded-t-full blur-2xl opacity-50 animate-pulse" />
      </div>

      {/* Navbar */}
      <nav className="w-full bg-[#181828] border-b border-purple-900 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image src="/SinX.png" alt="SinX Logo" width={32} height={32} className="h-8 w-auto" />
            <span className="text-white text-xl font-bold tracking-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>SinX</span>
          </div>
          <div className="hidden md:flex items-center space-x-10">
            <a href="#products" className="text-purple-300 hover:text-white text-base font-medium transition-colors duration-150 pb-1 border-b-2 border-transparent hover:border-purple-400">Products</a>
            <a href="#icymi" className="text-purple-300 hover:text-white text-base font-medium transition-colors duration-150 pb-1 border-b-2 border-transparent hover:border-purple-400">ICYMI</a>
            <a href="#whats-next" className="text-purple-300 hover:text-white text-base font-medium transition-colors duration-150 pb-1 border-b-2 border-transparent hover:border-purple-400">What's Next</a>
            <a href="#feedback" className="text-purple-300 hover:text-white text-base font-medium transition-colors duration-150 pb-1 border-b-2 border-transparent hover:border-purple-400">Feedback</a>
          </div>
        </div>
      </nav>

      {/* Hero + Slideshow */}
      <Section className="relative min-h-screen flex items-center justify-center text-center px-2 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Slideshow images={eventImages} />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 w-full flex flex-col items-center justify-center">
          <h1 className="text-5xl xs:text-6xl md:text-8xl font-extrabold mb-2" style={{ fontFamily: 'Orbitron, BankGothic, sans-serif', color: '#e0e0e0', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            SinX Solutions
          </h1>
          <h2 className="text-4xl xs:text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-blue-300 drop-shadow-lg" style={{ fontFamily: 'Montserrat, sans-serif', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            at Dubai AI Festival
          </h2>
          <p className="text-base xs:text-lg md:text-2xl text-purple-200 mb-8 font-medium">April 23-24, 2025 | A Celebration of AI Innovation</p>
        </div>
      </Section>

      {/* About SinX Solutions */}
      <Section className="max-w-3xl mx-auto px-2 xs:px-4 mb-16 pt-16 pb-16">
        <div className="flex flex-col items-center text-center">
          <Image src="/SinX.png" alt="SinX Solutions logo" width={140} height={140} className="mb-4" />
          <h2 className="text-5xl font-extrabold text-purple-800 mb-4">SinX Solutions</h2>
          <p className="text-xl text-purple-700 mb-2 max-w-2xl">Empowering innovation at the intersection of AI and real-world impact. We build smart tools and platforms to help you stay ahead in a rapidly changing world.</p>
        </div>
      </Section>

      {/* Products Section */}
      <Section className="bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 rounded-2xl max-w-6xl mx-auto px-2 xs:px-4 shadow-2xl mb-12 border border-purple-100">
        <h2 className="text-3xl xs:text-4xl font-bold mb-4 text-center text-purple-700">Our Products</h2>
        {/* B2B Section */}
        <div className="grid grid-cols-1 gap-6 md:gap-8 mb-10">
          <motion.a
            href="https://bundlr.sinxsolutions.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-8 bg-white/90 rounded-xl shadow-lg hover:shadow-2xl hover:bg-purple-50 transition-all border border-purple-200 w-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="w-20 h-20 mb-4 flex items-center justify-center">
              <Image src="/Bundlr.svg" alt="Bundlr logo" width={80} height={80} />
            </div>
            <h3 className="text-xl font-semibold text-purple-800 mb-1 text-center">Bundlr</h3>
            <span className="text-base text-purple-500 text-center mb-2">Smart bundles</span>
          </motion.a>
        </div>
        {/* B2C Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <motion.a
            href="https://www.mycareergrowth.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-8 bg-white/90 rounded-xl shadow-lg hover:shadow-2xl hover:bg-purple-50 transition-all border border-purple-200 w-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="w-20 h-20 mb-4 flex items-center justify-center">
              <Image src="/MCG.png" alt="My Career Growth logo" width={80} height={80} />
            </div>
            <h3 className="text-xl font-semibold text-purple-800 mb-1 text-center">My Career Growth</h3>
            <span className="text-base text-purple-500 text-center mb-2">Career development, for professionals</span>
          </motion.a>
          <motion.a
            href="https://www.knowtice.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-8 bg-white/90 rounded-xl shadow-lg hover:shadow-2xl hover:bg-purple-50 transition-all border border-purple-200 w-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="w-20 h-20 mb-4 flex items-center justify-center">
              <Image src="/Knowtice.png" alt="Knowtice AI logo" width={80} height={80} />
            </div>
            <h3 className="text-xl font-semibold text-purple-800 mb-1 text-center">Knowtice AI</h3>
            <span className="text-base text-purple-500 text-center mb-2">Curated newsletters, for those who want to stay ahead</span>
          </motion.a>
        </div>
      </Section>

      {/* LinkedIn Post */}
      <Section className="bg-white/60 rounded-2xl max-w-5xl mx-auto px-2 xs:px-4 shadow-lg mb-16">
        <h2 className="text-2xl xs:text-3xl font-bold mb-10 text-center text-purple-700">From Our Social Media</h2>
        <div className="w-full flex flex-col md:flex-row gap-8 h-[650px] overflow-hidden rounded-xl">
          <iframe 
            src="https://www.linkedin.com/embed/feed/update/urn:li:activity:7321672216729829377" 
            height="650" 
            width="100%" 
            frameBorder="0" 
            allowFullScreen 
            title="LinkedIn Post 1"
            className="w-full md:w-1/2 rounded-xl"
          ></iframe>
          <iframe 
            src="https://www.linkedin.com/embed/feed/update/urn:li:activity:7321159430593548289" 
            height="650" 
            width="100%" 
            frameBorder="0" 
            allowFullScreen 
            title="LinkedIn Post 2"
            className="w-full md:w-1/2 rounded-xl"
          ></iframe>
        </div>
      </Section>

      {/* ICYMI Section */}
      <Section className="bg-gray-100 rounded-2xl max-w-4xl mx-auto px-2 xs:px-4 shadow-lg mb-12">
        <h2 className="text-2xl xs:text-3xl font-bold mb-10 text-center text-purple-700">ICYMI</h2>
        <div className="space-y-6">
          <motion.div
            className="relative p-8 xs:p-12 bg-white border-2 border-purple-300 rounded-xl shadow-lg flex flex-col items-center min-h-[260px] max-w-3xl mx-auto"
            whileHover={{ scale: 1.02 }}
          >
            {/* News badge and date */}
            <div className="absolute left-8 top-8 flex items-center gap-3">
              <span className="bg-red-600 text-white text-xs font-bold px-4 py-1 rounded-full tracking-widest shadow uppercase">Press Release</span>
              <span className="text-xs text-gray-400 font-semibold ml-2">April 2025</span>
            </div>
            {/* Title */}
            <h3 className="text-3xl xs:text-4xl font-extrabold mb-4 text-purple-900 mt-8 text-center border-b-2 border-purple-200 pb-2 w-full" style={{fontFamily: 'Georgia, Times, serif'}}>
              SinX Solutions Launches My Career Growth
            </h3>
            <p className="text-xl text-purple-700 mb-6 text-center max-w-2xl">
              At the Dubai AI Festival, SinX Solutions proudly unveiled <span className="font-bold text-purple-900">My Career Growth</span> (MCG)—an AI-powered platform designed to transform how professionals navigate their careers. MCG empowers users with personalized, AI-driven tools for resume building, career roadmaps, skill gap analysis, and mock interviews. The launch drew crowds and sparked conversations about the future of work, with attendees experiencing firsthand how MCG makes career development smarter, faster, and more accessible for everyone.
            </p>
            <motion.a
              href="#"
              whileHover={{ scale: 1.04 }}
              className="bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center font-bold text-lg px-8 py-3 rounded-lg shadow transition-transform border border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200"
            >
              Read More <ArrowRightIcon className="w-5 h-5 ml-2" />
            </motion.a>
          </motion.div>
        </div>
      </Section>

      {/* What's Next Section - moved above Feedback Form */}
      <Section className="bg-white/90 rounded-2xl max-w-5xl mx-auto px-2 xs:px-4 shadow-2xl mb-12 flex flex-col md:flex-row items-center md:items-stretch gap-8">
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <Image src="/IMG_7912.JPG" alt="What's Next for SinX" width={600} height={400} className="rounded-xl object-cover w-full h-64 md:h-full" />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h2 className="text-3xl xs:text-4xl font-bold mb-8 text-center md:text-left text-purple-700">What's Next for SinX</h2>
          <p className="text-xl text-purple-900 mb-0 text-center md:text-left">
            Next up, SinX Solutions is making bold strides with <span className="font-bold text-fuchsia-700">Invisibl AI</span> and <span className="font-bold text-blue-700">Intelligence OS</span>. We're also excited to announce our move to the <span className="font-bold text-purple-700">Dubai AI Campus</span>—a new hub for innovation and collaboration. We're committed to making intelligence accessible, seamless, and truly human-first—empowering businesses and individuals to harness the full potential of AI with ease. Stay tuned for new launches and innovations that will redefine how you experience and interact with artificial intelligence. <a href="https://sinxsolutions.ai/" target="_blank" rel="noopener noreferrer" className="underline text-blue-600 hover:text-blue-800">Learn more</a>.
          </p>
        </div>
      </Section>

      {/* Feedback Form */}
      <Section className="mb-12">
        <div className="max-w-2xl mx-auto px-2 xs:px-4">
          <h2 className="text-3xl xs:text-4xl font-bold mb-8 text-center text-purple-700">Share Your Feedback</h2>
          <form className="space-y-4 bg-white/60 p-4 xs:p-8 rounded-2xl shadow-lg" action="mailto:info@sinxsolutions.ai" method="POST" encType="text/plain">
            <label className="block text-purple-700 font-medium mb-2" htmlFor="feedback-product">Which product is this feedback for?</label>
            <select
              id="feedback-product"
              value={feedbackProduct}
              onChange={e => setFeedbackProduct(e.target.value)}
              className="w-full p-3 bg-purple-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-900 mb-2"
            >
              <option>Bundlr</option>
              <option>Sinx Solutions</option>
              <option>Knowtice AI</option>
              <option>Career Growth AI</option>
            </select>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 bg-purple-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-900"
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full p-3 bg-purple-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-900"
            />
            <button
              type="submit"
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold text-white transition-colors"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-purple-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <Image src="/SinX.png" alt="SinX Logo" width={80} height={80} className="h-12 w-auto mb-4" />
              <p className="text-sm text-purple-200">
                SinX Solutions is at the forefront of AI innovation, creating intelligent solutions for businesses and individuals.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#products" className="text-purple-200 hover:text-white">Products</a></li>
                <li><a href="#icymi" className="text-purple-200 hover:text-white">ICYMI</a></li>
                <li><a href="#whats-next" className="text-purple-200 hover:text-white">What's Next</a></li>
                <li><a href="#feedback" className="text-purple-200 hover:text-white">Feedback</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4 mb-4">
                <a href="https://www.linkedin.com/company/sinxsolutions/" target="_blank" rel="noopener noreferrer" className="text-purple-200 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href="https://www.instagram.com/sinxsolutions/" target="_blank" rel="noopener noreferrer" className="text-purple-200 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 2.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm6 1.25a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                  </svg>
                </a>
                <a href="https://x.com/sinx_solutions" target="_blank" rel="noopener noreferrer" className="text-purple-200 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.53 3H21l-7.19 7.53L22 21h-6.27l-4.13-5.06L5.5 21H2l7.64-8.01L2 3h6.27l3.77 4.63L17.53 3zm-2.13 16h2.11l-5.6-6.87-1.5 1.62L15.4 19zM6.41 5H4.3l5.6 6.87 1.5-1.62L6.41 5z" />
                  </svg>
                </a>
              </div>
              <div className="text-sm text-purple-200">
                FDRK4466 Compass Building, Al Shohada Road, Al Hamra Industrial Zone-FZ Ras Al Khaimah
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-purple-800 text-center text-sm text-purple-300">
            <p>&copy; {new Date().getFullYear()} SinX Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 