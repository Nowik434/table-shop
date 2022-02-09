import './App.css';
import Main from './components/Main';
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import rootReducer from './redux/reducer';
import thunk from 'redux-thunk';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ededed',
    },
    secondary: {
      main: '#eaeaea',
    },
  },
});

function App() {
  const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk),
  ));

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Main store={store} />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
