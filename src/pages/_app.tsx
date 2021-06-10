import { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'

import { Header } from '../components/Header'
import { SideMenu } from '../components/SideMenu'
import { Footer } from '../components/Footer'

import { AppProvider } from '../hooks'

import { GridArea } from '../styles/pages/app'
import GlobalStyles from '../styles/global'

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <GridArea>
          <SideMenu />
          <Header />

          <Component {...pageProps} />

          <Footer />

        </GridArea>
      </AppProvider>

      <GlobalStyles />
    </QueryClientProvider>
  )
}

export default MyApp
