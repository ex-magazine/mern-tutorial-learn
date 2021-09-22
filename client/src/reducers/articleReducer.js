import {
	ARTICLES_LOADED_SUCCESS,
	ARTICLES_LOADED_FAIL,
	ADD_ARTICLE,
	DELETE_ARTICLE,
	UPDATE_ARTICLE,
	FIND_ARTICLE
} from '../contexts/constants'

export const articleReducer = (state, action) => {
	const { type, payload } = action
  switch(type) {
    case ARTICLES_LOADED_SUCCESS:
			return {
				...state,
				articles: payload,
				articlesLoading: false
			}
    case ARTICLES_LOADED_FAIL:
      return {
        ...state,
        articles: [], // tra lai mot array trang
        articlesLoading: false
      }
    case ADD_ARTICLE:
      return {
        ...state,
        articles: [...state.articles, payload]
      }
    case DELETE_ARTICLE:
        return {
          ...state,
          articles: state.articles.filter(article => article._id !== payload)
        }
    case FIND_ARTICLE:
      return { ...state, article: payload }

    case UPDATE_ARTICLE:
      const newArticles = state.articles.map(article =>
        article._id === payload._id ? payload : article
      )

      return {
        ...state,
        articles: newArticles
      }
  
    default:
			return state
  }
  /*


		
		

		case FIND_POST:
			return { ...state, post: payload }

		case UPDATE_POST:
			const newArticles = state.articles.map(post =>
				post._id === payload._id ? payload : post
			)

			return {
				...state,
				articles: newArticles
			}

		default:
			return state
	}*/

}
