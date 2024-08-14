
import { QueryClientProvider ,QueryClient} from '@tanstack/react-query'

const queryClient= new QueryClient({

})

const QueryProvider = ({children}:{children:React.ReactNode}) => {
  return (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
  )
}

export default QueryProvider