import { ActionGetterFilter, GameAction, PaginatedResult, PaginationConfig, Ship, ShipsGetterFilter, SortConfig } from "../../model";

export type CellShipsGetter = (filter: ShipsGetterFilter, paginationConfig?: PaginationConfig) => Promise<PaginatedResult<Ship>>;
export type ActionHistoryGetter = (filter: ActionGetterFilter, sortConfig: SortConfig, paginationConfig?: PaginationConfig) => Promise<PaginatedResult<GameAction>>;