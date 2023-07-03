export interface UpdateCartResultDto {
  result: Record<string, any>;
  quantityOwned?: number;
  quantityAvailable?: number;
  isAvailable: boolean;
  totalCartPrice: number;
  totalPrice: number;
}
