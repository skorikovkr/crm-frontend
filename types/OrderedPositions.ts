import type { ExtraWork } from "./ExtraWork";
import type { OrderPosition } from "./OrderPosition";

export type OrderedPositions = {
    total_price: number,
    positions: OrderPosition[],
    extra_works: ExtraWork[]
};