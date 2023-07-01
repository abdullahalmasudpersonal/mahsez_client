import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Slider from 'react-slick';
import './ProductDetails.css';
import UseProductDetails from '../../../Hooks/UseProductDetails/UseProductDetails';
import PageTitle from '../../Shared/PageTitle/PageTitle';
import AttarDesWR from '../../Categories/Islamic/Attars/Attar/AttarDetail/AttarDesWR/AttarDesWR';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import UseCart from '../../../Hooks/UseCarts/UseCart';

const ProductDetails = () => {
    const [user] = useAuthState(auth);
    const [cart, setCart] = UseCart();
    const { productId } = useParams();
    const [productDetails] = UseProductDetails(productId);
    const { name, image1, category, availability, offerPrice, weight1 } = productDetails;
    const [count, setCount] = useState(1);
    const [imgSlide, setImgSlide] = useState();
    const [review, setReview] = useState();
    console.log('review', review)

    const addToDb = _id => {
        let shoppingCart = {};
        //get the shopping cart from local storage
        const storedCart = localStorage.getItem('shopping-cart');
        if (storedCart) {
            shoppingCart = JSON.parse(storedCart);
        }
        // add quantity
        const quantity = shoppingCart[_id];
        if (quantity) {
            /*  toast.success(`Alrady Added To Cart`);  */
            /*  const newQuantity = quantity + count;
               shoppingCart[_id] = newQuantity;  */
        }
        else {
            shoppingCart[_id] = count;
        }
        localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart));
    }


    function increment() {
        //setCount(prevCount => prevCount+=1);
        setCount(function (prevCount) {
            if (prevCount < 10) {
                return (prevCount += 1);
            }
            else {
                return (prevCount = 10);
            }
        });
    }
    function decrement() {
        setCount(function (prevCount) {
            if (prevCount > 1) {
                return (prevCount -= 1);
            } else {
                return (prevCount = 1);
            }
        });
    };

    const handleAddToCard = (selectedAttar) => {
        let newCart = [];
        const exists = cart.find(attar => attar._id === selectedAttar._id);
        if (!exists) {
            selectedAttar.quantity = count;
            newCart = [...cart, selectedAttar];
            toast.success(`Added To Cart ${count}`);
        }
        else {
            const rest = cart.filter(attar => attar._id !== selectedAttar._id);
            /* exists.quantity = exists.quantity + count; */
            newCart = [...rest, exists];
            toast.warning(`Alrady Added To Cart`);
        }
        setCart(newCart);
        addToDb(selectedAttar._id);
    }

    /*     let total = 0;
        let shipping = 0;
        let quantity = 0;
        for (const product of cart) {
            quantity = quantity + product.quantity;
            total = total + product.price * product.quantity;
            shipping = shipping + product.shipping;
        }  */

    return (
        <>
            <div className='attar-detail px-2'>
                <PageTitle pageTitle={`${name}`} />
                <div className='attar-detail-first-part'>
                    <div className='attar-detail-first-part-dev1'>
                        <div className='attar-detail-first-part-dev1-big-img-dev'>
                            <img className='attar-detail-first-part-dev1-big-img' src={productDetails.image1} alt='' />
                        </div>
                        <div className='d-flex justify-content-center'>
                            <p className='attar-detail-first-part-dev1-p'>
                                <FontAwesomeIcon icon={faSearch} />
                                <span> Click to zoom in</span>
                            </p>
                        </div>


                        <div className='attar-detail-first-part-dev1-img'>
                            <img height='100px' name='imgSlide' width='100px' src={productDetails.image1} alt='' />
                            <img height='100px' width='100px' src={productDetails.image2} alt='' name='imgSlide' />
                            <img height='100px' width='100px' src={productDetails.image3} alt='' name='imgSlide' />
                        </div>
                    </div>

                    <div className='attar-detail-first-part-dev2'>
                        <p className='mb-0'>{category}</p>
                        <h4 className='mb-2'>{name} masud</h4>
                        <p className=' mb-0'>
                            <small>4.5 </small>
                            <FontAwesomeIcon icon={faStar} style={{ color: 'gray', width: '13px' }} />
                            <FontAwesomeIcon icon={faStar} style={{ color: 'gray', width: '13px' }} />
                            <FontAwesomeIcon icon={faStar} style={{ color: 'gray', width: '13px' }} />
                            <FontAwesomeIcon icon={faStar} style={{ color: 'gray', width: '13px' }} />
                            <FontAwesomeIcon icon={faStar} style={{ color: 'gray', width: '13px' }} />
                            <small> (27) </small>
                            <small>&nbsp; <span data-bs-toggle="modal" data-bs-target="#exampleModal" className='review-btn'>Write a review</span></small>

                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class=" modal-dialog modal-dialog-centered modal-lg">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="exampleModalLabel">
                                                Write a Review</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <div className='d-flex'>
                                                <div>
                                                    <img src={image1} />
                                                </div>
                                                <div className='review-dev2'>
                                                    <div>
                                                        <div className='d-flex justify-content-between'>
                                                            <label><small>Ragging</small></label> <label><small>Requird</small></label>
                                                        </div>
                                                        <select aria-label="Default select example" value={review} onChange={e => setReview(e.target.value)} >
                                                            <option selected>Open this select menu</option>
                                                            <option value="1">One</option>
                                                            <option value="2">Two</option>
                                                            <option value="3">Three</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <div className='d-flex justify-content-between'>
                                                            <label><small>Email</small></label> <label><small>Requird</small></label>
                                                        </div>
                                                        <input />
                                                    </div>
                                                    <div>
                                                        <div className='d-flex justify-content-between'>
                                                            <label><small>Email</small></label> <label><small>Requird</small></label>
                                                        </div>
                                                        <input />
                                                    </div>
                                                    <div>
                                                        <div className='d-flex justify-content-between'>
                                                            <label><small>Review Subject</small></label> <label><small>Requird</small></label>
                                                        </div>
                                                        <input />
                                                    </div>
                                                    <div>
                                                        <div className='d-flex justify-content-between'>
                                                            <label><small>Ragging</small></label> <label><small>Requird</small></label>
                                                        </div>
                                                        <input />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </p>
                        <p className=' product-dev-p pt-2'>
                            {
                                productDetails.offerPrice ?
                                    <h4>
                                        <span style={{ fontSize: '14px', fontFamily: "Optima", fontWeight: 'bold' }}>৳</span>
                                        <span>{offerPrice}.00 &nbsp;</span>

                                        <span style={{ fontSize: '13px', fontFamily: "Optima", fontWeight: 'bold', color: 'gray', textDecoration: 'line-through 1px' }}>৳ {productDetails.ragularPrice}.00</span>
                                    </h4>
                                    :
                                    <span><span style={{ fontSize: '15px', fontFamily: "Optima", fontWeight: 'bold' }}>৳</span>{productDetails.ragularPrice}.00</span>
                            }
                        </p>

                        <div className='attar-detail-dev-table'>
                            <table className="table table-borderless attar-detail-table mb-2">
                                <tbody>
                                    <tr>
                                        <td>Brand:</td>
                                        <td>{productDetails.brand}</td>
                                    </tr>
                                    <tr>
                                        <td>Weight:</td>
                                        <td>{weight1} ML</td>
                                    </tr>
                                    <tr>
                                        <td>Availability:</td>
                                        <td>{availability} Pcs</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className='mt-3'>
                            <p className='mb-2'>Quantity:</p>
                            <div className='attar-detail-quantity-counter'>
                                <div className='attar-detail-quantity-counter-p'>
                                    <p style={{ color: 'gray' }} className='m-0 fw-bold'>{count}</p>
                                </div>
                                <div className='d-grid attar-detail-quantity-counter-dev'>
                                    <button onClick={increment} className='p-0'>
                                        <i style={{ color: 'gray' }} className="fa fa-angle-up px-2 "></i>
                                    </button>
                                    <button onClick={decrement} classnamep='p-0'>
                                        <i style={{ color: 'gray' }} className="fa fa-angle-down px-2"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className='mt-4'>
                            <Link to='/cart' onClick={() => handleAddToCard(productDetails)} ><button className='add-to-cart mb-3'>Buy Now</button></Link> &nbsp; &nbsp; &nbsp;
                            <button className='add-to-cart' onClick={() => handleAddToCard(productDetails)}  >Add to Cart</button>
                        </div>
                    </div>
                </div>
                <AttarDesWR />
            </div>
        </>
    );
};


export default ProductDetails;

{/*   onClick={()=>props.handleAddToCard(props.attar)} */ }