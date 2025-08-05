import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "./red-ribbon-logo-png.webp";
import HomeButton from "../../../component/HomeButton.jsx";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import {  Container, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { IoIosSearch } from "react-icons/io";
import { MdOutlinePersonOutline } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { useMemo } from "react";
import {
  getAllSubCategory,
  getCategory,
} from "../../../redux/store/actions/category-action.js";
import { getAllBusiness, getBusiness } from "../../../redux/store/actions/business-action.js";

const address = [ "Dahisar", "Kandivali", "Malad", "Goregaon", "Oshiwara", "Andheri", "Juhu", "Versova", "Santacruz",
  "Khar", "Bandra", "Mahim", "Dadar", "Parel", "Lower Parel", "Worli", "Prabhadevi", "D N Nagar",
  " Azad Nagar", "Oshiwara Industrial Estate", "Goregaon West", "Goregaon East", "Bangur Nagar",
 " Malad West", "Malad East", "Kandivali West"," Kandivali East"," Dahisar East", "Dahisar West","Borivali","Thane", "Borivali East","Borivali West","Shivar Garden","Vardaman Fantasy","Mira Road" ]

function Header({ toggled, setToggled }) {
  // console.log(toggled,setToggled)

  const { isLogged, users, filepath } = useSelector((state) => state.login);
  const { categories, subcategories } = useSelector((state) => state.category);
  const { business } = useSelector((state) => state.business);
 

  const [location, setLocation] = useState("");
  const [query, setQuery] = useState("");


   

  const dispatch = useDispatch();
  const navigate = useNavigate(); // from react-router-dom

  const [querySuggestions, setQuerySuggestions] = useState([]);

  
  useEffect(() => {
    dispatch(getAllBusiness());
  }, [dispatch]);

  
  useEffect(() => {
    dispatch(getCategory());
    dispatch(getAllSubCategory());
  }, [dispatch]);


  const combinedSuggestions = useMemo(() => {
    return [
        ...new Set([
           ...categories.map((cat) => ({
           type: "category",
           value: cat.cat_name,
         })),
         ...subcategories.map((sub) => ({
           type: "subcategory",
           value: sub.sub_category,
         })),
           ...((Array.isArray(business) ? business : []).map((bus) => ({
        type: bus.category?.cat_name || "business",
        value: bus?.name || "",
      }))),
        ])
      ]
    },[categories,subcategories,business])



  
 



  const isCategory = (text) => {
    return categories.some(
      (cat) => cat.cat_name.toLowerCase() === text.toLowerCase()
    );
  };

  const isSubCategory = (text) => {
    return subcategories.some(
      (cat) => cat.sub_category.toLowerCase() === text.toLowerCase()
    );
  };

   useEffect(() => {
    if (!query) {
      setQuerySuggestions([]);
    } else {
      const matched = combinedSuggestions.filter(s =>
        s.value.toLowerCase().includes(query.toLowerCase())
      );
      setQuerySuggestions(matched.slice(0, 5));
    }
   }, [query, combinedSuggestions]);
  
  
  
  const [addressSuggestions, setAddressSuggestions] = useState([]);

  


  useEffect(() => {
    if (!location) {
      setAddressSuggestions([]);
    } else {
      const matched = address.filter(b =>
        b.toLowerCase().includes(location.toLowerCase())
      );
      setAddressSuggestions(matched.slice(0, 5));
    }
  }, [location]);


  return (
    <Navbar expand="lg" className={classes.navbar} sticky="top">
      <Container>
        <Navbar.Brand href="/" className={classes.logo}>
          <img src={logo} alt="This is an Logo." />
        </Navbar.Brand>


          <Form className="d-flex flex-wrap gap-2">
           



             <div className="relative  w-[300px]">           
                <Form.Control
              type="search"
              autoComplete="off"
              placeholder="address, neighborhood, city, state or zip"
              aria-label="Search"
              
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
                
              
            <div className="absolute top-10 right-0  w-full"> 
           {addressSuggestions.length > 0 && (
              <div className="absolute top-10 right-0  w-full bg-white border border-gray-300 p-2 rounded shadow-lg max-h-60 overflow-y-auto z-10">
                {addressSuggestions.map((item, idx) => (
                  <div
                    key={idx}
                    className={classes.dropdownItem}
                    onClick={() => {
                      setLocation(item);
                      setAddressSuggestions([]);
                    }}
                  >
                    <p className="m-0 p-2">{item}</p>
                    
                 <div className="border-b-2 "></div>
                  </div>
                ))}
              </div>
            )}      
                     
          </div>
          </div>

            <div className="relative  w-[300px]">           
                 <Form.Control
              type="search"
              autoComplete="off"
              placeholder="things to do, nail salons, plumbers"
              aria-label="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
                
              
            <div className="absolute top-10 right-0  w-full"> 
          
                {querySuggestions.length > 0 && (
              <div className="absolute top-10 right-0 w-full bg-white border border-gray-300 p-2 rounded shadow-lg max-h-60 overflow-y-auto z-50">
                {querySuggestions.map((item, idx) => (
                  <div
                    key={idx}
                    className={classes.dropdownItem}
                    onClick={() => {
                      setQuery(item.value);
                      setFilteredItems([]);
                    }}
                  >
                    <p className="m-0 pt-1">{item.value}</p>
                    <p className="font-thin pb-1 m-0">
                      {item.type}
                    </p>
                 <div className="border-b-2 "></div>
                  </div>
                ))}
              </div>
            )}            
          </div>
          </div>



            <Button
              id="basic-addon1"
              type="submit"
              className={classes.search}
              onClick={(e) => {
                e.preventDefault();
                if (location && query) {
                  if (isCategory(query)) {
                    navigate(
                      `/businesslist?cat_name=${query}&address=${location}`
                    );
                  } else if (isSubCategory(query)) {
                    navigate(
                      `/businesslist?sub_cat=${query}&address=${location}`
                    );
                  } else {
                    navigate(
                      `/singleBusiness?name=${query}&address=${location}`
                    );
                  }
                }
                // else if(query) {
                //   navigate(`/businesslist/${query}`)
                //   }
                          setLocation("");   
                setAddressSuggestions([]); 
                   setQuery(""); 
                setFilteredItems([]); 
        
              }}
            >
              <IoIosSearch />
            </Button>
          </Form>
        

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={`ms-auto ${classes.nav}`}>
            <Link to="/logintobusiness" className="flex gap-2">
              Add your Business
            </Link>

            <Link to="/toreview">Write a Review</Link>

            {isLogged ? (
              users && users.profilePic ? (
                <img
                  className={classes.image}
                  src={`${filepath}/${users.profilePic}`}
                  alt="This is Profile Image"
                  onClick={() => setToggled(!toggled)}
                />
              ) : (
                <MdOutlinePersonOutline onClick={() => setToggled(!toggled)} />
              )
            ) : (
              <>
                <div className={classes.login}>
                  
                    <HomeButton text="Log in" to='/login' />
             
                </div>
            
                  <HomeButton text="Sign Up" to='/signup' />
               
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;


