import ReactDOM from 'react-dom/client'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-loading-skeleton/dist/skeleton.css'
import { App } from './app/App.tsx'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import { SkeletonTheme } from 'react-loading-skeleton'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <App />
    </SkeletonTheme>
  </Provider>
)
