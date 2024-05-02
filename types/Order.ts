import type { OrderedPositions } from "./OrderedPositions";

export interface Order {
    id: string|number,
    name: string,
    address: string,
    version: number,
    organization_id: string|number,
    version_of: string|number|null|undefined,
    calculator_id: string|number,
    order_status_id: string|number,
    manager_id: string|number,
    client_id: string|number,
    order_position_document_src: string,
    price: number,
    code_from_factory: string,
    cost_estimate_file_src: string,
    created_at: string,
    positions: OrderedPositions
}