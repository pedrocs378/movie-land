import React from 'react';
import { BrowserRouter } from 'react-router-dom'

import SideMenu from './components/SideMenu';
import Header from './components/Header';

import Router from './routes'

import { GridArea } from './styles/app';
import GlobalStyles from './styles/global'

const App: React.FC = () => {
  return (
    <>
		<GridArea>
			<SideMenu />
			<Header />
			<BrowserRouter>
				<Router />
			</BrowserRouter>
		</GridArea>

		<GlobalStyles />
    </>
  );
}

export default App;
