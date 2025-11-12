import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getProductByIdAction } from "../actions/get-product-by-id"
import type { Product } from "@/interfaces/product.interface"
import { creteUpdateProductAction } from "../actions/create-update-product.action"

export const useProduct = (id: string) => {

  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['product', { id }],
    queryFn: () => getProductByIdAction(id),
    retry: false,
    staleTime: 1000 * 60 * 5
  })

  const mutation = useMutation({
    mutationFn: creteUpdateProductAction,
    onSuccess: (product: Product) => {

      // invalidar cache
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', { id: product.id }] });

      // actualizar queryData
      queryClient.setQueryData(['products', { id: product.id }], product);

    },
    onError: () => {

    }
  });

  return {
    ...query,
    mutation
  }
}
