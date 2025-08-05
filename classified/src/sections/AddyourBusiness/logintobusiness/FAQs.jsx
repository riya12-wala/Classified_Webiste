import { Container } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import classes from './FAQs.module.css'
function FAQs() {
    return (
      
        <>
          

       
            <Container>
           
    <Accordion className={classes.main}>
      <Accordion.Item eventKey="0" className={classes.item}>
        <Accordion.Header className={classes.header}>What are the benefits of listing a business on Classified?</Accordion.Header>
        <Accordion.Body className={classes.bodyp}>
        Classified is India's No. 1 local search platform and provides a range of benefits for businesses listed on the platform such as
                <ul type='disc'>
                  <li>Boost your online presence and get more customers -  Listing your business will help you reach out to these users when your business listing or your business category is searched on Justdial.</li>
                  <li>Create an online catalogue to showcase your ready-to-buy products or services for prospective clients seeking for more detailed information.</li>
       <li>Build Trust - Having an online presence on Classified will help you build trust with customers and engage with them via reply to reviews and questions.</li>
              <li>Publish Deals, Menu, Rate Card, Brochure, etc to inform your potential customers about your business offerings.</li>
                </ul>
        </Accordion.Body>
      </Accordion.Item >
      <Accordion.Item eventKey="1" className={classes.item}>
        <Accordion.Header className={classes.header}>How can I make my listing more visible?</Accordion.Header>
        <Accordion.Body className={classes.bodyp}>
                <ul type="disc">
                  <li>Showcase Your Business: Feature high-quality photos of your location, products, services, and even smiling customers. Let potential customers visualize what awaits them.</li>
                  <li>Craft a Compelling Narrative: Tell your story! Explain what makes your business unique and why customers should choose you over the competition.</li>
                  <li>Engage with Feedback: Actively respond to reviews, both positive and negative. Thank customers for their praise and address any concerns promptly.</li>
                  <li>Maintain Accuracy: Ensure all information, including address, hours of operation, and contact details, is accurate and up-to-date.</li>
</ul>
        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2" className={classes.item}>
        <Accordion.Header className={classes.header}>Can I list my business for FREE on Justdial?</Accordion.Header>
        <Accordion.Body className={classes.bpdyp}>
        Totally! Just add your phone number, address, and business type – it's super easy!

        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3" className={classes.item}>
        <Accordion.Header className={classes.header}>I already have a website and social media. Do I still need Classified?</Accordion.Header>
        <Accordion.Body className={classes.bodyp}>
        Yes, your free business listing complements your website and social media presence. Adding your website and social media handles to your Justdial profile will make your site more visible to customers searching for your business listing or category.

        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4" className={classes.item}>
        <Accordion.Header className={classes.header}>Can I change my listing information after I create it?</Accordion.Header>
        <Accordion.Body className={classes.bodyp}>
        Absolutely! Just go to the "My Business" section on Justdial and update details like your phone number, address, hours, or even your menu.
        </Accordion.Body>
      </Accordion.Item>
      
    </Accordion>
  


  </Container>
            </>
  );
}

export default FAQs;