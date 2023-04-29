import React from 'react'
import styles from "./styles/Opening.module.css"
const Opening = () => {
  return (
    <div className={`${styles.fadeIn}`+" "}>
      <div className={`${styles.container}`+"  "}>
        <h1 className={`${styles.typing}`+"  mx-20 text-4xl font-bold"}>
            Vote Maker.
        </h1>
      </div>
        
    </div>
  )
}

export default Opening