import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import store from './redux/store.ts';

const root = document.getElementById('root') as HTMLElement

ReactDOM.createRoot(root).render(
    <CookiesProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </CookiesProvider>
)


