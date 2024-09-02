import React from "react";
import { getSvgPath } from "figma-squircle";
import { useControls } from "leva";
import { createGlobalStyle } from "styled-components";

const CONSTANTS = {
	height: 200,
	width: (200 / 9) * 16,
};

const FontStyle = createGlobalStyle`
@font-face {
	font-family: "Workbench Web";
	src: url("/Workbench[BLED,SCAN].woff2") format("woff2");
}
`;

interface BlobProps {
	className: string;
	children: React.ReactElement;
}

function Blob({ className, children }: BlobProps) {
	const { scan, bleed } = useControls({
		scan: {
			value: 0,
			min: -53,
			max: 100,
		},
		bleed: {
			value: 0,
			min: 0,
			max: 100,
		},
	});

	const svgPath = getSvgPath({
		width: CONSTANTS.width,
		height: CONSTANTS.height,
		cornerRadius: 50,
		cornerSmoothing: 1,
	});

	return (
		<>
			<FontStyle />
			<div
				className="relative"
				style={{
					height: `${String(CONSTANTS.height)}px`,
					width: `${String(CONSTANTS.width)}px`,
					filter: "drop-shadow(0 0 6px #0A3CCF)",
					fontFamily: '"Workbench Web", monospace',
					fontVariationSettings: `"BLED" ${bleed}, "SCAN" ${scan}`,
				}}
			>
				<svg
					role="presentation"
					width={CONSTANTS.width}
					height={CONSTANTS.height}
					xmlns="http://www.w3.org/2000/svg"
					className="fill-[#0A3CCF] absolute inset-0"
				>
					<defs>
						<radialGradient id="grad">
							<stop offset="0%" stop-color="#3C68EB" />
							<stop offset="100%" stop-color="#0A3CCF" />
						</radialGradient>
						<clipPath id="highlight">
							<circle
								cx={CONSTANTS.width / 2}
								cy={CONSTANTS.height / 2}
								r={CONSTANTS.width}
								id="radial"
							/>
						</clipPath>
					</defs>
					<path d={svgPath} id="squircle" />
					<use clipPath="url(#highlight)" href="#squircle" fill="url(#grad)" />
				</svg>
				<div
					className={`relative ${className}`}
					style={{
						clipPath: `path("${svgPath}")`,
					}}
				>
					{children}
				</div>
			</div>
		</>
	);
}

export default Blob;
