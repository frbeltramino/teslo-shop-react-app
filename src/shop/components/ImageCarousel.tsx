import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Product } from '@/interfaces/product.interface';
import { CustomFullScreenLoading } from "@/components/custom/CustomFullScreenLoading";

interface Props {
  product: Product;
}


export const ImageCarousel = ({ product }: Props) => {

  if (!product) {
    return <CustomFullScreenLoading />
  }
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalImages = product.images.length;

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative flex justify-center items-center">
      <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-md bg-white w-full max-w-lg">
        <img
          src={product.images[currentIndex]}
          alt={`${product.title} ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Flecha izquierda */}
      {totalImages > 1 && (
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
      )}

      {/* Flecha derecha */}
      {totalImages > 1 && (
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>
      )}
    </div>
  );
}

