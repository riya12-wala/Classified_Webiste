// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import Lightbox from 'yet-another-react-lightbox';
// import 'yet-another-react-lightbox/styles.css';

// function YetAnotherPhoto({ images }) {
//   const [open, setOpen] = useState(false);
//   const { filepath } = useSelector((state) => state.login);

//   return (
//     <>
//       <div className="flex gap-2">
//         {images.slice(0, 3).map((img, idx) => (
//           <img
//             key={idx}
//             src={`${filepath}/${img}`}
//             alt={`preview-${idx}`}
//             className="w-64 h-64 object-cover cursor-pointer rounded-md"
//             onClick={() => setOpen(true)}
//           />
//         ))}
//       </div>

//       <Lightbox
//         open={open}
//         close={() => setOpen(false)}
//         slides={images.map((img) => ({ src: `${filepath}/${img}` }))}
//       />
//     </>
//   );
// }

// export default YetAnotherPhoto;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";

function YetAnotherPhoto({ media }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const { filepath } = useSelector((state) => state.login);

  // Only include images/videos for lightbox
 
  
   const slides = Array.isArray(media)
  ? media
      .filter((file) => {
        const ext = file.split(".").pop().toLowerCase();
        return [
          "jpg",
          "jpeg",
          "avif",
          "png",
          "webp",
          "gif",
          "mp4",
          "webm",
          "ogg",
        ].includes(ext);
      })
      .map((file) => {
        const fullPath = `${filepath}/${file}`;
        const ext = file.split(".").pop().toLowerCase();

        if (["mp4", "webm", "ogg"].includes(ext)) {
          return {
            type: "video",
            width: 1280,
            height: 720,
            sources: [{ src: fullPath, type: `video/${ext}` }],
          };
        }

        return { type: "image", src: fullPath };
      })
  : [];


  const handleClick = (file, idx) => {
    const ext = file.split(".").pop().toLowerCase();
    if (["pdf"].includes(ext)) {
      window.open(`${filepath}/${file}`, "_blank");
    } else {
      // Only set index for items included in the lightbox
      const lightboxIndex = slides.findIndex(
        (slide) =>
          slide.src?.includes(file) || slide.sources?.[0].src.includes(file)
      );
      setIndex(lightboxIndex);
      setOpen(true);
    }
  };

  return (
    <>
      <div className="flex gap-3 flex-wrap">
        

        {media && media.slice(0, 3).map((file, idx) => {
          const ext = file.split(".").pop().toLowerCase();
          const fullPath = `${filepath}/${file}`;
          const isImage = ["jpg", "jpeg", "png", "webp", "gif","avif"].includes(ext);
          const isVideo = ["mp4", "webm", "ogg"].includes(ext);
          const isPdf = ext === "pdf";

          return (
            <div
              key={idx}
              className="w-64 h-64 flex items-center justify-center bg-gray-100 border rounded cursor-pointer relative overflow-hidden"
              onClick={() => handleClick(file, idx)}
            >
              {isImage ? (
                <img
                  src={fullPath}
                  alt="media"
                  className="w-full h-full object-cover"
                />
              ) : isVideo ? (
                <video
                  src={fullPath}
                  className="w-full h-full object-cover"
                  muted
                />
              ) : isPdf ? (
                <div className="text-center px-4">
                  <p className="text-sm font-semibold">PDF Document</p>
                  <p className="text-xs text-gray-600 mt-2">{file}</p>
                </div>
              ) : (
                <p>Unsupported</p>
              )}
            </div>
          );
        })}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        plugins={[Video]}
      />
    </>
  );
}

export default YetAnotherPhoto;
