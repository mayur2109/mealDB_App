import React from 'react'

import './Card.scss'

const MealCard = ({key,image,name}) => {
  return (
    <div className="card" key={key}>
        <img src={image} alt={name} />
        <h4>{name}</h4>
    </div>
  )
}

export default MealCard