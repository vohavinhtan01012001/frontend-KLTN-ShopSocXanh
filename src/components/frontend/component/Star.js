import React, { useEffect, useState } from "react";
import StarIcon from '@mui/icons-material/Star';
import API from "../../../API";

const RatingStars = ({ productId, startStar,setRefesh,refesh}) => {
  const [rating, setRating] = useState(0);
  console.log(startStar)

  useEffect(() => {
    setRating(startStar)
  }, [startStar])

  const handleMouseEnter = (starIndex) => {
    setRating(starIndex);
  };


  const handleMouseLeave = () => {
    setRating(startStar);

  };
  const handleStarClick = (starIndex) => {
    setRating(starIndex);
    API({
      method: 'put',
      url: 'evaluate/upload-star',
      data: {
        star: starIndex,
        productId: productId
      }
    }).then(res => {
      setRefesh(!refesh);
    })
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((starIndex) => (
        <span
          key={starIndex}
          className={`star ${starIndex <= rating ? "active" : ""}`}
          onMouseEnter={() => handleMouseEnter(starIndex)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleStarClick(starIndex)}
        >
          <StarIcon style={{ fontSize: "25px" }} />
        </span>
      ))}
    </div>
  );
};

export default RatingStars;