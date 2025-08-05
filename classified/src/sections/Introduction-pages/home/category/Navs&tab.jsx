
import Nav from 'react-bootstrap/Nav';

function NavTab({text1,text2,text3,text4}) {
  return (
    <Nav variant="tabs" defaultActiveKey="#quickinfo" className='my-4 font-serif text-red-500 text-xl'>
      <Nav.Item>
              <Nav.Link href="#quickinfo">{ text1}</Nav.Link>
      </Nav.Item>
      <Nav.Item>
              <Nav.Link eventKey="photos" href='#photos'>{ text2}</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey='review' href='#review'>
          {text3}
              </Nav.Link>
              
          </Nav.Item>
          <Nav.Item>
               <Nav.Link eventKey='services' href='#services'>
          {text4}
        </Nav.Link>
          </Nav.Item>
    </Nav>
  );
}

export default NavTab;