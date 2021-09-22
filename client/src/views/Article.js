import {useContext,useEffect} from 'react';
import Spinner from 'react-bootstrap/Spinner'
import {ArticleContext} from '../contexts/ArticleContext';
import { AuthContext } from '../contexts/AuthContext';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Toast from 'react-bootstrap/Toast'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Col from 'react-bootstrap/Col'
import SingleArticle from '../components/articles/SingleArticle';
import AddArticleModal from '../components/articles/AddArticleModal'
import UpdateArticleModal from '../components/articles/UpdateArticleModal';
import addIcon from '../assets/plus-circle-fill.svg'

const Article = () => {

  //Context 
	const {
		authState: {
			user: { username }
		}
	} = useContext(AuthContext)

  const  {articleState: {article, articles, articlesLoading},
    getArticles,
    setShowAddArticleModal,    
    showToast: { show, message, type },
		setShowToast    
  } = useContext(ArticleContext);


  //Start: get all posts
  useEffect(() => getArticles(), [] );

  let body = null;

  if (articlesLoading) {
    body = (
			<div className='spinner-container'>
				<Spinner animation='border' variant='info' />
			</div>
		)
  } else if (articles.length === 0 ) {
    body = (
      <>
        <Card className='text-center mx-5 my-5'>
          <Card.Header as='h1'>Hi {username}</Card.Header>
          <Card.Body>
            <Card.Title>Welcome to Read Article</Card.Title>
            <Card.Text>
              Click the button below to create new Article
            </Card.Text>       
            <Button
                variant='primary'
                onClick={setShowAddArticleModal.bind(this, true)}
              >
                Create!
              </Button>
          </Card.Body>
        </Card>
      </>
    )
  } else {
    body = (
      <>
        <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
					{articles.map(article => (            
						<Col key={article._id} className='my-2'>              
							<SingleArticle article={article} />
						</Col>
					))}
				</Row>
        {/* Open Add Article Modal */}
				<OverlayTrigger
					placement='left'
					overlay={<Tooltip>Add a new thing to learn</Tooltip>}
				>
					<Button className='btn-floating'onClick={setShowAddArticleModal.bind(this, true)}>
						<img src={addIcon} alt='add-post' width='60' height='60' />
					</Button>
				</OverlayTrigger>
      </>
    )
  }

  

	return <>
  { body }
  <AddArticleModal />
  {article !== null && <UpdateArticleModal />}
  	{/* After post is added, show toast */}
    <Toast
				show={show}
				style={{ position: 'fixed', top: '20%', right: '10px' }}
				className={`bg-${type} text-white`}
				onClose={setShowToast.bind(this, {
					show: false,
					message: '',
					type: null
				})}
				delay={6000}
				autohide
			>
				<Toast.Body>
					<strong>{message}</strong>
				</Toast.Body>
			</Toast>
  </>
  
}

export default Article
