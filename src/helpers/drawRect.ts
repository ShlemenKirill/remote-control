import robot from 'robotjs';

const drawRect = (x: number, y: number): void => {
	const mouse = robot.getMousePos();

	robot.mouseToggle('down');
	for (let i = 0; i < x; i++) {
		robot.dragMouse(mouse.x + i, mouse.y);
	}
	for (let i = 0; i < y; i++) {
		robot.dragMouse(mouse.x + x, mouse.y + i);
	}
	for (let i = 0; i < x; i++) {
		robot.dragMouse(mouse.x + x - i, mouse.y + y);
	}
	for (let i = 0; i < y; i++) {
		robot.dragMouse(mouse.x, mouse.y + y - i);
	}
	robot.mouseToggle('up');
};

export default drawRect;
