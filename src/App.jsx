import React from 'react'
import Todo from './components/Todo'
import Footer from './components/Footer'

function App() {
  return (
    <div className='bg-stone-600 grid py-4 min-h-screen'> 
      <Todo/>
      <Footer/>
    </div>
  )
}

export default App