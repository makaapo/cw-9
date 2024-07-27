import Toolbar from './components/Toolbar/Toolbar';
import {Route, Routes} from 'react-router-dom';
import Categories from './containers/Categories/Categories';
import NewTransaction from './containers/NewTransaction/NewTransaction';
import EditTransaction from './containers/EditTransaction/EditTransaction';
import Home from './containers/Home/Home';

const App = () => (
  <>
    <header>
      <Toolbar/>
    </header>
    <main className="container-fluid mt-5">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/add-transaction" element={<NewTransaction/>}/>
        <Route path="/edit-transaction/:id" element={<EditTransaction/>}/>
        <Route path="/categories" element={<Categories/>}/>
        <Route path="*" element={(<h3 className="text-center">Not found</h3>)}/>
      </Routes>
    </main>
    </>
);

export default App
