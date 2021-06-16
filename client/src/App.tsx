import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Switch>
          <Route exact path='/'></Route>
          <Route exact path='/roasters'></Route>
          <Route exact path='/wars'></Route>
        </Switch>
      </Router>
    </ChakraProvider>
  )
}

export default App
