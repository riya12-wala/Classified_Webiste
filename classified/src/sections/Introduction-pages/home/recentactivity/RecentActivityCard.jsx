import { Container, Row, Col } from "react-bootstrap";
import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import classes from "./RecentActivityCard.module.css";
import { BsEmojiSurprise } from "react-icons/bs";
import { MdOutlineEmojiObjects } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";
import { PiHandsClapping } from "react-icons/pi";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'



function RecentActivityCard({ images = [], src1, text, text1, text2, text3 ,businessId}) {
  const { filepath } = useSelector((state) => state.login);
  return (
    <section className={classes.blogposts}>
      <Container>
        <article>

          <Link to={`/singleBusiness/${businessId}`} className='no-underline text-black'>
          <div className={classes.textcenter}>
            <img src={src1} alt="Profile Image" />
            <div>
              <p className={classes.author}>{text2}</p>
              <p className={classes.post}>
                <time datetime={text3}>{text3}</time>
              </p>
            </div>
          </div>

                  
          <div className={classes.postimg}>
            <p className={classes.postcategory}>{text}</p>
            <h2>{text1}</h2>
            <div className="flex">{images.length > 0 &&
              images.map((item, index) => (
                <img
                  src={`${filepath}/${item}`}
                  alt=""
                  key={index}
                  srcset=""
                  className="w-1/4 h-1/2 "
                  style={{ margin: "2px", borderRadius: "5px" ,}}
                />
              ))}</div>
          </div>
              </Link>
          <div className={classes.emoji}>
            <Row>
              <Col>
                <MdOutlineEmojiObjects />
              </Col>
              <Col>
                <PiHandsClapping />
              </Col>
              <Col>
                <IoMdHeartEmpty />
              </Col>
              <Col>
                <BsEmojiSurprise />
              </Col>
            </Row>
          </div>
        </article>
      </Container>
    </section>
  );
}

export default RecentActivityCard;
