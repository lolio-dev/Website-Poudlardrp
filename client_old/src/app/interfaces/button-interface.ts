import { ButtonTypes } from '../enums/Button/ButtonTypes';
import { Sizes } from '../enums/Sizes';
import { Colors } from '../enums/Colors';

export interface Button {
  type: ButtonTypes,
  size: Sizes,
  color: Colors,
  isRounded: boolean
  label: string,
}
