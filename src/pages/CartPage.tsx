import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCartStore } from '@/store/useCartStore';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const subtotal = getTotalPrice();
  const discount = subtotal > 0 ? subtotal * 0.2 : 0; // 20% mock discount
  const deliveryFee = subtotal > 0 ? 15 : 0;
  const total = subtotal - discount + deliveryFee;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container px-4 sm:px-8 py-8 sm:py-12 mx-auto">
        <nav className="flex gap-2 text-sm mb-8 text-muted-foreground">
            <Link to="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <span className="text-black">Cart</span>
        </nav>

        <h1 className="font-integralgf text-3xl sm:text-5xl font-black uppercase mb-10">Your Cart</h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-6">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center">
                <Trash2 className="w-12 h-12 text-muted-foreground" />
            </div>
            <p className="text-xl font-medium text-muted-foreground">Your cart is empty</p>
            <Link to="/category">
              <Button className="rounded-full bg-black text-white px-12 h-12 font-bold">Shop Now</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2 border rounded-[20px] p-6 space-y-6 h-fit bg-white shadow-sm">
              {items.map((item, index) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className={`flex gap-4 sm:gap-6 ${index !== items.length - 1 ? 'border-b pb-6' : ''}`}>
                  <div className="w-[100px] sm:w-[124px] aspect-square rounded-[12px] bg-[#F0EEED] overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="h-full w-full object-contain p-2" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg sm:text-xl mb-1">{item.name}</h3>
                        <p className="text-sm">Size: <span className="text-muted-foreground">{item.selectedSize}</span></p>
                        <p className="text-sm">Color: <span className="text-muted-foreground">{item.selectedColor}</span></p>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id, item.selectedSize, item.selectedColor)}
                        className="text-red-500 hover:scale-110 transition-transform p-1"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="font-bold text-xl sm:text-2xl">${item.price}</span>
                      <div className="bg-[#F0F0F0] rounded-full flex items-center h-10 px-4 gap-4">
                         <button onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, Math.max(1, item.quantity - 1))}>
                           <Minus className="w-4 h-4" />
                         </button>
                         <span className="font-bold text-sm min-w-[1ch] text-center">{item.quantity}</span>
                         <button onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}>
                           <Plus className="w-4 h-4" />
                         </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="border rounded-[20px] p-6 h-fit sticky top-24 bg-white shadow-sm">
              <h2 className="font-bold text-2xl mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="text-black font-bold">${subtotal}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Discount (-20%)</span>
                  <span className="text-red-500 font-bold">-${Math.round(discount)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery Fee</span>
                  <span className="text-black font-bold">${deliveryFee}</span>
                </div>
                <div className="pt-4 border-t flex justify-between">
                  <span className="text-lg">Total</span>
                  <span className="text-2xl font-bold">${Math.round(total)}</span>
                </div>
              </div>
              
              <div className="flex gap-2 mb-6">
                 <div className="flex-1 relative">
                    <input 
                       placeholder="Add promo code" 
                       className="w-full bg-[#F0F0F0] rounded-full h-12 pl-12 pr-4 text-sm focus:outline-none"
                    />
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                 </div>
                 <Button className="rounded-full bg-black text-white px-8 h-12 font-bold hover:bg-black/90 transition-all">Apply</Button>
              </div>

              <Button className="w-full rounded-full bg-black text-white h-14 font-bold flex items-center justify-center gap-2 group hover:gap-4 transition-all shadow-lg hover:shadow-xl">
                Go to Checkout
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
