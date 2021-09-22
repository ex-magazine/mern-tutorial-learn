
export const apiUrl =
	process.env.NODE_ENV !== 'production'
		? 'http://localhost:5000/api'
		: 'https://pacific-sierra-23116.herokuapp.com/api'
/*  
export const apiUrl =
    process.env.NODE_ENV !== 'production'
      ? 'https://pacific-sierra-23116.herokuapp.com/api'
      : 'https://pacific-sierra-23116.herokuapp.com/api'
*/
export const LOCAL_STORAGE_TOKEN_NAME = 'learnit-mern'

export const POSTS_LOADED_SUCCESS = 'POSTS_LOADED_SUCCESS'
export const POSTS_LOADED_FAIL = 'POSTS_LOADED_FAIL'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const FIND_POST = 'FIND_POST'



export const ARTICLES_LOADED_SUCCESS = 'ARTICLES_LOADED_SUCCESS'
export const ARTICLES_LOADED_FAIL = 'ARTICLES_LOADED_FAIL'
export const ADD_ARTICLE = 'ADD_ARTICLE'
export const DELETE_ARTICLE = 'DELETE_ARTICLE'
export const UPDATE_ARTICLE = 'UPDATE_ARTICLE'
export const FIND_ARTICLE = 'FIND_ARTICLE'
