import Carousel from 'react-bootstrap/Carousel';

import classes from './Carousels.module.css';
import HomeButton from './HomeButton';
function Carousels({first, firstpara, second, secondpara, third, thirdpara,src1, src2, src3,text1, text2, text3,icon1, icon2, icon3,to1,to2,to3}) {
  return (
    <Carousel className={classes.blackcast}>
          <Carousel.Item>
          <Carousel.Caption className={classes.caption}>
          <h1>{first} </h1>
                  <p>{firstpara}</p>
                  <HomeButton icon={icon1} text={ text1} to={to1}/>
        </Carousel.Caption>
    <img src={src1} alt="" />
    
      </Carousel.Item>
          <Carousel.Item>
          <Carousel.Caption className={classes.caption}>
                  <h1>{ second}</h1>
                  <p>{secondpara}</p>
                  <HomeButton icon={icon2} text={text2} to={to2}/>
        </Carousel.Caption>
      <img src={src2} alt="" />
       
      </Carousel.Item>
          <Carousel.Item>
          <Carousel.Caption className={classes.caption}>
                  <h1>{third}</h1>
          <p>
            {thirdpara}
                  </p>
                  <HomeButton icon={icon3} text={text3} to={to3}/>
        </Carousel.Caption>
      <img src={src3} alt="" />
       
      </Carousel.Item>
    </Carousel>
  );
}

export default Carousels;