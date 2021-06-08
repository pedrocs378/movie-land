import { AppProps } from 'next/app'

import { Header } from '../components/Header'
import { SideMenu } from '../components/SideMenu'
import { Footer } from '../components/Footer'

import AppProvider from '../hooks'

import { GridArea } from '../styles/app'
import GlobalStyles from '../styles/global'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AppProvider>
        <GridArea>
          <SideMenu />
          <Header />
          <Component {...pageProps} />
          <Footer />
        </GridArea>
      </AppProvider>

      <GlobalStyles />
    </>
  )
}

export default MyApp
