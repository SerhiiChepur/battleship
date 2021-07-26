import { ShipBase } from './ShipBase.model';

export class Ship extends ShipBase{
    public readonly shipId!: number;
    public readonly shipOwnerId!: number;
}