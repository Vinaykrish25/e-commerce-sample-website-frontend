import { Search, ShoppingCart, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { useCartStore } from '@/store/useCartStore';

const Header = () => {
  const itemCount = useCartStore(state => state.getItemCount());

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-8 mx-auto">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="sm:hidden">
            <Menu className="h-6 w-6" />
          </Button>
          <Link to="/" className="font-integralgf text-2xl font-bold tracking-tighter sm:text-3xl">
            SHOP.CO
          </Link>
          <nav className="hidden items-center gap-6 sm:flex ml-4">
            <Link to="/category" className="text-sm font-medium transition-colors hover:text-primary">Shop</Link>
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">On Sale</a>
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">New Arrivals</a>
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">Brands</a>
          </nav>
        </div>

        <div className="flex items-center gap-4 flex-1 justify-end max-w-md ml-4 sm:ml-8">
          <div className="relative w-full hidden sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search for products..." 
              className="w-full bg-muted/50 pl-10 h-10 rounded-full border-none"
            />
          </div>
          <div className="flex items-center gap-2">
             <Button variant="ghost" size="icon" className="sm:hidden">
              <Search className="h-5 w-5" />
            </Button>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
