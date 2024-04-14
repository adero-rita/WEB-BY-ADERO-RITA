import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import { useState } from "react";
import Logo from "..//img/logo.png";
import "./NavBar.css";

const NavBar = (props) => {
	const { getProduct, cartItems, getBooks } = props;
	const [formBook, setFormBook] = useState("");
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormBook(e.target.value);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		await getBooks(); // Wait for data to be fetched
		getProduct(formBook); // Search for the product
		navigate("/result");
		setFormBook("");
	};

	function countTotalItemsQuantity(cartItems) {
		let total = cartItems.map((item) => item.quantity);
		// console.log("This is SUMMMMM", total.length);
		if (total.length !== 0) {
			return total.length;
		} else {
			return 0;
		}
	}

	return (
		<div>
			<nav
				className="navbar fixed-top navbar-expand-lg navbar-light"
				id="mainnavbar"
			>
				<h2>Ritahian BOOKSTORE</h2>
				<Link className="navbar-brand" to="/">
					<img
						src={Logo}
						style={{
							width: 80,
							paddingLeft: 20,
							marginLeft: 20,
							marginTop: 10,
						}}
						alt="this is a logo of bookish book store project,Online book store
						Buy books online
						Bookshop online
						Best online book deals
						Affordable books online"
					/>
				</Link>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<form
						onSubmit={handleSubmit}
						className="form-inline ccol-lg-auto mb-3 mb-lg-0 y-2 my-lg-0 input-group mx-auto"
						style={{ paddingTop: 20, maxWidth: "50%" }}
					>
						<input
							className="form-control mr-sm-2"
							type="search"
							placeholder="Search for a book..."
							aria-label="Search"
							value={formBook}
							onChange={handleChange}
						></input>
						<button
							className="btn btn-light my-2 my-sm-0"
							id="submitbuttononform"
							type="submit"
						>
							Search
						</button>
					</form>
				</div>

				<Link className="navbar-brand" to="/cart">
					<button className="btn btn-primary" id="buttoncart">
						<ShoppingCart size={20} />
						<span className="badge badge-light">
							{countTotalItemsQuantity(cartItems)}
						</span>
					</button>
				</Link>
			</nav>
		</div>
	);
};

export default NavBar;
