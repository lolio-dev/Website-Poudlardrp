export interface CreateCartResultDto {
  result: Record<string, any>;
  quantityOwned?: number;
  quantityAvailable?: number;
  isAvailable: boolean;
}
