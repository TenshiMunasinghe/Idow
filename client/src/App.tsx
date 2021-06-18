import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/home'

const client = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={client}>
      <ChakraProvider>
        <Router>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path='/roaster'></Route>
          </Switch>
        </Router>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default App
