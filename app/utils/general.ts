export function title(t?: string) {
	if (t) return { title: `${t} — Find Types` };
	return { title: "Find Types" };
}
