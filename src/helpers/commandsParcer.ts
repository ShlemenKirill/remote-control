import robot from 'robotjs';
import drawCircle from './drawCircle';
import printScreen from './printScreen';
import drawRect from './drawRect';

const commandsParser = async (command: string) => {
	const { x, y } = robot.getMousePos();
	if (command.startsWith('mouse_up')) {
		const [comm, value] = command.split(' ');
		robot.moveMouse(x, y - Number(value));
		return command;
	} else if (command.startsWith('mouse_position')) {
		return `${command} ${x},${y}`;
	} else if (command.startsWith('mouse_down')) {
		const [comm, value] = command.split(' ');
		robot.moveMouse(x, y + Number(value));
		return command;
	} else if (command.startsWith('mouse_left')) {
		const [comm, value] = command.split(' ');
		robot.moveMouse(x - Number(value), y);
		return command;
	} else if (command.startsWith('mouse_right')) {
		const [comm, value] = command.split(' ');
		robot.moveMouse(x + Number(value), y);
		return command;
	} else if (command.startsWith('draw_circle')) {
		const [comm, radius] = command.split(' ');
		drawCircle(Number(radius));
		return command;
	} else if (command.startsWith('draw_square')) {
		const [comm, radius] = command.split(' ');
		drawRect(Number(radius), Number(radius));
		return command;
	} else if (command.startsWith('draw_rectangle')) {
		const [comm, width, length] = command.split(' ');
		drawRect(Number(width), Number(length));
		return command;
	} else if (command.startsWith('prnt_scrn')) {
		const image = await printScreen(x, y, 200, 200);
		const base64 = await image.getBase64Async(image.getMIME());
		return `${command} ${base64.substring(22)}`;
	}
};

export default commandsParser;
