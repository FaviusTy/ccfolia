import { CustomPIXIComponent } from 'react-pixi-fiber'
import * as PIXI from 'pixi.js'
import 'pixi-projection'

const TYPE = 'Sprite3d'
export const behavior = {
  customDisplayObject: ({ texture }) => {
    return new PIXI.projection.Sprite2s(texture)
  },
  customApplyProps: function (instance, oldProps, newProps) {
    instance.width = newProps.width
    instance.height = newProps.height
    // console.log(instance);
    instance.interactive = newProps.interactive
    instance.buttonMode = newProps.buttonMode
    instance.pointerdown = newProps.pointerdown
    instance.pointermove = newProps.pointermove
    instance.pointerup = newProps.pointerup
    instance.rightupoutside = newProps.rightupoutside
    instance.pointerout = newProps.pointerout
    instance.pointercancel = newProps.pointercancel
    // instance.anchor.set(0.5, 0.5)
    if (instance.x === 0 && instance.y === 0) {
      instance.x = newProps.x || 0
      instance.y = newProps.y || 0
    }
    // instance.euler.x = 30
  }
}

export default CustomPIXIComponent(behavior, TYPE)