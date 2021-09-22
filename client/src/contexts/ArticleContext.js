import { createContext, useReducer, useState } from 'react';
import { articleReducer } from '../reducers/articleReducer';
import {
	apiUrl,
	ARTICLES_LOADED_FAIL,
	ARTICLES_LOADED_SUCCESS,
	ADD_ARTICLE,
	DELETE_ARTICLE,
	UPDATE_ARTICLE,
	FIND_ARTICLE
} from './constants'
import axios from 'axios'

export const ArticleContext = createContext();

const ArticleContextProvider = ({ children }) => {

  //state
  const [articleState, dispatch] = useReducer(articleReducer, {
    article: null,
    articles: [],
    articlesLoading: true
  });

  const [showAddArticleModal, setShowAddArticleModal] = useState(false);
  const [showUpdateArticleModal, setShowUpdateArticleModal] = useState(false);


  const [showToast, setShowToast] = useState({
		show: false,
		message: '',
		type: null
	})

  //Get all Article
  const getArticles = async() => {
    try {
			const response = await axios.get(`${apiUrl}/articles`)
			if (response.data.success) {
				dispatch({ type: ARTICLES_LOADED_SUCCESS, payload: response.data.articles })
			}
		} catch (error) {
			dispatch({ type: ARTICLES_LOADED_FAIL })
		}
  }


  // Add Article
	const addArticle = async newArticle => {
		try {
			const response = await axios.post(`${apiUrl}/articles`, newArticle)
			if (response.data.success) {
				dispatch({ type: ADD_ARTICLE, payload: response.data.article })
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

  //Delete Article
  const deleteArticle = async postId => {
		try {
			const response = await axios.delete(`${apiUrl}/articles/${postId}`)
			if (response.data.success)
				dispatch({ type: DELETE_ARTICLE, payload: postId })
		} catch (error) {
			console.log(error)
		}
	}

  // Find post when user is updating post
	const findArticle = postId => {
		const article = articleState.articles.find(article => article._id === postId)
		dispatch({ type: FIND_ARTICLE, payload: article })
	}

	// Update post
	const updateArticle = async updatedArticle => {
		try {
			const response = await axios.put(
				`${apiUrl}/articles/${updatedArticle._id}`,
				updatedArticle
			)
			if (response.data.success) {
				dispatch({ type: UPDATE_ARTICLE, payload: response.data.article })
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

  //Article context Data
  const  articleContextData = {
    articleState, 
    getArticles,
    showAddArticleModal,
    setShowAddArticleModal,
    showUpdateArticleModal, 
    setShowUpdateArticleModal,
    addArticle,
    showToast,
    setShowToast,
    deleteArticle,
    findArticle,
    updateArticle
  }

  //Xuat khau no di
  return (
		<ArticleContext.Provider value={articleContextData}>
			{children}
		</ArticleContext.Provider>
	)

  
}
export default ArticleContextProvider
