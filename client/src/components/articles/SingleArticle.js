import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import ActionButtons from './ActionButtons'

const SingleArticle = ({ article: { _id, likeCount, title, content, attachment } }) => (
	<Card className='shadow' border="success">
		<Card.Body>
			<Card.Title>
				<Row>
					<Col>
						<p className='post-title'>{title}</p>
						<Badge pill variant="success">
							{likeCount}
						</Badge>
					</Col>
					<Col className='text-right'>
            <ActionButtons _id={_id} />
					</Col>
				</Row>
			</Card.Title>
			<Card.Text>{content}</Card.Text>
		</Card.Body>
	</Card>
)

export default SingleArticle
