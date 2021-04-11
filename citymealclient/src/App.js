import React from 'react';
import './App.css';
import Nav from './Component/Navbar/Navbar'
import Footer from './Component/Footer/footer'
import Announce from './Component/Others/announce'
import List from './Component/ListPage/List'

function App() {

  const [screenSize, setScreenSize] = React.useState(360)

  const updateNav = () => {
    setScreenSize(1024)
    console.log('clicking button')
  }

  return (
    <div className="App">
      <header className="App-header"></header>
      <h1>Hello World</h1>
      <button onClick={updateNav}>Click to update nav</button>
      <Nav size={screenSize} />
      <Announce />
      <List />
      <Footer />
    </div>
  );
}

export default App;
