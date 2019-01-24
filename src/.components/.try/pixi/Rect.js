import { CustomPIXIComponent } from 'react-pixi-fiber'
import * as PIXI from 'pixi.js'

const TYPE = 'Rect'
export const behavior = {
  customDisplayObject: props => new PIXI.Graphics(),
  customApplyProps: function (instance, oldProps, newProps) {
    const { lineWidth = 1, lineColor, fill, x, y, width, height } = newProps
    instance.clear()
    lineColor && instance.lineStyle(lineWidth, lineColor)
    fill && instance.beginFill(fill)
    instance.drawRect(x, y, width, height)
    fill && instance.endFill()
  }
}

export default CustomPIXIComponent(behavior, TYPE)