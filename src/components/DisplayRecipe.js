import React, { useState, useEffect } from 'react'
import axios from 'axios'
import NoRecordFound from './NoRecordFound';
import Loading from './Loading';

const APP_ID = "ea8a8398";
const APP_KEY = "b50ddcd57b6991da2eb8514dbf0e51af";
const baseUrl = "https://api.edamam.com/search"
// const baseUrl = "https://api.edamam.com/search?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}";

function DisplayRecipe() {

    //state declare
    const [recipeLists, setRecipeLists] = useState([])
    const [searchQuery, setSearchQuery] = useState('chicken')
    const [searchParam, setSearchParam] = useState(searchQuery)

    useEffect(() => {
        getRecipeList();
    }, [searchParam])

    //API call to fetch recipe list
    const getRecipeList = () => {
        axios
            .get(`${baseUrl}?q=${searchParam}&app_id=${APP_ID}&app_key=${APP_KEY}`)
            .then(res => {
                console.log(res.data.hits)
                setRecipeLists(res.data.hits)
                setSearchQuery('')
            })
            .catch(err => {
                console.log(err)
            })
    }

    //Input onchange call
    const searchInputHandler = (e) => {
        setSearchQuery(e.target.value)
    }

    //Form Submit
    const searchRecipeList = (event) => {
        event.preventDefault();
        setSearchParam(searchQuery);
    }

    //JSX return 
    return (
        <React.Fragment>
            <div className="container pb-3">

                <h3 className="app-title text-center">
                    Recipe Search
                </h3>
                <p className="text-center app-title-desc  font-italic mb-0">[Over 2.3+ million nutritionally analyzed recipes]</p>

                <div className="card">
                    {/* --------Card-header ----------*/}
                    <div className="card-header">
                        <form onSubmit={searchRecipeList}>
                            <div className="row">
                                <div className="col-xl-10 col-lg-10 col-md-10 col-sm-10">
                                    <input className="form-control" placeholder="Search by any recipe name..." type="text" value={searchQuery} onChange={searchInputHandler} />
                                </div>
                                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 text-center">
                                    <button type="submit" className="btn btn-primary custom-buttom " >Search</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    {/* -------END Card-header ---------*/}

                    {/* --------------Card-body---------- */}
                    <div className="card-body recipe-container">
                        <div className="row">
                            {
                                recipeLists.length > 0 ?
                                    (searchParam !== '' ? (recipeLists.map(recipeList => (
                                        <div className="col-xl-12 col-lg-12 col-sm-12 col-md-12 mb-2" key={recipeList.recipe.label}>
                                            <div className="card recipe-card">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="d-sm-block d-md-none col-lg-4 col-xl-4 col-md-4 col-sm-12 text-center">
                                                            <img className="recipe-img img-fluid img-sm-shadow" src={recipeList.recipe.image} alt="" />
                                                        </div>
                                                        <div className="col-lg-8 col-xl-8 col-md-8 col-sm-12 mt-2">
                                                            <label className="label-text">Recipe Name:</label>
                                                            <span className="label-val ml-2">{recipeList.recipe.label}</span>
                                                            <p className="mb-0">
                                                                <label className="label-text">Calories:</label>
                                                                <span className="label-val ml-2">{recipeList.recipe.calories.toFixed(3)}</span>

                                                            </p>
                                                            <p className="mb-0">
                                                                <label className="label-text">Cuisine Type:</label>
                                                                {recipeList.recipe.cuisineType === undefined ? <span className="label-val ml-2">N/A</span> : <span className="label-val ml-2 badge-pill badge badge-danger">{recipeList.recipe.cuisineType[0]}</span>}

                                                            </p>
                                                            <p className="mb-0">
                                                                <label className="label-text">Meal Type:</label>
                                                                {recipeList.recipe.mealType === undefined ? <span className="label-val ml-2">N/A</span> : <span className="label-val ml-2 badge badge-pill badge-primary">{recipeList.recipe.mealType[0]}</span>}

                                                            </p>
                                                            <p className="mb-0">
                                                                <label className="label-text">Dish Type:</label>
                                                                {recipeList.recipe.dishType === undefined ? <span className="label-val ml-2">N/A</span> : <span className="label-val ml-2 badge-pill badge badge-warning">{recipeList.recipe.dishType[0]}</span>}

                                                            </p>

                                                            <label className="label-text">Things required to make:</label>
                                                            <ol className="label-val ml-2">
                                                                {
                                                                    recipeList.recipe.ingredients.map((ingredient, i) => (
                                                                        <li key={i}>{ingredient.text}</li>
                                                                    ))
                                                                }
                                                            </ol>
                                                        </div>
                                                        <div className="d-none d-md-block col-lg-4 col-xl-4 col-md-4 col-sm-12 text-center">
                                                            <img className="recipe-img img-fluid img-lg-shadow" src={recipeList.recipe.image} alt="" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))) : <NoRecordFound />)
                                    : <Loading />

                            }
                        </div>
                    </div>
                    {/* --------------END Card-body---------- */}
                </div>
            </div>
        </React.Fragment>
    )
}

export default DisplayRecipe
