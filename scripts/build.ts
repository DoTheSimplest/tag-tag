import esbuild from "esbuild";

await esbuild.build({
	entryPoints: ["src/index.ts"],
	outfile: "dist/bundle.min.js",
	bundle: true,
	minify: true,
	format: "esm",
});
