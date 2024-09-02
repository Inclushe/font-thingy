import React from "react";

import "./App.css";
import Blob from "./components/Blob";

const CONSTANTS = {
	height: 200,
	width: (200 / 9) * 16,
};

function App() {
	return (
		<main className="h-screen w-full bg-gray-800 p-8">
			<Blob className="text-white p-10">
				<p>Incredible innovation.</p>
			</Blob>
		</main>
	);
}

export default App;
