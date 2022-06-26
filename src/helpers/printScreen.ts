import Jimp from 'jimp';
import { screen } from 'robotjs';

const printScreen = (x: number, y: number, width: number, height: number) => {
	const screenCapture = screen.capture(x, y, width, height);
	const jimpImage = new Jimp(screenCapture.width, screenCapture.height);
	let position = 0;
	return jimpImage.scan(0, 0, jimpImage.bitmap.width, jimpImage.bitmap.height, (x, y, idx) => {
		jimpImage.bitmap.data[idx + 2] = screenCapture.image.readUInt8(position++);
		jimpImage.bitmap.data[idx + 1] = screenCapture.image.readUInt8(position++);
		jimpImage.bitmap.data[idx + 0] = screenCapture.image.readUInt8(position++);
		jimpImage.bitmap.data[idx + 3] = screenCapture.image.readUInt8(position++);
	});
};

export default printScreen;
