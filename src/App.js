import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter,
  Routes,
  Route 
} from 'react-router-dom';

import Homepage from './pages/Homepage';
import Navbar from './features/components/Navbar'

import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './features/PrimaryStyles.js'

const App = ({theme}) => (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <GlobalStyle />
        <Navbar />
        <Routes>
            <Route path = '/' exact element={< Homepage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
);

const mapStateToProps = state => ({
  theme: state.theme,
});
const dispatchStateToProps = dispatch => ({});

export default connect(mapStateToProps, dispatchStateToProps)(App);