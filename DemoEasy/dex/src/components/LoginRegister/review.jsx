import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you're using react-router-dom for navigation
import axios from 'axios';
import { FaStar } from 'react-icons/fa'; // Importing star icon
import './review.css'; // Importing CSS file for styling

function Review() {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const navigate = useNavigate();
    const usernamelocal = localStorage.getItem('username');

    const handleStarClick = (value) => {
        setRating(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/review', { rating, review , usernamelocal})
            .then(result => {
                if (result.data === "ReviewSuccess") {
                    navigate('/swap');
                    alert('Thanks for review')

                }
                else if (result.data === "Fail") {
                    navigate('/review');
                    alert('Try Again')

                } else {
                    console.log("Fail");
                }
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="container">
    <div className='form-register'>
        <form onSubmit={handleSubmit}>

            <h1 style={{ color: 'white' }}>Review us</h1>
            <br></br>
            <div className="mb-5">
                {[1, 2, 3, 4, 5].map((value) => (
                    <span key={value} onClick={() => handleStarClick(value)} className="mx-1">
                        <FaStar
                            className={`star ${value <= rating ? 'star-filled' : 'star-empty'}`}
                        />
                    </span>
                ))}
            </div>

            <div className="mb-3">
                <input type='text' className="form-control" placeholder='Review' value={review} onChange={(e) => setReview(e.target.value)} />
            </div>

            <button type='submit' className='btn btn-primary mb-3'>Submit Review</button>

        </form>
        <p className="text-white">Go back home?</p>
        <Link to='/swap'><button className='btn btn-primary'>Home</button></Link>
    </div>
</div>

    );
}

export default Review;
