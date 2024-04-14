import React from "react";
import "./PromoBar.css";

const PromoBar = () => {
	return (
		<nav
			className="navbar navbar-light justify-content-center"
			id="promobarmain"
		>
			<span className="navbar-brand mb-0 h1" id="promotext">
				FREE delivery on orders over €50
			</span>
		</nav>
	);
};

export default PromoBar;
