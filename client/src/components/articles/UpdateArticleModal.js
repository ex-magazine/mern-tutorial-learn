import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { ArticleContext } from '../../contexts/ArticleContext'

const UpdateArticleModal = () => {
	// Contexts
	const {
		articleState: { article },
		showUpdateArticleModal,
		setShowUpdateArticleModal,
		updateArticle,
		setShowToast
	} = useContext(ArticleContext)

	// State
	const [updatedArticle, setUpdatedArticle] = useState(article)

	useEffect(() => setUpdatedArticle(article), [article])

	const { title, content, attachment } = updatedArticle

	const onChangeUpdatedArticleForm = event => setUpdatedArticle({ ...updatedArticle, [event.target.name]: event.target.value })

	const closeDialog = () => {
		setUpdatedArticle(article);
		setShowUpdateArticleModal(false);
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await updateArticle(updatedArticle)
		setShowUpdateArticleModal(false)
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}



	return (
		<Modal show={showUpdateArticleModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Edit Article?</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
					<Form.Group>
						<Form.Control
							type='text'
							placeholder='Title'
							name='title'
							required
							aria-describedby='title-help'
							value={title}
							onChange={onChangeUpdatedArticleForm}
						/>
						<Form.Text id='title-help' muted>
							Required
						</Form.Text>
					</Form.Group>
					<Form.Group>
						<Form.Control
							as='textarea'
							rows={3}
							placeholder='Description'
							name='content'
							value={content}
							onChange={onChangeUpdatedArticleForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Control
							type='text'
							placeholder='Image'
							name='attachment'
							value={attachment}
							onChange={onChangeUpdatedArticleForm}
						/>
					</Form.Group>					
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={closeDialog}>
						Cancel
					</Button>
					<Button variant='primary' type='submit'>
						Update New!
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	)
}

export default UpdateArticleModal
