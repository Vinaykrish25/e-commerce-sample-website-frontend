import { Star, StarHalf } from 'lucide-react';
import type { Product } from '@/types';
import { Badge } from './badge';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
        } else if (i === fullStars && hasHalfStar) {
            stars.push(<StarHalf key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
        } else {
            stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
        }
    }
    return stars;
  };

  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
        className="group cursor-pointer"
        onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="aspect-square rounded-[20px] bg-[#F0EEED] overflow-hidden mb-4 relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="h-full w-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
        />
        {product.discount && (
          <Badge className="absolute top-4 left-4 bg-red-500 text-white border-none rounded-full px-3 py-1 font-bold">
            -{product.discount}%
          </Badge>
        )}
      </div>
      <h3 className="font-bold text-lg sm:text-xl mb-1 line-clamp-1 group-hover:text-primary transition-colors">
        {product.name}
      </h3>
        <div className="flex items-center gap-2">
            <div className="flex">{renderStars(product.rating)}</div>
            <span className="text-sm text-muted-foreground">{product.rating}/5</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-bold text-xl sm:text-2xl">${product.price}</span>
          {product.originalPrice && (
            <span className="text-xl sm:text-2xl font-bold text-muted-foreground line-through">${product.originalPrice}</span>
          )}
          {product.discount && (
            <Badge variant="destructive" className="bg-[#FF33331A] text-[#FF3333] hover:bg-[#FF33331A] border-none rounded-full px-3 py-1 font-bold text-xs sm:text-sm">
              -{product.discount}%
            </Badge>
          )}
        </div>
    </motion.div>
  );
};

export default ProductCard;
