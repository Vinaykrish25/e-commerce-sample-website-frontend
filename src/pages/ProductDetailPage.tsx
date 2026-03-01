import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ui/ProductCard';
import type { Product, Review } from '@/types';
import { api } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Star, StarHalf, Check, Plus, Minus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCartStore } from '@/store/useCartStore';
import { useParams } from 'react-router-dom';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  
  const addItem = useCartStore(state => state.addItem);

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity, selectedSize, selectedColor);
      alert('Added to cart!');
    }
  };

  useEffect(() => {
    const loadProductData = async () => {
      if (!id) return;
      try {
        const products = await api.getProducts();
        const mainProduct = products.find((p: Product) => p.id === id);
        if (!mainProduct) return;

        setProduct(mainProduct);
        setSelectedColor(mainProduct.colors[0]);
        setSelectedSize(mainProduct.sizes[0]);
        
        const reviewsData = await api.getReviewsByProduct(mainProduct.id);
        setReviews(reviewsData);
        
        setRelatedProducts(products.filter((p: Product) => p.id !== id).slice(0, 4));
      } catch (error) {
        console.error('Failed to load product details:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProductData();
  }, [id]);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars.push(<Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />);
        } else if (i === fullStars && hasHalfStar) {
            stars.push(<StarHalf key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />);
        } else {
            stars.push(<Star key={i} className="w-5 h-5 text-gray-300" />);
        }
    }
    return stars;
  };

  if (loading || !product) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container px-4 sm:px-8 py-8 sm:py-12 mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 mb-16">
          {/* Images Section */}
          <div className="lg:w-1/2 flex flex-col-reverse sm:flex-row gap-4">
            <div className="flex sm:flex-col gap-4 overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0">
               {[1, 2, 3].map((_, i) => (
                  <div key={i} className="min-w-[110px] w-[110px] sm:w-[152px] aspect-square rounded-[20px] bg-[#F0EEED] overflow-hidden cursor-pointer border-2 border-transparent hover:border-black transition-all">
                     <img src={product.image} alt={product.name} className="h-full w-full object-contain" />
                  </div>
               ))}
            </div>
            <div className="flex-1 aspect-square rounded-[20px] bg-[#F0EEED] overflow-hidden">
                <img src={product.image} alt={product.name} className="h-full w-full object-contain p-4" />
            </div>
          </div>

          {/* Info Section */}
          <div className="lg:w-1/2 flex flex-col gap-6">
            <div>
              <h1 className="font-integralgf text-3xl sm:text-5xl font-black uppercase mb-4 leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">{renderStars(product.rating)}</div>
                <span className="text-sm font-medium">{product.rating}/5</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-3xl sm:text-4xl font-satoshi">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-3xl sm:text-4xl font-bold text-muted-foreground/30 line-through">${product.originalPrice}</span>
                    <Badge variant="destructive" className="bg-[#FF33331A] text-[#FF3333] hover:bg-[#FF33331A] border-none rounded-full px-4 py-1.5 font-bold text-sm">
                      -{product.discount}%
                    </Badge>
                  </>
                )}
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            <div className="py-6 border-y flex flex-col gap-6">
              {/* Colors */}
              <div>
                <h3 className="text-muted-foreground mb-4">Select Colors</h3>
                <div className="flex gap-4">
                  {product.colors.map((color, i) => (
                    <div 
                      key={i} 
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full cursor-pointer border-2 ${selectedColor === color ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-transparent'} flex items-center justify-center transition-all`}
                    >
                      <div className="w-full h-full rounded-full border border-gray-200" style={{ backgroundColor: color.toLowerCase() }} />
                      {selectedColor === color && <Check className="w-5 h-5 text-white mix-blend-difference absolute" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h3 className="text-muted-foreground mb-4">Choose Size</h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <Button 
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      variant={selectedSize === size ? 'default' : 'secondary'}
                      className={`rounded-full px-8 h-12 text-base font-medium ${selectedSize === size ? 'bg-black text-white hover:bg-black/90' : 'bg-[#F0F0F0] text-muted-foreground hover:bg-[#F0F0F0]/80'}`}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <div className="bg-[#F0F0F0] rounded-full flex items-center h-14 px-6 gap-6">
                 <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="hover:scale-110 transition-transform">
                   <Minus className="w-5 h-5" />
                 </button>
                 <span className="font-bold text-lg min-w-[1ch] text-center">{quantity}</span>
                 <button onClick={() => setQuantity(q => q + 1)} className="hover:scale-110 transition-transform">
                   <Plus className="w-5 h-5" />
                 </button>
              </div>
              <Button 
                onClick={handleAddToCart}
                className="flex-1 rounded-full h-14 bg-black text-white text-base font-bold shadow-lg hover:shadow-xl hover:bg-black/90 transition-all"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <section className="mb-24">
          <Tabs defaultValue="reviews" className="w-full">
            <TabsList className="w-full justify-between bg-transparent border-b rounded-none h-14 p-0">
               <TabsTrigger value="details" className="flex-1 font-medium text-lg text-muted-foreground data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none bg-transparent">Product Details</TabsTrigger>
               <TabsTrigger value="reviews" className="flex-1 font-medium text-lg text-muted-foreground data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none bg-transparent">Rating & Reviews</TabsTrigger>
               <TabsTrigger value="faqs" className="flex-1 font-medium text-lg text-muted-foreground data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none bg-transparent">FAQs</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="pt-8">
               <div className="prose max-w-none">
                  <p>Detailed product information goes here...</p>
               </div>
            </TabsContent>
            <TabsContent value="reviews" className="pt-8">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="font-bold text-xl sm:text-2xl">All Reviews <span className="text-muted-foreground text-sm font-normal">({reviews.length})</span></h3>
                  <div className="flex gap-4">
                    <Button variant="outline" className="rounded-full h-12 px-6 hidden sm:flex">Latest</Button>
                    <Button className="rounded-full bg-black text-white h-12 px-10 font-bold shadow-md">Write a Review</Button>
                  </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reviews.map(review => (
                    <div key={review.id} className="border rounded-[20px] p-8 flex flex-col gap-4 bg-white shadow-sm hover:shadow-md transition-all">
                       <div className="flex justify-between items-start">
                          <div className="flex">{renderStars(review.rating)}</div>
                          <button className="text-muted-foreground hover:text-black">
                             <Plus className="w-5 h-5 rotate-45" />
                          </button>
                       </div>
                       <div className="flex items-center gap-1.5">
                          <span className="font-bold text-lg sm:text-xl">{review.userName}</span>
                          <div className="bg-green-500 rounded-full p-0.5"><Check className="w-3 h-3 text-white" /></div>
                       </div>
                       <p className="text-muted-foreground line-clamp-3">"{review.comment}"</p>
                       <span className="text-sm font-medium text-muted-foreground mt-2">Posted on {review.date}</span>
                    </div>
                  ))}
               </div>
               <div className="flex justify-center mt-12">
                  <Button variant="outline" className="rounded-full px-12 h-12 border-muted-foreground/20 font-bold">Load More Reviews</Button>
               </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Related Products */}
        <section className="py-8">
           <h2 className="font-integralgf text-3xl sm:text-5xl font-black text-center mb-12 sm:mb-16 uppercase">
            You might also like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
