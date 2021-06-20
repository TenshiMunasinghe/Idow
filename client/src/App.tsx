import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/home'
import Roaster from './pages/roaster'

const client = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={client}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/roaster/:id'>
            <Roaster />
          </Route>
        </Switch>
      </Router>
    </QueryClientProvider>
  )
}

export default App
