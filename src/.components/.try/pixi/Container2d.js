import { CustomPIXIComponent } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
import "pixi-projection";

const ticker = PIXI.ticker.shared;

const TYPE = "Container2d";
export const behavior = {
  customDisplayObject: props => new PIXI.projection.Container2d(),
  customApplyProps: function(instance, oldProps, newProps) {
    instance.position.set(-900, -900);
    // const squarePlane = new PIXI.projection.Sprite2d(PIXI.Texture.WHITE)
    ticker.add(() => {
      const pos = instance.toLocal(
        new PIXI.Point(900, -900),
        undefined,
        undefined,
        undefined,
        PIXI.projection.TRANSFORM_STEP.BEFORE_PROJ
      );
      instance.proj.setAxisY(pos, 1);
    });

    // ang += 0.01;
    // instance.euler.y = 0.02;
    // instance.euler.x = -Math.PI / 6;
  }
};

export default CustomPIXIComponent(behavior, TYPE);
