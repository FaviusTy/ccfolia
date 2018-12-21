/* ================================
It is not used but as a document
================================ */

// Elements
interface Image {
  url: string
}

interface Media {
  url: string
  muted: boolean
  loop: boolean
  volume: number
}

interface VisualItem {
  id: string
  images: Array<Image>
  current: number
  w: number
  h: number
  x: number
  y: number
}

interface EffectItem {
  id: string
  image: Image
  media: Media
  delay: number,
  w: number
  h: number
  x: number
  y: number
}

// Records
interface User {
  id: string
  name: string
  image: Image
}

interface Asset {
  id: string
  owner: string
  public: boolean
}

interface ChatPalet {
  id: string
  name: string
  raw: string
  order: number
}

interface Table {
  id: string
  name: string
  text: string
  background: Image
  floor: Image
  media: Media
  objects: Array<VisualItem>
  panels: Array<VisualItem>
  effects: Array<EffectItem>
  datasheats: Array<DataSheat>
  memo: Array<Memo>
  timestamp: number
  order: number
}

interface Piece {
  id: string,
  datasheat: DataSheat,
  panel: Panel
}

interface Effect {
  id: string
  image: Image
  media: Media
  type: string
  order: number
}

interface Panel {
  id: string
  images: Array<Image>
  order: number
}

interface Piece {
  id: string
  image: Array<Image>
  order: number
}

interface Message {
  id: string
  name: string
  text: string
  timestamp: number
  order: number
}

interface DataSheat {
  id: string
  name: string
  // rows: Array<Row>
  raw: string
  order: number
}

interface Memo {
  id: string
  text: string
  order: number
}

