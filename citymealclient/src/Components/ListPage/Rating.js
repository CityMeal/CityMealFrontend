import React from 'react';
import { FaStar } from 'react-icons/fa'


const inputStlye = {
    display: 'none',
}

const starStyle = {
    cursor: 'pointer',
    marginTop: '3%',
    marginBottom: '4%',
}

const Rating = () => {
    const [rating, setRating] = React.useState(5);

    return (

        <div>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;


                return (
                    <label key={i}>
                        <input
                            style={inputStlye}
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => setRating(ratingValue)}
                        />
                        <FaStar
                            style={starStyle}
                            size={20}
                            color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
                        />
                    </label>
                )
            })}
        </div >
    )
}


export default Rating;