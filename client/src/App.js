import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Auth from './views/Auth';
import AuthContextProvider from './contexts/AuthContext';
import Dashboard from './views/Dashboard';
import ProtectedRoute from './components/routing/ProtectedRoute';
import About from './views/About';
import Article from './views/Article';
import PostContextProvider from './contexts/PostContext';
import ArticleContextProvider from './contexts/ArticleContext';

function App() {
	return (
		<AuthContextProvider>
			<PostContextProvider>
        <ArticleContextProvider>
          <Router>
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route
                exact
                path='/login'
                render={props => <Auth {...props} authRoute='login' />}
              />
              <Route
                exact
                path='/register'
                render={props => <Auth {...props} authRoute='register' />}
              />
              <ProtectedRoute exact path='/dashboard' component={Dashboard} />
              <ProtectedRoute exact path='/about' component={About} />
              <ProtectedRoute exact path='/article' component={Article} />
            </Switch>
          </Router>
        </ArticleContextProvider>
			</PostContextProvider>
		</AuthContextProvider>
	)
}

export default App
