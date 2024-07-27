import Toolbar from './components/Toolbar/Toolbar';
import {Route, Routes} from 'react-router-dom';
import Categories from './containers/Categories/Categories';

const App = () => (
  <>
    <header>
      <Toolbar/>
    </header>
    <main className="container-fluid mt-5">
      <Routes>
        <Route path="/" element={<h4>home</h4>}/>
        <Route path="/add-transaction" element={<h2>add</h2>}/>
        <Route path="/categories" element={<Categories/>}/>
        <Route path="*" element={(<h3 className="text-center">Not found</h3>)}/>
      </Routes>
    </main>
    </>
);

export default App
