import React,{useEffect,useContext} from 'react'
import './Categories.scss'
import { myContext } from '../../context/context'

const Categories = () => {
  const {fetchCategories,categories} = useContext(myContext)

  useEffect(() => {
    fetchCategories()
  },[fetchCategories])
  console.log(categories)
  return (
    <div className="categories">
      {categories.map((category) => {
        return (
          <div className="categories-item" key={category.idCategory}>
            <div className="categories-item-image">
              <img src={category.strCategoryThumb} alt={category.strCategory} />
            </div>
            <div className="categories-item-name">
              {category.strCategory}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Categories