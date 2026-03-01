import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-[#F2F0F1] relative overflow-hidden">
      <div className="container px-4 sm:px-8 mx-auto flex flex-col lg:flex-row items-center pt-8 lg:pt-0">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:w-1/2 z-10 py-12 lg:py-24"
        >
          <h1 className="font-integralgf text-4xl sm:text-6xl font-black leading-[1.1] mb-8 lg:mb-10 text-left">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-lg mb-8 lg:mb-12 leading-relaxed">
            Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
          </p>
          <Link to="/category">
            <Button size="lg" className="rounded-full px-12 h-14 text-base font-bold w-full sm:w-auto bg-black hover:bg-black/90 mb-12">
              Shop Now
            </Button>
          </Link>

          <div className="flex flex-wrap gap-8 sm:gap-12 mt-4">
            <div className="flex flex-col">
              <span className="text-2xl sm:text-4xl font-bold">200+</span>
              <span className="text-muted-foreground text-xs sm:text-sm">International Brands</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl sm:text-4xl font-bold">2,000+</span>
              <span className="text-muted-foreground text-xs sm:text-sm">High-Quality Products</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl sm:text-4xl font-bold">30,000+</span>
              <span className="text-muted-foreground text-xs sm:text-sm">Happy Customers</span>
            </div>
          </div>
        </motion.div>

        <div className="lg:w-1/2 relative min-h-[448px] sm:min-h-[600px] w-full mt-8 lg:mt-0">
          <img 
            src="/assets/banner_image.png" 
            alt="Fashion Models" 
            className="absolute bottom-0 right-0 w-full h-full object-contain object-bottom"
          />
          {/* Decorative stars */}
          <div className="absolute top-1/4 right-0">
             <svg width="104" height="104" viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M52 0L56.5 43.5L104 52L56.5 60.5L52 104L47.5 60.5L0 52L47.5 43.5L52 0Z" fill="black"/>
             </svg>
          </div>
           <div className="absolute top-1/2 left-0 sm:left-10">
             <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M28 0L30.4231 23.4231L56 25.8462L30.4231 28.2692L28 51.6923L25.5769 28.2692L0 25.8462L25.5769 23.4231L28 0Z" fill="black"/>
             </svg>
          </div>
        </div>
      </div>
      
      {/* Brands Bar */}
      <div className="bg-black py-8 sm:py-10">
        <div className="container px-4 sm:px-8 mx-auto">
          <div className="flex flex-wrap justify-between items-center gap-8 opacity-40 invert grayscale">
            <img src="/assets/Versace.png" alt="Versace" className="h-6 sm:h-8" />
            <img src="/assets/Zara.png" alt="Zara" className="h-6 sm:h-8" />
            <img src="/assets/Gucci.png" alt="Gucci" className="h-6 sm:h-8" />
            <img src="/assets/Prada.png" alt="Prada" className="h-6 sm:h-8" />
            <img src="/assets/Calvin_Klein.png" alt="Calvin Klein" className="h-6 sm:h-8" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
