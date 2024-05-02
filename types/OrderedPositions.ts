import type { OrderPosition } from "./OrderPosition";

export type OrderedPositions = {
    total_price: number,
    positions: OrderPosition[]
};