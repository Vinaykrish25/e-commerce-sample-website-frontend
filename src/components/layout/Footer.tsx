import { Facebook, Twitter, Instagram, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-[#F0F0F0] pt-16 pb-12">
      <div className="container px-4 sm:px-8 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <h2 className="font-integralgf text-3xl font-bold mb-6">SHOP.CO</h2>
            <p className="text-muted-foreground text-sm max-w-sm mb-6 leading-relaxed">
              We have clothes that suits your style and which you’re proud to wear. From women to men.
            </p>
            <div className="flex gap-4">
              <Button variant="outline" size="icon" className="rounded-full bg-white border-none shadow-sm h-10 w-10">
                <Twitter className="h-4 w-4 fill-current" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full bg-black text-white h-10 w-10 hover:bg-black/80">
                <Facebook className="h-4 w-4 fill-current" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full bg-white border-none shadow-sm h-10 w-10">
                <Instagram className="h-4 w-4" />
              </Button>
               <Button variant="outline" size="icon" className="rounded-full bg-white border-none shadow-sm h-10 w-10">
                <Github className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest mb-6">Company</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm">About</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm">Features</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm">Works</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm">Career</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest mb-6">Help</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm">Customer Support</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm">Delivery Details</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm">Terms & Conditions</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest mb-6">FAQ</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm">Account</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm">Manage Deliveries</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm">Orders</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm">Payments</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-muted-foreground text-xs">
            Shop.co © 2000-2023, All Rights Reserved
          </p>
          <div className="flex gap-4 items-center">
            {/* Payment icons would go here */}
            <div className="h-6 w-10 bg-white rounded border flex items-center justify-center text-[8px] font-bold">VISA</div>
            <div className="h-6 w-10 bg-white rounded border flex items-center justify-center text-[8px] font-bold">MCard</div>
            <div className="h-6 w-10 bg-white rounded border flex items-center justify-center text-[8px] font-bold">PayPal</div>
            <div className="h-6 w-10 bg-white rounded border flex items-center justify-center text-[8px] font-bold">APay</div>
            <div className="h-6 w-10 bg-white rounded border flex items-center justify-center text-[8px] font-bold">GPay</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
