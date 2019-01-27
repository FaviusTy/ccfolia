import React, {
  memo,
  useState,
  useLayoutEffect,
  useCallback,
  useMemo,
  useRef
} from "react";
import * as PIXI from "pixi.js";
import { Stage, Sprite, Container, Graphics } from "react-pixi-fiber";
import Rect from "../pixi/Rect";
import Camera3d from "../pixi/Camera3d";
import Container3d from "../pixi/Container3d";
import Sprite3d from "../pixi/Sprite3d";
import Container2d from "../pixi/Container2d";
import Sprite2d from "../pixi/Sprite2d";
import styles from "./styles/Screen.module.css";

// Ticker
const ticker = PIXI.ticker.shared;
ticker.autoStart = false;
ticker.stop();

let timer = null;
const render = (duration = 3000) => {
  ticker.start();
  clearTimeout(timer);
  timer = setTimeout(() => {
    ticker.stop();
  }, duration);
};

const blur = 10;
const blurFilter = new PIXI.filters.BlurFilter();
blurFilter.blur = blur;

const centerAnchor = new PIXI.Point(0.5, 0.5);
const hitArea = new PIXI.Rectangle(-1500, -1500, 3000, 3000);

const Screen = ({ objects, background, w, h, onChangeObject }) => {
  useLayoutEffect(() => {
    render(1000);
  });
  const containerRef = useRef();
  const cameraRef = useRef();
  const stageRef = useRef();
  const center = useMemo(() => {
    return [~~(w * -0.5), ~~(h * -0.5)];
  }, [w, h]);
  const [target, setTarget] = useState();
  const onTouchStart = useCallback(
    e => {
      if (e.target) {
        e.stopPropagation();
        const pos = e.data.getLocalPosition(e.target.parent);
        const target = {
          id: e.target.id,
          el: e.target,
          parent: e.target.parent,
          sx: e.target.x,
          sy: e.target.y,
          tx: pos.x,
          ty: pos.y
        };
        setTarget(target);
      }
    },
    [setTarget]
  );
  let timer = null;
  const onTouchMove = useCallback(
    e => {
      if (target) {
        e.stopPropagation();
        const pos = e.data.getLocalPosition(target.parent);
        target.el.x = target.sx + pos.x - target.tx;
        target.el.y = target.sy + pos.y - target.ty;
        clearTimeout(timer);
        render(1000);
      } else {
        // cameraRef.current.euler.x += 0.02
        // cameraRef.current.position3d.z -= 10
        // render(1000)
      }
    },
    [target, setTarget]
  );
  const onTouchEnd = useCallback(
    e => {
      if (!target) return;
      e.stopPropagation();
      if (target.id) {
        onChangeObject({
          id: target.id,
          x: target.el.x,
          y: target.el.y
        });
      }
      setTarget(null);
    },
    [onChangeObject, target, setTarget]
  );
  const [width, height, row, col, span] = [60, 60, 30, 30, 8];
  return (
    <div className={styles.wrap}>
      <Stage
        ref={stageRef}
        className={styles.stage}
        width={w}
        height={h}
        options={{
          transparent: true,
          autoStart: false,
          sharedTicker: true,
          autoResize: true
        }}
      >
        <Camera3d
          x={0}
          y={0}
          ref={cameraRef}
          pointerdown={onTouchStart}
          pointermove={onTouchMove}
          pointerup={onTouchEnd}
          interactive
        >
          <Container3d
            x={0}
            y={0}
            ref={containerRef}
            interactive
            // pointerdown={onTouchStart}
            // pointermove={onTouchMove}
            // pointerup={onTouchEnd}
            // pointerupoutside={onTouchEnd}
          >
            <Sprite3d
              buttonMode
              texture={PIXI.Texture.WHITE}
              interactive
              x={0}
              y={0}
              width={1800}
              height={1800}
            />
            <Sprite
              buttonMode
              texture={PIXI.Texture.fromImage("/bg.jpg")}
              interactive
              x={0}
              y={0}
              width={100}
              height={100}
            />
          </Container3d>
        </Camera3d>

        {/* <Container
        ref={containerRef}
        interactive
        pointerdown={onTouchStart}
        pointermove={onTouchMove}
        pointerup={onTouchEnd}
        pivot={center}
      >
        <Container interactive hitArea={hitArea} scale={0.5}>
          <Field row={30} col={30} width={60} height={60} span={8} />
          <Rect
            lineColor={0xFFFFFF}
            lineWidth={4}
            width={3000}
            height={3000}
            x={-1500}
            y={-1500}
          />
          {Object.keys(objects).map((id) => {
            const { url, x, y, w, h } = objects[id]
            return <Sprite
              buttonMode
              id={id}
              key={id}
              texture={PIXI.Texture.fromImage(url)}
              x={x}
              y={y}
              width={w}
              height={h}
              interactive
              anchor={centerAnchor}
            />
          })}
        </Container>
      </Container> */}
      </Stage>
    </div>
  );
};

export default memo(Screen);
