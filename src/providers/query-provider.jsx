import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

export const QueryProvider = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
