import { useQuery } from '@tanstack/react-query';

export function useBanners(activeOnly = true) {
    return useQuery({
        queryKey: ['banners', { activeOnly }],
        queryFn: async () => {
            const res = await fetch(`/api/banners${activeOnly ? '?active=true' : ''}`);
            if (!res.ok) throw new Error('Failed to fetch banners');
            return res.json();
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}
