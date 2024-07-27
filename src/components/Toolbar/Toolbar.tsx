import {NavLink} from 'react-router-dom';

const Toolbar = () => {

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">

      <div className="container-fluid">
        <NavLink to='/' className="navbar-brand d-flex fs-5">
          Finance Tracker
        </NavLink>
        <ul className="navbar-nav mr-auto flex-row gap-2 flex-nowrap">
          <li className="nav-item">
            <NavLink to="/categories" className="nav-link">Categories</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/add-transaction" className="nav-link">Add</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Toolbar;