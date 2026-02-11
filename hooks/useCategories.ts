import { useQuery } from '@tanstack/react-query';
import { Category } from '@/types';

export function useCategories() {
    return useQuery<Category[]>({
        queryKey: ['categories'],
        queryFn: async () => {
            const response = await fetch('/api/categories');
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            return response.json();
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}
