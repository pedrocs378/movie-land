import { AppProps } from 'next/app'

import { Header } from '../components/Header'
import { SideMenu } from '../components/SideMenu'
import { Footer } from '../components/Footer'

import AppProvider from '../hooks'
import { GenreProps } from '../hooks/genres'

import { GridArea } from '../styles/pages/app'
import GlobalStyles from '../styles/global'

interface MyAppProps extends AppProps {
  genres: GenreProps[]
}

function MyApp({ Component, pageProps, genres }: MyAppProps) {

  return (
    <>
      <AppProvider genres={genres}>
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
