import React from 'react'
import { useParams } from 'react-router-dom'
import QuickLinks from '../../../component/QuickLinks';
import contact from './contact.svg'
import photo from './photo.svg'
import profile from './profile.svg'
import video from './video.svg'
import website from './website.svg'
import BusinessSideBar from './BusinessSideBar';

function EditBusiness({ toggled, setToggled }) {
  
  const { id } = useParams();
  
  const handleClick = () => {
    setToggled(!toggled)
  }
  const data = [
    {
      src:profile,
      text: "Edit Profile",
      bgclass: 'bg-blue-400',
      onClick:handleClick
   
    },
     {
      src:contact,
       text: "Add Contact",
       bgclass: 'bg-red-400',
      to:`/editbusiness/${id}/contact`
    },
      {
      src:website,
        text: "Add Website",
        bgclass: 'bg-yellow-200',
       to:`/editbusiness/${id}/website`
    },
       {
      src:video,
         text: "Add Video",
         bgclass: 'bg-orange-400',
       to:`/editbusiness/${id}/photo`,
    },
        {
      src:photo,
          text: "Add Photo",
          bgclass: 'bg-lime-500',
       to:`/editbusiness/${id}/photo`
    },
  ]
    
  

    
    // console.log(id)
  return (
      <div className='m-5'>
         
    <BusinessSideBar toggled={toggled} setToggled={setToggled} />
      <div>
        <h4>Quick Links</h4>

        <div className='flex flex-wrap gap-8 m-3 justify-center items-center'>
           {
          data.map((e) => (
              <QuickLinks src={e.src} text={e.text} bgclass={e.bgclass} to={e.to} onClick={e.onClick} />
          ))
        }
       </div>
        
      

      </div>
      
       

    </div>
  )
}

export default EditBusiness
