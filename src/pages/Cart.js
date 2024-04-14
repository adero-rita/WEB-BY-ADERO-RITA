import React from "react";
import "./Cart.css";

import SadBook from "../img/sadbook.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Cart = (props) => {
	const { cartItems, removeFromCart, setCartItems } = props;

	//toast message when clicked on checkout button
	const notify = () => {
		toast.success("Checkout complete! Success you are ready to pay...", {
			position: "top-center",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "colored",
		});
	};

	function totalPrice(cartItems = []) {
		// initialize a variable to keep track of the total price(when there is zero items the total is zero initially)
		let total = 0;
		// log the current value of the total variable to the console
		// console.log(total);
		// use the map() method to iterate over each item in the cartItems array
		// and update the total variable by multiplying the item's quantity and price properties
		cartItems.map((item) => (total = total + item.quantity * item.price));
		// return the final value of the total variable
		return total;
	}
	const handleAddQuantity = (id) => {
		// make a copy of the cart items array so we can edit it without mutating the original state
		const newCartItems = [...cartItems];
		// find the index of the item in the newCartItems array that matches the id we passed in
		const itemIndex = newCartItems.findIndex((item) => item.id === id);
		// increment the quantity property of the item at that index by 1
		newCartItems[itemIndex].quantity++;
		// update the state with the newCartItems array, which now includes the updated quantity value
		setCartItems(newCartItems);
	};
	const handleSubtractQuantity = (id) => {
		//makes copy of a cartItems
		const newCartItems = [...cartItems];
		//checks if there is item with this id
		const itemIndex = newCartItems.findIndex((item) => item.id === id);
		// if the quantity of cartItems is bigger than 1 then we can substract
		if (newCartItems[itemIndex].quantity > 1) {
			newCartItems[itemIndex].quantity--;
			//update the state with new quantuty
			setCartItems(newCartItems);
		} else {
			// Remove the item from the cart(when is 1 remove completly)
			removeFromCart(id);
		}
	};

	function shippingPrice(cartItems) {
		if (totalPrice(cartItems).toFixed(2) >= 50) {
			return 0.0;
		} else {
			return 10;
		}
	}

	return (
		<div>
			<div className="container" id="maincontainerpopular">
				<div className="row">
					<div className="col">
						{cartItems < 1 ? (
							<div className="container">
								<h2 className="populartext">Your cart is empty.</h2>

								<div className="line-1"></div>
								<p>
									Looks like you have not added anything in the cart. Go ahead
									and explore our books...
								</p>
								<img
									src={SadBook}
									alt="no items in shopping cart sad book illustration"
								/>
							</div>
						) : (
							<div classname="container">
								<h2 className="populartext">Your cart</h2>
								<div className="line-1"></div>
							</div>
						)}
						{cartItems &&
							cartItems.map((i) => {
								return (
									<div className="container">
										<div className="cartmain">
											<div className="cartimageplace">
												<img
													className="cartimage"
													src={i.imageLink}
													alt="this is poster for a book"
												/>
											</div>
											<div className="cartbody">
												<h2 className="bookcarttitle">{i.title}</h2>
												<p className="bookauthorcart">Author: {i.author}</p>

												<p>Price: €{i.price}</p>
												<div className="quantitycontainer">
													<button
														className="buttonsaddandremove"
														onClick={() => handleAddQuantity(i.id)}
													>
														+
													</button>
													<p className="quantitynumber">{i.quantity}</p>
													<button
														className="buttonsaddandremove"
														onClick={() => handleSubtractQuantity(i.id)}
													>
														-
													</button>
												</div>
											</div>

											<div className="removebuttondiv">
												<button
													className="removebutton"
													onClick={() => removeFromCart(i.id)}
												>
													x
												</button>
											</div>
										</div>
									</div>
								);
							})}
					</div>
					<div className="col" id="totalcart">
						<h2 className="summarytext">Summary</h2>
						<div className="line-1"></div>
						<h3>Products:€{totalPrice(cartItems).toFixed(2)} </h3>
						<h3>Shipping:€{shippingPrice(cartItems)}</h3>
						<h3>
							Total:€
							{(totalPrice(cartItems) + shippingPrice(cartItems)).toFixed(2)}
						</h3>
						<button onClick={notify} type="button" className="btn btn-success">
							Checkout
						</button>
						<ToastContainer />
					</div>
				</div>
			</div>
		</div>
	);
};
