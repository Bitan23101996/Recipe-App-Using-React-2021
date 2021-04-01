import './App.css';
import DisplayRecipe from './components/DisplayRecipe';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <DisplayRecipe />
      <footer className="sticky-footer">
        <div className="container my-auto">
          <div className="copyright text-center my-auto">
            <span className="text-white">Copyright © By Bitan, 2021. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
