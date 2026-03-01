import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Hero from '@/components/layout/Hero';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ui/ProductCard';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Home = () => {
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [topSelling, setTopSelling] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        const data = await response.json();
        // Mocking sections for now
        setNewArrivals(data.slice(0, 4));
        setTopSelling(data.slice(4, 8));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        
        {/* New Arrivals Section */}
        <section className="container px-4 sm:px-8 py-16 sm:py-24 mx-auto border-b">
          <h2 className="font-integralgf text-3xl sm:text-5xl font-black text-center mb-12 sm:mb-16 uppercase">
            New Arrivals
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
            {loading ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="flex flex-col gap-4 animate-pulse">
                  <div className="aspect-square rounded-[20px] bg-muted" />
                  <div className="h-4 w-3/4 bg-muted rounded" />
                  <div className="h-4 w-1/4 bg-muted rounded" />
                </div>
              ))
            ) : (
              newArrivals.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
          <div className="flex justify-center mt-12 sm:mt-16">
            <Button variant="outline" className="rounded-full px-12 h-12 w-full sm:w-auto border-muted-foreground/20 hover:bg-black hover:text-white transition-all">
              View All
            </Button>
          </div>
        </section>

        {/* Top Selling Section */}
        <section className="container px-4 sm:px-8 py-16 sm:py-24 mx-auto">
          <h2 className="font-integralgf text-3xl sm:text-5xl font-black text-center mb-12 sm:mb-16 uppercase">
            Top Selling
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
            {loading ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="flex flex-col gap-4 animate-pulse">
                  <div className="aspect-square rounded-[20px] bg-muted" />
                  <div className="h-4 w-3/4 bg-muted rounded" />
                  <div className="h-4 w-1/4 bg-muted rounded" />
                </div>
              ))
            ) : (
              topSelling.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
          <div className="flex justify-center mt-12 sm:mt-16">
            <Button variant="outline" className="rounded-full px-12 h-12 w-full sm:w-auto border-muted-foreground/20 hover:bg-black hover:text-white transition-all">
              View All
            </Button>
          </div>
        </section>

        {/* Browse By Style Section */}
        <section className="container px-4 sm:px-8 py-16 sm:py-24 mx-auto">
          <div className="bg-[#F0F0F0] rounded-[20px] sm:rounded-[40px] p-8 sm:p-16">
            <h2 className="font-integralgf text-3xl sm:text-5xl font-black text-center mb-12 sm:mb-16 uppercase">
              Browse By Dress Style
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
               <Link to="/category" className="relative overflow-hidden rounded-[20px] h-[190px] sm:h-[289px] bg-white group cursor-pointer col-span-1">
                  <span className="absolute top-6 left-6 sm:top-8 sm:left-8 font-bold text-2xl sm:text-3xl z-10">Casual</span>
                  <img src="/assets/Casual.png" alt="Casual" className="absolute top-0 right-0 h-full w-full object-cover transition-transform group-hover:scale-105 duration-300" />
               </Link>
               <Link to="/category" className="relative overflow-hidden rounded-[20px] h-[190px] sm:h-[289px] bg-white group cursor-pointer md:col-span-2">
                  <span className="absolute top-6 left-6 sm:top-8 sm:left-8 font-bold text-2xl sm:text-3xl z-10">Formal</span>
                  <img src="/assets/Formal.png" alt="Formal" className="absolute top-0 right-0 h-full w-full object-cover transition-transform group-hover:scale-105 duration-300" />
               </Link>
               <Link to="/category" className="relative overflow-hidden rounded-[20px] h-[190px] sm:h-[289px] bg-white group cursor-pointer md:col-span-2">
                  <span className="absolute top-6 left-6 sm:top-8 sm:left-8 font-bold text-2xl sm:text-3xl z-10">Party</span>
                  <img src="/assets/Party.png" alt="Party" className="absolute top-0 right-0 h-full w-full object-cover transition-transform group-hover:scale-105 duration-300" />
               </Link>
               <Link to="/category" className="relative overflow-hidden rounded-[20px] h-[190px] sm:h-[289px] bg-white group cursor-pointer col-span-1">
                  <span className="absolute top-6 left-6 sm:top-8 sm:left-8 font-bold text-2xl sm:text-3xl z-10">Gym</span>
                  <img src="/assets/Gym.png" alt="Gym" className="absolute top-0 right-0 h-full w-full object-cover transition-transform group-hover:scale-105 duration-300" />
               </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
