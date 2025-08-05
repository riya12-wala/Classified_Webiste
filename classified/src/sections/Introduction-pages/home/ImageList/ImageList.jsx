import * as React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Heading from "../../../../component/Heading";
import { Container } from "react-bootstrap";
import img1 from "./1495023460_149502258262850.jpg";
import img2 from "./churchgate.jpeg";
import img3 from "./images.jpeg";
import img4 from "./shimla.jpg";
import classes from './ImageList.module.css';

export default function MasonryImageList() {
  // Add a simple hook to adjust columns based on screen width
  const [cols, setCols] = React.useState(2);

  React.useEffect(() => {
    const updateCols = () => {
      if (window.innerWidth < 576) {
        setCols(1);
      } else if (window.innerWidth < 992) {
        setCols(2);
      } else {
        setCols(3);
      }
    };
    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  return (
    <div className={classes.full}>
      <Heading text="Trending Cities" description="Explore With Us!!" />
      <Container className="d-flex justify-content-center ">
        <Box sx={{ width: '100%', maxWidth: 1200, px: 2 }}>
          <ImageList variant="masonry" cols={cols} gap={12}>
            {itemData.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.img}?w=248&fit=crop&auto=format`}
                  alt={item.title}
                  loading="lazy"
                  style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                />
                <ImageListItemBar
                  title={item.title}
                  position="below"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </Container>
    </div>
  );
}

const itemData = [
  { img: img1, title: "Lonavala" },
  { img: img2, title: "Churchgate" },
  { img: img3, title: "Marine Drive" },
  { img: img4, title: "Shimla" },
];
