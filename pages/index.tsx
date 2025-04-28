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
    <div className="relative w-full h-64 xs:h-80 sm:h-96 md:h-[32rem] lg:h-[38rem] rounded-xl overflow-hidden shadow-xl bg-white/30">
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
      <Section className="min-h-[60vh] flex flex-col items-center justify-center text-center px-2">
        <h1 className="text-4xl xs:text-5xl md:text-7xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-fuchsia-500 to-blue-400 drop-shadow-lg" style={{ fontFamily: 'Montserrat, sans-serif', letterSpacing: '-0.03em', lineHeight: 1.1 }}>SinX at Dubai AI Festival</h1>
        <p className="text-base xs:text-lg md:text-2xl text-purple-900 mb-8 font-medium">April 23-24, 2025 | A Celebration of AI Innovation</p>
        <div className="w-full max-w-[90vw] xl:max-w-[1600px] mx-auto">
          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10" style={{background: 'var(--color-card-bg)'}}>
            <Slideshow images={eventImages} />
          </div>
        </div>
      </Section>

      {/* Products Section - B2B */}
      <Section className="bg-white/60 rounded-2xl max-w-6xl mx-auto px-2 xs:px-4 shadow-lg mb-12">
        <h2 className="text-3xl xs:text-4xl font-bold mb-4 text-center text-purple-700">Our Products</h2>
        <h3 className="text-xl xs:text-2xl font-semibold mb-6 text-purple-600 text-center">B2B Solutions</h3>
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-6 md:gap-8 mb-10">
          {products.b2b.map((product) => (
            <motion.a
              key={product.url}
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-4 xs:p-6 bg-white rounded-xl shadow-md hover:shadow-xl hover:bg-purple-50 transition-all border border-purple-100 mb-6"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="w-16 h-16 xs:w-20 xs:h-20 mb-4 flex items-center justify-center">
                <Image src={product.logo} alt={product.name + ' logo'} width={80} height={80} />
              </div>
              <h3 className="text-base xs:text-lg font-semibold text-purple-800 mb-1 text-center">{product.name}</h3>
              <span className="text-xs text-purple-400 text-center">{product.url.replace('https://', '')}</span>
            </motion.a>
          ))}
        </div>
        <h3 className="text-xl xs:text-2xl font-semibold mb-6 text-purple-600 text-center">B2C Solutions</h3>
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-6 md:gap-8">
          {products.b2c.map((product) => (
            <motion.a
              key={product.url}
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-4 xs:p-6 bg-white rounded-xl shadow-md hover:shadow-xl hover:bg-purple-50 transition-all border border-purple-100 mb-6"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="w-16 h-16 xs:w-20 xs:h-20 mb-4 flex items-center justify-center">
                <Image src={product.logo} alt={product.name + ' logo'} width={80} height={80} />
              </div>
              <h3 className="text-base xs:text-lg font-semibold text-purple-800 mb-1 text-center">{product.name}</h3>
              <span className="text-xs text-purple-400 text-center">{product.url.replace('https://', '')}</span>
            </motion.a>
          ))}
        </div>
      </Section>

      {/* LinkedIn Post */}
      <Section className="bg-white/60 rounded-2xl max-w-4xl mx-auto px-2 xs:px-4 shadow-lg mb-12">
        <h2 className="text-2xl xs:text-3xl font-bold mb-8 text-center text-purple-700">From Our Social Media</h2>
        <div className="w-full flex flex-col md:flex-row gap-6 h-[500px] overflow-hidden rounded-xl">
          <iframe 
            src="https://www.linkedin.com/embed/feed/update/urn:li:activity:7321672216729829377" 
            height="500" 
            width="100%" 
            frameBorder="0" 
            allowFullScreen 
            title="LinkedIn Post 1"
            className="w-full md:w-1/2 rounded-xl"
          ></iframe>
          <iframe 
            src="https://www.linkedin.com/embed/feed/update/urn:li:activity:7321672216729829377" 
            height="500" 
            width="100%" 
            frameBorder="0" 
            allowFullScreen 
            title="LinkedIn Post 2"
            className="w-full md:w-1/2 rounded-xl"
          ></iframe>
        </div>
      </Section>

      {/* ICYMI Section */}
      <Section className="bg-purple-50 rounded-2xl max-w-4xl mx-auto px-2 xs:px-4 shadow-lg mb-12">
        <h2 className="text-2xl xs:text-3xl font-bold mb-8 text-center text-purple-700">ICYMI</h2>
        <div className="space-y-6">
          <motion.div
            className="p-4 xs:p-6 bg-white rounded-xl shadow-md flex flex-col items-center"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-lg xs:text-xl font-semibold mb-2 text-purple-800">Press Release</h3>
            <a href="#" className="text-purple-500 hover:text-purple-700 flex items-center font-medium">
              Read More <ArrowRightIcon className="w-4 h-4 ml-2" />
            </a>
          </motion.div>
        </div>
      </Section>

      {/* What's Next Section - moved above Feedback Form */}
      <Section className="bg-white/60 rounded-2xl max-w-4xl mx-auto px-2 xs:px-4 shadow-lg mb-12">
        <h2 className="text-2xl xs:text-3xl font-bold mb-8 text-center text-purple-700">What's Next for SinX</h2>
        <p className="text-base xs:text-lg text-purple-900 mb-0 text-center">
          We're just getting started! SinX is committed to pushing the boundaries of AI innovation. Stay tuned for new product launches, partnerships, and opportunities to collaborate with us as we shape the future of intelligent solutions.
        </p>
      </Section>

      {/* Feedback Form */}
      <Section className="mb-12">
        <div className="max-w-2xl mx-auto px-2 xs:px-4">
          <h2 className="text-3xl xs:text-4xl font-bold mb-8 text-center text-purple-700">Share Your Feedback</h2>
          <form className="space-y-4 bg-white/60 p-4 xs:p-8 rounded-2xl shadow-lg">
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
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/company/sinxsolutions" target="_blank" rel="noopener noreferrer" className="text-purple-200 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href="https://twitter.com/sinxsolutions" target="_blank" rel="noopener noreferrer" className="text-purple-200 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="https://www.facebook.com/sinxsolutions" target="_blank" rel="noopener noreferrer" className="text-purple-200 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
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