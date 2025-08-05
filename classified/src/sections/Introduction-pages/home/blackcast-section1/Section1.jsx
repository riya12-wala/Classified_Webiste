import React from "react";
import classes from "./Section1.module.css";
import { CiCircleList } from "react-icons/ci";
import { IoSearch } from "react-icons/io5";
import { GoGear } from "react-icons/go";
import Carousels from "../../../../component/Home-Carousels";
import autorepair from "../../../../assets/image/autorepair.jpg";
import travel from "../../../../assets/image/travel.jpg";
import spaghetti from "../../../../assets/image/spaghetti.jpg";

function Section1() {
  return (

    <>
      <div className={classes.Carousels}>
      <Carousels 
        src3='/YOGA.jpg'
        src2='/EDUCATION.jpg'
        src1={spaghetti}
        first="2025 Top Indian Restuarants to Visit"
          firstpara="Tell me what you eat, and I will tell you what you are."
          
        second="Explore School"
          secondpara="Education is not the filling of a pail, but the lighting of a fire."
          

        third="Time For a Tune-up?"
          thirdpara="The only bad workout is the one that didn't happen !"
          
        text1='See List' icon1={<CiCircleList />}
        text2="Search School" icon2={<IoSearch/>}
          text3="GYM" icon3={<GoGear />}
          
          to1='/businesslist/Indian Flavours'
          to2='/businesslist/School'
          to3='/subcategory/gym'
      />
    </div>
    </>
  );
}

export default Section1;
