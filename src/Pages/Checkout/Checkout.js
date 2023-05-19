import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Checkout.css';
import bkash from '../../Assets/img/payment/bkash.png';
import nagod from '../../Assets/img/payment/nagod.png';
import rocket from '../../Assets/img/payment/rocket.png';
import sureCash from '../../Assets/img/payment/sureCash.png';
import UseCart from '../Cart/UseCart';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import UseProductDetails from '../../Hooks/UseProductDetails/UseProductDetails';
import axios from 'axios';
import { toast } from 'react-toastify';
import { deleteShoppingCart } from '../../utilities/fakedb';

const Checkout = () => {
    const [cart, setCart] = UseCart();
    const [shipping, setShipping] = useState();
    const [paymentType, setPaymentType] = useState('cashOnDelivery');
    const [selected, setSelected] = useState("males");
    const changeHandler = e => {
        setSelected(e.target.value);
    };
    console.log(selected)
    //   const { productsId } = useParams();
    //  const [products] = UseProductDetails(productsId);
    const [user] = useAuthState(auth);
    const name = (cart.map(porduct => porduct.name))
    // console.log('email', user.email)
    // console.log('name', name.toString())
    // console.log(cart.map(product=>product.assign({},product.name)))
    //  console.log('order', {cart.map(porduct => <td>{product.name}</td>)})
    // console.log(cart.map(product => product.quantity * product.regularPrice ))
    const myArray = ['apple', 'banana', 'orange'];

    const handlePlaceOrder = event => {
        event.preventDefault();
        const allOrder = {
            coustomerName: user.displayName,
            email: user.email,
            phoneNumber: event.target.phoneNumber.value,
            address: event.target.address.value,
            comment: event.target.comment.value,
            shippingCharge: shipping,
            productsId: (cart.map(porduct => porduct._id)),
            productsName: (cart.map(porduct => porduct.name)),
            productsImage: (cart.map(porduct => porduct.image1)),
            productsQuantity: (cart.map(porduct => porduct.quantity)),
            productsPrice: (cart.map(porduct => porduct.offerPrice)),
            productsTotalPrice: (cart.map(porduct => porduct.offerPrice * porduct.quantity)),
            grandTotal: grandTotal
        }

        const proceed = window.confirm('Are you sure?')
        if (proceed) {
            axios.post('http://localhost:5000/allOrder', allOrder)
                .then(response => {
                    //  console.log(response)
                    const { data } = response;
                    if (data.insertedId) {
                        toast.success('Your order is placed !!!');
                        event.target.reset();
                        deleteShoppingCart();
                    }
                })
        }
    }

    /* load cart */
    let deliveryCharge = 60;
    let quantity = 0;
    let subTotal = 0;
    for (const product of cart) {
        quantity = quantity + product.quantity;
        subTotal = subTotal + product.regularPrice * product.quantity;
    }
    const conditionCharge = parseFloat((subTotal * 0.01).toFixed(2));
    const grandTotal = subTotal + conditionCharge + deliveryCharge;



    return (
        <div className='container-xxl my-5'>
            <h3 className='mb-4'>Checkout</h3>
            <form onSubmit={handlePlaceOrder}>

                <div className='checkout'>

                    <div className='checkout-user-info p-3'>
                        <h5><span>1</span> Coustomer info</h5>
                        <hr />
                        <div>
                            <p className='mb-0'><small>Full Name</small></p>
                            <input type='text' name='firstName' value={user.displayName} disabled />
                        </div>
                        <div>
                            <p className='mb-0'><small>Email Address</small></p>
                            <input value={user.email} disabled required />
                        </div>
                        <div>
                            <p className='mb-0'><small>Phone Number*</small></p>
                            <input type='number' name='phoneNumber' required />
                        </div>
                        <div>
                            <p className='mb-0'><small>Full  Address*</small></p>
                            <input type='text' name='address' required />
                        </div>
                        <div>
                            <p className='mb-0'><small>Commects</small></p>
                            <textarea type='text' name='comment' />
                        </div>
                    </div>

                    <div>
                        <div className='gap-4 cehckout-payment-delivery'>
                            <div className='checkout-payment-method p-3'>
                                <h5><span>2</span> Payment Method</h5>
                                <hr />
                                <h6>Select one payment method</h6>
                                <div>

                                    <input
                                        type="radio"
                                        name="gender"
                                        value="males"
                                        id="males"
                                        checked={selected === "males"}
                                        onChange={changeHandler}
                                    />
                                    <label htmlFor="males">Males</label><br />

                                    <div tabindex="0" aria-hidden={selected !== "males" ? true : false}>
                                        This is males Div
                                        <input />
                                    </div>

                                    <input
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        id="male"
                                        checked={selected === "male"}
                                        onChange={changeHandler}
                                    />
                                    <label htmlFor="male">Male</label><br />

                                    <div tabindex="0" aria-hidden={selected !== "male" ? true : false}>
                                        This is male Div
                                        <input />
                                    </div>



                                    <input
                                        type="radio"
                                        value="female"
                                        id="female"
                                        checked={selected === "female"}
                                        name="gender"
                                        onChange={changeHandler}
                                    />
                                    <label htmlFor="female">Female</label>

                                    <div tabindex="0" aria-hidden={selected !== "female" ? true : false}>
                                        This is female Div
                                    </div>


                                    <ul style={{ listStyleType: 'none' }} class="  mb-3" id="pills-tab" role="tablist">

                                        {/*   <li class="nav-item" role="presentation">
                                            <input style={{display:'inline'}} class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="radio" role="tab" aria-controls="pills-home" aria-selected="true" />
                                            <label>Cash on Delivery</label>
                                        </li> */}

                                        <li class="nav-item" role="presentation">
                                            {/* <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Home</button> */}

                                            <input style={{ display: 'inline' }} type='radio' name='paymentType' class="nav-link active" id="cashOnDelivery" data-bs-toggle="pill" data-bs-target="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true" checked={paymentType === 'cashOnDelivery'} value='cashOnDelivery' />
                                            <label>&nbsp;Cash on Delivery</label>
                                        </li>

                                        <li class="nav-item" role="presentation">
                                            {/*    <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Profile</button> */}

                                            <input style={{ display: 'inline-block' }} type='radio' name='paymentType' class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false" value='Bkash' />
                                            <label>&nbsp;Bkash</label>
                                        </li>

                                        <li class="nav-item" role="presentation">
                                            {/* <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Contact</button> */}

                                            <input style={{ display: 'inline-block' }} type='radio' name='paymentType' class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false" value='Nagod' />
                                            <label>&nbsp;Nagod</label>
                                        </li>
                                    </ul>

                                    <div class="tab-content" id="pills-tabContent">
                                        <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="cashOnDelivery">aaaa</div>
                                        <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">bbb</div>
                                        <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">ccc</div>
                                    </div>

                                    {/*  <div>
                                        <input type='radio' name='paymentType' value='পণ্য হাতে পেয়ে সম্পূর্ণ মূল্য পরিশোধ করতে হবে।' onChange={e => setPaymentType(e.target.value)} required />
                                        <label>&nbsp;Cash on Delivery</label>
                                    </div>

                                    <div>
                                        <input type='radio' name='paymentType' value="  বিকাশে টাকা প্রদান করার জন্য বিকাশ App এর মাধ্যমে অথবা সরাসরি *247# ডায়াল করে 'Send Money (সেন্ড মানি)' অপশনটি সিলেক্ট করুন। আমাদের বিকাশ নাম্বার '01737906772' এ আপনার মোট বিল প্রদান করুন। বিঃদ্রঃ শুধুমাত্র 'সেন্ড মানি' অপশন এর মাধ্যমে বিল পরিশোধ করতে হবে। <br /> bKash Personal Number : 01737906772" onChange={e => setPaymentType(e.target.value)} required />
                                        <label>&nbsp;Bkash</label>
                                        <label>Bkash Number </label>
                                        <input type='number' placeholder='' />
                                    </div>

                                    <div>
                                        <input type='radio' name='paymentType' value='নগদে টাকা প্রদান করার জন্য নগদ App এর মাধ্যমে অথবা সরাসরি *167# ডায়াল করে "Send Money (সেন্ড মানি)" অপশনটি সিলেক্ট করুন।
                                        আমাদের নগদ নাম্বার "01737906772" এ আপনার মোট বিল প্রদান করুন।
                                        বিঃদ্রঃ শুধুমাত্র "সেন্ড মানি" অপশন এর মাধ্যমে বিল পরিশোধ করতে হবে। 
                                        Nagad Personal Number : 01737906772' onChange={e => setPaymentType(e.target.value)} required />
                                        <label>&nbsp;Nagod</label>
                                    </div>

                                    {paymentType} */}
                                </div>
                            </div>

                            <div className='checkout-payment-method p-3'>
                                <h5><span>3</span> Shipping Charge</h5>
                                <hr />
                                <h6>Select shipping area</h6>

                                <div>
                                    <div>
                                        <input type='radio' name='shipping' value='Outside of Dhaka 100৳' onChange={e => setShipping(e.target.value)} required />
                                        <label>&nbsp;Outside of Dhaka 100৳</label>
                                    </div>
                                    <div>
                                        <input type='radio' name='shipping' value='Inside of Dhaka 60৳' onChange={e => setShipping(e.target.value)} />
                                        <label>&nbsp;OInside of Dhaka 60৳</label>
                                    </div>
                                    {shipping}

                                    {/* <div class="form-check">
                                        <input class="form-check-input" type="radio" name="shipping" id="flexRadioDefault1" defaultValue='checked' onChange={e=>setShipping(e.target.value)} value='Outside of Dhaka 100৳' />
                                        <label class="form-check-label" for="flexRadioDefault1">
                                            Outside of Dhaka 100৳
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="shipping" id="flexRadioDefault2" onChange={e=>setShipping(e.target.value)} value='Inside of Dhaka 60৳' />
                                        <label class="form-check-label" for="flexRadioDefault2">
                                            Inside of Dhaka 60৳
                                        </label>
                                    </div> */}
                                </div>

                            </div>
                        </div>


                        <div className='mt-4 p-3 checkout-order-info'>
                            <h5><span>4</span> Order Overview</h5>
                            <hr />
                            <table class="table table-responsive">
                                <thead>
                                    <tr>
                                        <th scope="col">Product Name</th>
                                        <th scope="col" className='text-center'>Quantity</th>
                                        <th scope="col" className='text-end'>Unit Price</th>
                                        <th scope="col" className='text-end'>Total Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cart.map(product =>

                                            <tr>
                                                <td>{product.name}</td>
                                                {/*  <td><img src={product.image1} width='100px' alt='' /></td> */}
                                                <td className='text-center'>
                                                    {product.quantity}
                                                </td>
                                                <td className='text-end'>{product.regularPrice}</td>
                                                <td className='text-end'>{product.quantity * product.regularPrice}</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                            <div>
                                <h6 className='text-end'>Sub Total: {subTotal} <span>Tk</span></h6>
                                <h6 className='text-end'>Condition Charge: {conditionCharge} <span>Tk</span></h6>
                                <h6 className='text-end'>Home Delivery: {deliveryCharge} <span>Tk</span></h6>
                                <h5 className='text-end'> Grand Total: {grandTotal} Tk</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className='my-4'></hr>
                <div className='place-order-btn'>
                    <button>Place Order</button>
                </div>
            </form>
        </div >
    );
};

export default Checkout;


/*   <div className='mt-3'>
                            <h6>We Accept</h6>
                            <div className='footer-payment-cart'>
                                <img src={bkash} alt='' />
                                <img src={nagod} alt='' />
                                <img src={rocket} alt='' />
                                <img src={sureCash} alt='' />
                            </div>
                        </div> */