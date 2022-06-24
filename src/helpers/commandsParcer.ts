import robot from 'robotjs';
import drawCircle from "./drawCircle";
import drawSquare from "./drawSquare";
import printScreen from "./printScreen";
const commandsParser = async (command: string) => {
	const { x, y } = robot.getMousePos();
	if (command.startsWith('mouse_up')) {
		const [comm, value] = command.split(' ');
		robot.moveMouse(x, y - Number(value));
	} else if (command.startsWith('mouse_position')) {
		return `${x},${y}`
	}else if (command.startsWith('mouse_down')) {
		const [comm, value] = command.split(' ');
		robot.moveMouse(x, y + Number(value));
	} else if (command.startsWith('mouse_left')) {
		const [comm, value] = command.split(' ');
		robot.moveMouse(x - Number(value), y);
	} else if (command.startsWith('mouse_right')) {
		const [comm, value] = command.split(' ');
		robot.moveMouse(x + Number(value), y);
	} else if (command.startsWith('draw_circle')) {
		const [comm, radius] = command.split(' ');
		robot.moveMouse(x, y);
		robot.mouseToggle('down');
        drawCircle(Number(radius));
		robot.mouseToggle('up');
	} else if (command.startsWith('draw_square')) {
        const [comm, radius] = command.split(' ');
        robot.moveMouse(x, y);
        robot.mouseToggle('down');
        drawSquare(Number(radius));
        robot.mouseToggle('up');
	} else if (command.startsWith('draw_rectangular')) {
		const [comm, value] = command.split(' ');
		robot.moveMouse(x + Number(value), y);
	}else if (command.startsWith('prnt_scrn')) {
        const image = await printScreen(x, y, 200, 200)
        const base64 = await image.getBase64Async(image.getMIME())
        return base64.substring(22)
    }
};

export default commandsParser;
