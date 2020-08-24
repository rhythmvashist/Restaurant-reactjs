import * as ActionTypes from './ActionTypes'
import {DISHES} from '../shared/dishes'

export const addComment = (dishId,rating,author,comment)=>({
    type: ActionTypes.ADD_COMMENT,
    payload:{
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
})

//fetch dish is  a thunk as it is returing a innner function
export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));
    setTimeout(()=>{
        dispatch(addDishes(DISHES));
    },2000)
}


export const dishesLoading = () =>({
    type:ActionTypes.DISHES_LOADING
});

export const dishesFailed =(errmsg) =>({
    type: ActionTypes.DISHES_FAILED,
    payload:errmsg,

})

export const addDishes = (dishes) =>({
    type:ActionTypes.ADD_DISHES,
    payload:dishes
})