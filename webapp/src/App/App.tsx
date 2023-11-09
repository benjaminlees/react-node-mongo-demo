import './App.css'
import Form from '../Form/Form';
import UrlList from '../UrlList/UrlList';

function App() {
  return (
    <>
      <div className='main-container'>
        <div>
          <h1>URL shortener ☺</h1>
          <Form />
        </div>
        <UrlList />
      </div>

    </>
  )
}

export default App
