import {QueryClient} from '@tanstack/react-query';

/**
 * API 요청에 대한 응답을 react-query로 받아서 캐싱해주는 객체
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
