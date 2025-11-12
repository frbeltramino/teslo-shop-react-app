
import { Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navigate, useParams } from 'react-router';
import { useProduct } from '@/admin/hooks/useProduct';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import { ImageCarousel } from '@/shop/components/ImageCarousel';


export const ProductPage = () => {

  //Buscás el producto correspondiente
  const { id } = useParams();
  const { isLoading, isError, data: product } = useProduct(id || '');

  if (isError) {
    return <Navigate to='/admin/products' />
  }

  if (isLoading) {
    return <CustomFullScreenLoading />
  }

  if (!product) {
    return <Navigate to='/admin/products' />
  }

  return (

    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Imagen del producto */}

        <ImageCarousel product={product} />

        {/* Información del producto */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {product.title}
            </h1>
            <p className="text-slate-600 mt-2">{product.description}</p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-2xl font-semibold text-blue-600">
              ${product.price}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${product.stock > 5
                ? 'bg-green-100 text-green-800'
                : product.stock > 0
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
                }`}
            >
              {product.stock > 5
                ? 'En stock'
                : product.stock > 0
                  ? 'Bajo stock'
                  : 'Sin stock'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-slate-500" />
            <span className="text-slate-700 font-medium">
              Categoría: {product.gender}
            </span>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-800 mb-2">
              Talles disponibles
            </h2>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <span
                  key={size}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 bg-slate-50"
                >
                  {size}
                </span>
              ))}
            </div>
          </div>

          <Button size="lg" className="mt-6">
            Agregar al carrito
          </Button>
        </div>
      </div>
    </div>
  );
};