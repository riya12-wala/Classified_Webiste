import LightGallery from 'lightgallery/react';

// Import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-fullscreen.css';
import 'lightgallery/css/lg-pager.css';
import 'lightgallery/css/lg-share.css';
import 'lightgallery/css/lg-video.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

// Import plugins
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgFullscreen from 'lightgallery/plugins/fullscreen';
import lgPager from 'lightgallery/plugins/pager';
import lgShare from 'lightgallery/plugins/share';
import lgVideo from 'lightgallery/plugins/video';
import lgHash from 'lightgallery/plugins/hash';


import React from 'react'
import { useSelector } from 'react-redux';

function ImageLightGallery({ images }) {
    
    const {filepath} = useSelector((state)=>state.login)
  return (
    <div>
      <LightGallery
    plugins={[lgThumbnail, lgZoom, lgFullscreen,
    lgPager,
    lgShare,
    lgVideo,
        lgHash]
    
    } speed={500}
    selector='a'
      >
              <div className="flex  lg:min-w-[980px] overflow-hidden">
                   {
                  images.map((imag,index)=>
                  (
                      <div  key={index} className=" w-lg-[600px] flex-shrink-0" >
                           <a key={index} href={`${filepath}/${imag}`}    data-sub-html={`<h4>Image ${index + 1}</h4>`}
  >
                              <img src={`${filepath}/${imag}`} alt="" className='w-full h-96 object-cover'/>
                     </a>
                              
                     </div>
                ))
              }
             </div>
      </LightGallery>
    </div>
  )
}

export default ImageLightGallery




