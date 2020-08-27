import * as ActionTypes from './ActionTypes'
import {DISHES} from '../shared/dishes'
import {baseUrl } from '..//shared/baseUrl'

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
    return fetch(baseUrl+'dishes')
            .then(res => res.json())
            .then(dishes => dispatch(addDishes(dishes)));
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


export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl+'comments')
            .then(res => res.json())
            .then(comments => dispatch(addComments(comments)));
}

export const commentFailed =(errmsg) =>({
    type: ActionTypes.COMMENTS_FAILED,
    payload:errmsg,

})

export const addComments = (comments) =>({
    type:ActionTypes.ADD_COMMENTS,
    payload:comments
})



export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true));
    return fetch(baseUrl+'promotions')
            .then(res => res.json())
            .then(promos => dispatch(addPromos(promos)));
}


export const promosLoading = () =>({
    type:ActionTypes.PROMOS_LOADING
});

export const promosFailed =(errmsg) =>({
    type: ActionTypes.PROMOS_FAILED,
    payload:errmsg,

})

export const addPromos = (promos) =>({
    type:ActionTypes.ADD_PROMOS,
    payload:promos
})

