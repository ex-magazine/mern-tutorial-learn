import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'

const About = () => {
	return (
    <Container>
		  <Row className='mt-5' style={{ marginRight: 0, marginLeft: 0 }}>			
        <Card>
          <Card.Header>Featured</Card.Header>
          <Card.Body>
            <Card.Title>Why do we use it?</Card.Title>
            <Card.Text>            
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
            </Card.Text>           
            <Button variant='primary'  href='https://netlify.com/' size='lg'>Netlify App</Button>
          </Card.Body>
        </Card>
      </Row>	
		</Container>		
	)
}

export default About
