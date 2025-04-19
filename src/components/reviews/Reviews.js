import React, {useState} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Button from '../button/Button';
import reviewsArr from '../../data/data';
import 'swiper/css/effect-coverflow';
import './Reviews.css';
import 'swiper/css';

function Reviews(){
    const stars=[];
    const [reviewText, setReviewText] = useState('')
    const [rating, setRating] = useState(0)
    const [name, setName] = useState('')
    const [job, setJob] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false)
    /////////////////////////////////
    for(let i=0;i<5;i++){
        stars.push(<FontAwesomeIcon icon={faStar} className='star-icon'/>)
    }
    const handleReviewChange = (event) => {
        setReviewText(event.target.value);
    };
    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };
    const handleSubmitReview = (event) => {
        event.preventDefault();
        const newReview = {
            id: reviewsArr.length + 1,
            review: reviewText,
            rating: rating,
            img: '/images/img-review.png',
            name: name || 'Anonymous',
            job: job || 'User'
        };
        reviewsArr.push(newReview);
        setReviewText('');
        setRating(0);
        setName('');
        setJob('');
        setIsModalOpen(false);
    };

    return(
        <div className='reviews-sec mt-5 position-relative'>
            <h3 className='title text-center'>User Reviews & Ratings</h3>
            <div className='d-flex justify-content-center'>
                <Button text="+ Add Review" btnClass="btn mt-2"  radius="30px" height="40px"
                width="150px" margin="0" border="1px solid #fff" bgColor="#780101"
                onClick={() => setIsModalOpen(true)}/>
            </div>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView="auto"
                initialSlide={3}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                breakpoints={{
                  
                }}
                modules={[EffectCoverflow]}
                className="mySwiper reviews"
                style={{ width: '100%', maxWidth: '800px', paddingTop: '30px', paddingBottom: '50px',borderRadius:"10px" }}
                >
                {reviewsArr.map(item=>{
                    return(
                        <SwiperSlide style={{ width: '300px' }} key={item.id}>
                        <div  className='reviews-content'>
                            <div className='quote-img d-flex justify-content-end mt-2 mx-3'>
                                <img src='./images/right-quote.png'/>
                            </div>
                            <div className='text p-3'>
                                <p>{item.review}</p>
                                 <div>{stars}</div>
                            </div>
                            <div className='profile d-flex px-3'>
                                <div className='img mt-2'>
                                    <img src={item.img}/>
                                </div>
                                <div className='details mt-3'>
                                    <h3>{item.name}</h3>
                                    <p>{item.job}</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    )
                })}
            </Swiper>
            {isModalOpen && (
            <div className="modal-overlay">
                <div className="modal-content">
                    <h4 className="text-center">Add Your Review</h4>
                    <form onSubmit={handleSubmitReview}>
                        <div className="form-group mb-3">
                            <input
                            type="text"
                            className="form-control"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <input
                            type="text"
                            className="form-control"
                            placeholder="Your Job"
                            value={job}
                            onChange={(e) => setJob(e.target.value)}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <textarea
                            className="form-control"
                            rows="4"
                            placeholder="Write your review here..."
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                        
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label className="mb-2">Rate this website</label>
                            <div className="stars">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <FontAwesomeIcon
                                key={star}
                                icon={faStar}
                                className="star-icon"
                                style={{
                                    color: star <= rating ? '#FFD700' : '#ccc',
                                    cursor: 'pointer',
                                    fontSize: '24px',
                                    marginRight: '5px'
                                }}
                                onClick={() => setRating(star)}
                                />
                            ))}
                            </div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <button type="submit" className='border-0 rounded-2 px-3 py-1 text-light' style={{backgroundColor:'#780101'}}>Save Review</button>
                            <button
                            type="button"
                            className='border-0 rounded-2 px-3 text-light close-btn'
                            onClick={() => setIsModalOpen(false)}
                            >
                            Cancel
                            </button>
                        </div>
                    </form>

                </div>
            </div>
            )}
        </div>
    )
}
export default Reviews;