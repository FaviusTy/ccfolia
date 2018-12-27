import { CustomPIXIComponent } from 'react-pixi-fiber'
import * as PIXI from 'pixi.js'

console.log(PIXI.mesh.NineSlicePlane);


const TYPE = 'Plane'
export const behavior = {
  customDisplayObject: props => new PIXI.mesh.NineSlicePlane(
    PIXI.Texture.from('/bg.jpg'),
    15,
    15,
    15,
    15
  ),
  customApplyProps: function (instance, oldProps, newProps) {
    // instance.position.set(300 / 2, 300);
  }
};

export default CustomPIXIComponent(behavior, TYPE)