import React from 'react';
import { BrowserRouter } from 'react-router-dom'

import SideMenu from './components/SideMenu';
import Header from './components/Header';
import Footer from './components/Footer';

import Router from './routes'

import { GridArea } from './styles/app';
import GlobalStyles from './styles/global'

const App: React.FC = () => {
  return (
	<BrowserRouter>
		<GridArea>
			<SideMenu />
			<Header />

			<Router />

			<Footer />
		</GridArea>

		<GlobalStyles />
	</BrowserRouter>
  );
}

export default App;
