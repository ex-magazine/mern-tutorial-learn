import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState } from 'react'
import { ArticleContext } from '../../contexts/ArticleContext'

const AddArticleModal = () => {
  // Contexts
	const {
		showAddArticleModal,
		setShowAddArticleModal,	
    addArticle,
    setShowToast
	} = useContext(ArticleContext)

  //State
  const [newArticle, setNewArticle] = useState({
    title: '',
    content: '',
    attachment: '',
    likeCount: '0'
  });

  const {title, content, attachment, likeCount } = newArticle;

  const onChangeNewArticleForm = event => setNewArticle({ ...newArticle, [event.target.name]: event.target.value })

  const closeDialog = () => {
    resetAddArticleData();
  }

  const onSubmit = async event => {
    event.preventDefault();    
    const { success, message } = await addArticle(newArticle);
    resetAddArticleData();
    setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
  }


  const resetAddArticleData = () => {
    setNewArticle({
      title: '',
      content: '',
      attachment: '',
      likeCount: ''
    });
		setShowAddArticleModal(false);
	}

  return (
    <Modal show={showAddArticleModal} animation={false} onHide={closeDialog}>
      <Modal.Header closeButton>
				<Modal.Title>Create news?</Modal.Title>
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
              onChange={onChangeNewArticleForm}
						/>
						<Form.Text id='title-help' muted>
							Required
						</Form.Text>
          </Form.Group>
          <Form.Group>
						<Form.Control
							as='textarea'
							rows={6}
							placeholder='Content'
							name='content'
							value={content}
              onChange={onChangeNewArticleForm}				
						/>
					</Form.Group>
					<Form.Group>
						<Form.Control
							type='text'
							placeholder='Image'
							name='attachment'
							value={attachment}	
              onChange={onChangeNewArticleForm}							
						/>
					</Form.Group>
        </Modal.Body>
        <Modal.Footer>
					<Button variant='secondary' onClick={closeDialog}>
						Cancel
					</Button>
					<Button variant='primary' type='submit'>
						Create!
					</Button>
				</Modal.Footer>
      </Form>
    </Modal>
  )
}
export default AddArticleModal
/*
const AddArticleModal = () => {
	// Contexts
	const {
		showAddPostModal,
		setShowAddPostModal,
		addPost,
		setShowToast
	} = useContext(ArticleContext)

	// State
	const [newPost, setNewPost] = useState({
		title: '',
		description: '',
		url: '',
		status: 'TO LEARN'
	})

	const { title, description, url } = newPost

	const onChangeNewPostForm = event =>
		setNewPost({ ...newPost, [event.target.name]: event.target.value })

	const closeDialog = () => {
		resetAddPostData()
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await addPost(newPost)
		resetAddPostData()
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	const resetAddPostData = () => {
		setNewPost({ title: '', description: '', url: '', status: 'TO LEARN' })
		setShowAddPostModal(false)
	}

	return (
		<Modal show={showAddPostModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>What do you want to learn?</Modal.Title>
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
							onChange={onChangeNewPostForm}
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
							name='description'
							value={description}
							onChange={onChangeNewPostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Control
							type='text'
							placeholder='Youtube Tutorial URL'
							name='url'
							value={url}
							onChange={onChangeNewPostForm}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={closeDialog}>
						Cancel
					</Button>
					<Button variant='primary' type='submit'>
						LearnIt!
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	)
}
*/

