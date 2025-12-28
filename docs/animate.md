# `animate`

```typescript
import { button } from "tagu-tagu";

function AnimateExample() {
	return button(
		"Animating",
		{ css: { width: "200px", height: "100px" } },
		{
			css: { width: "300px", height: "300px" },
			animate: 1000,
		},
		{ css: { width: "100px" }, animate: 2000 },
		"Finished",
	);
}

document.body.appendChild(AnimateExample());
```