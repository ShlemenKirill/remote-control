import robot from "robotjs";

const drawSquare  = (radius: number) => {
    const mousePos = robot.getMousePos();
    robot.dragMouse(mousePos.x + radius, mousePos.y)
    robot.dragMouse(mousePos.x + radius, mousePos.y + radius)
    robot.dragMouse(mousePos.x, mousePos.y + radius)
    robot.dragMouse(mousePos.x, mousePos.y)
}

export default drawSquare
