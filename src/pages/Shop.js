import React from "react";
import Popular from "../components/Popular.js";
import "./Shop.css";

export const Shop = (props) => {
	const { allBooks, addToCart } = props;

	// console.log(allBooks);

	return (
		<div className="Shop">
			<Popular allBooks={allBooks} addToCart={addToCart} />
			<div className="container">
				<h1 className="populartext">All Books</h1>
				<div className="container">
					<div className="row justify-content-center ">
						{allBooks &&
							allBooks.map((book) => {
								return (
									<div className="col-12 col-sm-8 col-md-8 col-lg-3 d-flex justify-content-center">
										<div
											className="card h-100"
											style={{ width: "200px" }}
											key={book.id}
										>
											<img
												className="card-img-top"
												alt="Card  cap book "
												src={book.imageLink}
											></img>
											<div className="card-body">
												<p className="card-text">{book.author}</p>
												<h2 className="card-title">{book.title}</h2>
												<p>€{book.price}</p>
												<button
													className="addtocartbut"
													onClick={(e) => addToCart(book)}
												>
													Add to cart
												</button>
											</div>
										</div>
									</div>
								);
							})}
					</div>
				</div>
			</div>
		</div>
	);
};
