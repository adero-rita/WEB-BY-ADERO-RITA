import React from "react";

const Result = (props) => {
	const { searchResult, addToCart } = props;

	return (
		<div>
			<h1 style={{ marginTop: 80 }}>Result</h1>
			<div>
				{searchResult.map((book) => (
					<div key={book.id}>
						<div className="container">
							<div className="row justify-content-center ">
								<div className="col-2 col-lg-3 d-flex justify-content-center">
									<div
										className="card h-100"
										style={{ width: "13rem" }}
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
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Result;
