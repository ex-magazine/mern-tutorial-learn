import Button from 'react-bootstrap/Button'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { ArticleContext } from '../../contexts/ArticleContext'
import { useContext } from 'react'





const ActionButtons = ({ _id }) => {
	const { deleteArticle, findArticle,    
    setShowUpdateArticleModal
   } = useContext(
		ArticleContext
	)
  
  const chooseArticle = postId => {
    findArticle(postId);    
    setShowUpdateArticleModal(true);
  }

	return (
		<>			
			<Button className='post-button' onClick={chooseArticle.bind(this, _id)}>
				<img src={editIcon} alt='edit' width='24' height='24' />
			</Button>
			<Button className='post-button' onClick={deleteArticle.bind(this, _id)}>
				<img src={deleteIcon} alt='delete' width='24' height='24' />
			</Button>
		</>
	)
}

export default ActionButtons
