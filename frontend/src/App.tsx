import { useState } from 'react'
import RecipeCard from "./components/RecipeCard"
import styles from './App.module.css'; 
import { Link } from 'react-router'



function App() {

  return (
    <>


      
      <div className={styles.header}>

        


        <h1>Welcome to GlobalEats!</h1>
        <h2>Discover recipes from around the world based on what you have in your fridge!</h2>





      </div>


      <div className={styles.container}>

        <Link to="/form">
          <button className={styles.GetStartedButton}>Get Started!</button>
        </Link>
        

      


      </div>
      
    </>
  )
}

export default App
