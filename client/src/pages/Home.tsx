import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:8000/api/v1/product")
			.then((res) => {
				console.log("Full API Response:", res);
				console.log("Data Content:", res.data);
				setProducts(res.data.data);
			})
			.catch((err) => console.error(err));
	}, []);

	return (
		<div style={{ padding: "20px" }}>
			<h1>LEGO Store</h1>
			<div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
				{products.map((p) => (
					<div key={p.set_num} style={{ border: "1px solid #ccc", padding: "10px" }}>
						<img src={p.set_img_url} alt={p.name} style={{ width: "100%" }} />
						<h3>{p.name}</h3>
					</div>
				))}
			</div>
		</div>
	);
}

export default Home;
