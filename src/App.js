//Styling
import "./App.css";
//Stuff needed
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.js";
import { useEffect, useState } from "react";
//Components
import { Cart } from "./pages/Cart.js";
import { Shop } from "./pages/Shop.js";
import Result from "./pages/Result.js";
import PromoBar from "./components/PromoBar.js";

// Randomise id
import { v4 as uuidv4 } from "uuid";
import Footer from "./footer.js";
import Header from "./header.js";

function App() {
	//All data we get and display
	const [allBooks, setAllBooks] = useState([]);
	//All items clicked(added) to cart
	const [cartItems, setCartItems] = useState([]);
	const [searchResult, setSearchResult] = useState("");

	useEffect(() => {
		getBooks();
	}, []);

	async function getBooks() {
		try {
			let response = await fetch("books.json");
			if (response.ok) {
				let data = await response.json();
				setAllBooks(data.slice(0, 20));
			} else {
				console.log(`Server error: ${response.status} ${response.statusText}`);
			}
		} catch (err) {
			console.log(`Network error: ${err.message}`);
		}
	}

	function getProduct(title) {
		let productData = allBooks.filter((product) =>
			product.title.toLowerCase().includes(title.toLowerCase())
		);

		console.log("reached", title);
		if (productData.length === 0) {
			console.log("We don't have this book: " + title);
			setSearchResult([]);
		} else {
			setSearchResult(productData);
		}
	}

	function addToCart(item) {
		const existingCartItemIndex = cartItems.findIndex(
			(cartItem) => cartItem.id === item.id
		);
		console.log("this is the item passed!!!", item);
		if (existingCartItemIndex >= 0) {
			const newCartItems = [...cartItems];
			newCartItems[existingCartItemIndex].quantity += 1;
			setCartItems(newCartItems);
		} else {
			const newCartItem = {
				//uuidv4() is used to generate a unique ID for the newCartItem object being added to the cart
				//WHY WE NEED IT? If we did not use a unique identifier like uuidv4(), we would need to rely on other properties of the item, such as its title or author, to identify it within the cart. However, this can lead to errors and inconsistencies if multiple items have the same title or author. By generating a unique identifier with uuidv4(), we can ensure that each item in the cart is uniquely identifiable, even if it shares other properties with other items.

				id: uuidv4(),
				author: item.author,
				title: item.title,
				price: item.price,
				imageLink: item.imageLink,
				quantity: 1,
			};
			setCartItems([...cartItems, newCartItem]);
		}
	}
	function removeFromCart(id) {
		console.log("Remove from cart", id);
		// find the index of the item in the cartItems array that matches the id we passed in
		const itemIndex = cartItems.findIndex((item) => item.id === id);
		// check if the item was found in the cartItems array
		if (itemIndex >= 0) {
			// make a copy of the cartItems array so we can edit it without mutating the original state
			const newCartItems = [...cartItems];
			// check if the quantity of the item at the itemIndex is greater than 1
			// if (newCartItems[itemIndex].quantity > 1) {
			// 	newCartItems[itemIndex].quantity--;
			// } else {
			// remove the item from the newCartItems array using the splice() method
			// the splice() method modifies the array in place and returns the removed item(s)
			newCartItems.splice(itemIndex, 1);
			// }
			// update the state with the newCartItems array, which now reflects the removed item
			setCartItems(newCartItems);
		}
	}

	return (
		<div className="App">
			<Header/>
			<Router>
				<PromoBar />
				<NavBar
					getProduct={getProduct}
					cartItems={cartItems}
					getBooks={getBooks}
				/>

				<Routes>
					<Route
						path="/"
						element={<Shop allBooks={allBooks} addToCart={addToCart} />}
					/>
					<Route
						path="/cart"
						element={
							<Cart
								cartItems={cartItems}
								removeFromCart={removeFromCart}
								setCartItems={setCartItems}
							/>
						}
					/>
					<Route
						path="/result"
						element={
							<Result
								getProduct={getProduct}
								allBooks={allBooks}
								searchResult={searchResult}
								addToCart={addToCart}
							/>
						}
					/>
				</Routes>
			</Router>
			<Footer/>
		</div>
	);
}

export default App;
