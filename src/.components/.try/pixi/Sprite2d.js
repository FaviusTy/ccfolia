import { CustomPIXIComponent } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
import "pixi-projection";

const TYPE = "Sprite2d";
export const behavior = {
  customDisplayObject: ({ texture }) => {
    return new PIXI.projection.Sprite2d(texture);
  },
  customApplyProps: function(instance, oldProps, newProps) {
    instance.width = newProps.width;
    instance.height = newProps.height;
    // console.log(instance);
    instance.x = newProps.x;
    instance.y = newProps.y;
    instance.anchor.set(0.5, 0.0);
  }
};

export default CustomPIXIComponent(behavior, TYPE);
