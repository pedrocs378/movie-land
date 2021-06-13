import { AppProps } from 'next/app'
import { Provider as NextAuthProvider } from 'next-auth/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { Header } from '../components/Header'
import { SideMenu } from '../components/SideMenu'
import { Development } from '../components/Development';
import { Footer } from '../components/Footer'

import { AppProvider } from '../contexts'

import { GridArea } from '../styles/pages/app'
import GlobalStyles from '../styles/global'

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()

  if (process.env.NEXT_PUBLIC_IS_DEVELOPING === 'true') {
    return (
      <>
        <Development />
        <Footer />
        <GlobalStyles />
      </>
    )
  }

  return (
    <NextAuthProvider>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <ToastContainer />

          <GridArea>
            <SideMenu />
            <Header />

            <Component {...pageProps} />

            <Footer />
          </GridArea>
        </AppProvider>

        <GlobalStyles />
      </QueryClientProvider>
    </NextAuthProvider>
  )
}

export default MyApp
