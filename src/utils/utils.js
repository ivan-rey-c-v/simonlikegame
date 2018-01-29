export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const addThenRemoveClass = async (node , className, ms) => {
	node.classList.add(className);
	await sleep(ms);
	node.classList.remove(className);
	return node;
}