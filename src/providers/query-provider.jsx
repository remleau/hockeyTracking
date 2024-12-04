import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient({
    defaultOptions:{
        queries:{
            retry: 2,
            refetchOnWindowFocus: false
        }
    }
})

export const QueryProvider = ({ children }) => (
    <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools />
    </QueryClientProvider>
)