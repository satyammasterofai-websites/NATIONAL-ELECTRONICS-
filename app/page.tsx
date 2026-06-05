import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Gallery from '@/components/Gallery';
import Offers from '@/components/Offers';
import Features from '@/components/Features';
import Products from '@/components/Products';
import Brands from '@/components/Brands';
import About from '@/components/About';
import Reviews from '@/components/Reviews';
import Services from '@/components/Services';
import LocationContact from '@/components/LocationContact';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

export default function Home() {
  return (
    <main className="min-h-screen theme-radial-bg text-white">
      <Navbar />
      <Hero />
      <Gallery />
      <Offers />
      <Features />
      <Products />
      <Brands />
      <About />
      <Reviews />
      <Services />
      <LocationContact />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
