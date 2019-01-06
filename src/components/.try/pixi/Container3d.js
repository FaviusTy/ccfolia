import { CustomPIXIComponent } from 'react-pixi-fiber'
import * as PIXI from 'pixi.js'
import 'pixi-projection'

const TYPE = 'Container3d'
export const behavior = {
  customDisplayObject: props => new PIXI.projection.Container3d(),
  customApplyProps: function (instance, oldProps, newProps, eulerX) {
    // instance.position.set(newProps.x, newProps.y)
    // ang += 0.01;
    // instance.euler.y = 0.02;
    // instance.affine = PIXI.projection.AFFINE.AXIS_X
    // instance.anchor.x = 0.5
    // console.log(instance)
    // instance.pivot.set(0, -1500)
    instance.euler.x = eulerX || 0
    instance.interactive = true //newProps.interactive
    instance.pointerdown = newProps.pointerdown
    instance.pointermove = newProps.pointermove
    instance.pointerup = newProps.pointerup
    // instance.scale = newProps.scale || 1
    // instance.y = -900
    // instance.pivot.y = 900
    // instance.pointerleave = newProps.pointerup
          // ref={containerRef}
          // interactive
          // pointerdown={onTouchStart}
          // pointermove={onTouchMove}
          // pointerup={onTouchEnd}
          // pivot={center}
    return newProps
  }
}

export default CustomPIXIComponent(behavior, TYPE)