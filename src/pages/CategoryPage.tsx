import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ui/ProductCard';
import type { Product } from '@/types';
import { api } from '@/services/api';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const CategoryPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('Most Popular');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await api.getProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    let result = [...products];

    if (selectedCategory) {
      result = result.filter((p: Product) => p.category === selectedCategory);
    }

    result = result.filter((p: Product) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (sortBy === 'Price: Low to High') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: High to Low') {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(result);
  }, [products, selectedCategory, priceRange, sortBy]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container px-4 sm:px-8 py-8 sm:py-12 mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-64 border rounded-[20px] p-6 h-fit hidden lg:block">
            <div className="flex items-center justify-between mb-6 pb-4 border-b">
              <h2 className="font-bold text-xl">Filters</h2>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7H4M20 12H4M20 17H4"/></svg>
            </div>

            <div className="space-y-6">
              <Accordion type="multiple" defaultValue={['category', 'price', 'colors', 'size']}>
                <AccordionItem value="category" className="border-none">
                  <AccordionTrigger className="font-bold">Category</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-3 pt-2">
                        {['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans', 'Casual'].map(cat => (
                            <li 
                                key={cat} 
                                onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
                                className={`flex items-center justify-between transition-colors cursor-pointer group ${selectedCategory === cat ? 'text-black font-bold' : 'text-muted-foreground hover:text-foreground'}`}
                            >
                                <span>{cat}</span>
                                <svg className={`w-4 h-4 ${selectedCategory === cat ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                            </li>
                        ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="price">
                  <AccordionTrigger className="font-bold">Price</AccordionTrigger>
                  <AccordionContent className="pt-4 px-2">
                    <Slider 
                        defaultValue={[0, 500]} 
                        max={500} 
                        step={10} 
                        onValueChange={(val) => setPriceRange(val)}
                        className="mb-4" 
                    />
                    <div className="flex justify-between text-sm font-bold">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="colors">
                  <AccordionTrigger className="font-bold">Colors</AccordionTrigger>
                  <AccordionContent className="pt-2">
                     <div className="flex flex-wrap gap-3">
                        {['bg-green-500', 'bg-red-500', 'bg-yellow-500', 'bg-orange-500', 'bg-blue-400', 'bg-blue-600', 'bg-purple-600', 'bg-pink-500', 'bg-white border', 'bg-black'].map(color => (
                            <div key={color} className={`w-8 h-8 rounded-full ${color} cursor-pointer hover:ring-2 ring-primary ring-offset-2 transition-all`} />
                        ))}
                     </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="size">
                   <AccordionTrigger className="font-bold">Size</AccordionTrigger>
                   <AccordionContent className="pt-2">
                      <div className="flex flex-wrap gap-2">
                        {['XX-Small', 'X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large', '3X-Large', '4X-Large'].map(size => (
                            <Button key={size} variant="secondary" size="sm" className="rounded-full text-xs bg-[#F0F0F0] hover:bg-black hover:text-white border-none h-10 px-5">
                                {size}
                            </Button>
                        ))}
                      </div>
                   </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            <Button className="w-full rounded-full bg-black text-white h-12 mt-8">
                Apply Filter
            </Button>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
               <div>
                  <h1 className="text-2xl sm:text-3xl font-bold">{selectedCategory || 'All Products'}</h1>
                  <p className="text-muted-foreground text-sm mt-1">
                    Showing {filteredProducts.length} Products Sort by: 
                    <select 
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value)}
                        className="text-foreground font-bold cursor-pointer bg-transparent border-none appearance-none ml-1 focus:outline-none"
                    >
                        <option>Most Popular</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                    </select>
                  </p>
               </div>
               <Button variant="outline" size="icon" className="lg:hidden h-10 w-10 border-muted-foreground/20 rounded-full">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 7H4M20 12H4M20 17H4"/></svg>
               </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {loading ? (
                Array(6).fill(0).map((_, i) => (
                  <div key={i} className="flex flex-col gap-4 animate-pulse">
                    <div className="aspect-square rounded-[20px] bg-muted" />
                    <div className="h-4 w-3/4 bg-muted rounded" />
                    <div className="h-4 w-1/4 bg-muted rounded" />
                  </div>
                ))
              ) : (
                filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
