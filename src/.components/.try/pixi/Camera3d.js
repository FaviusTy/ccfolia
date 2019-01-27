import { CustomPIXIComponent } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
import "pixi-projection";

const TYPE = "Camera3d";
export const behavior = {
  customDisplayObject: props => new PIXI.projection.Camera3d(),
  customApplyProps: function(instance, oldProps, newProps) {
    // console.log(instance);
    instance.position.set(640, 360);
    // instance.position3d.set(0, 0, -3000)
    instance.setPlanes(3000, 10, 10000, false);
    instance.interactive = newProps.interactive;
    instance.pointerdown = newProps.pointerdown;
    instance.pointermove = newProps.pointermove;
    instance.pointerup = newProps.pointerup;
    instance.rightupoutside = newProps.rightupoutside;
    instance.pointerout = newProps.pointerout;
    instance.pointercancel = newProps.pointercancel;
    // instance.pivot3d.x = 900
    // instance.y = -900
    // instance.pivot.y = -900

    // instance.setPlanes(400, 10, 10000, false)
    // instance.position.set(newProps.x, newProps.y)
    // instance.setPlanes(1000, 10, 10000, true)

    // instance.euler.y = -Math.PI / 6
    // instance.euler.x = -60
    // instance.euler.z = 1
  }
};

export default CustomPIXIComponent(behavior, TYPE);
