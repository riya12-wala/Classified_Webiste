import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import classes from './Howitworks.module.css'

function HowItWorkCard({Icon,title,description}) {
  return (
    <>
      <Card  className={classes.card}>
       <div className={classes.back}> {<Icon/>}</div>
      <Card.Body>
          <Card.Title className={classes.title}>{ title}</Card.Title>
        <Card.Text>
        {description}
        </Card.Text>
      </Card.Body>
    </Card>
    </>
  );
}

export default HowItWorkCard;
