import { render, RenderResult } from '@testing-library/react';
import { NumberInput } from "./number-input";
import { expect } from "vitest";
import { act } from "react-dom/test-utils";

const getValue = (result: RenderResult) => {
  return result.getByTestId("value").textContent;
};

describe('number input element', () => {
  describe('rendering number input', () => {
    it('should be render with good default value', () => {
      const defaultValue = 5;

      const result = render(<NumberInput defaultValue={defaultValue} onChange={() => undefined}/>);
      expect(getValue(result)).toBe(defaultValue.toString());
    });

    it('should be increase when the + btn is clicked with no step value', () => {
      const result = render(<NumberInput defaultValue={5} onChange={() => undefined}/>);

      const increment = result.getByTestId("increment");
      expect(getValue(result)).toBe((5).toString());
      act(() => {
        increment.click();
      })
      expect(getValue(result)).toBe((6).toString());
    });

    it('should be decrease when the - btn is clicked with no step value', () => {
      const result = render(<NumberInput defaultValue={5} onChange={() => undefined} min={1}/>);
      const increment = result.getByTestId("decrement");
      expect(getValue(result)).toBe((5).toString());
      act(() => {
        increment.click();
      })
      expect(getValue(result)).toBe((4).toString());
    });

    it('should be increase when the + btn is clicked with step value', () => {
      const step = 5;
      const defaultValue = 5;
      const result = render(<NumberInput defaultValue={5} onChange={() => undefined} step={step}/>);
      const increment = result.getByTestId("increment");
      expect(getValue(result)).toBe((defaultValue).toString());
      act(() => {
        increment.click();
      })
      expect(getValue(result)).toBe((defaultValue + step).toString());
    });

    it('should be decrease when the - btn is clicked with step value', () => {
      const step = 5;
      const defaultValue = 10;
      const result = render(<NumberInput defaultValue={defaultValue} onChange={() => undefined} step={step}/>);
      const increment = result.getByTestId("decrement");
      expect(getValue(result)).toBe(defaultValue.toString());
      act(() => {
        increment.click();
      })
      expect(getValue(result)).toBe((defaultValue - step).toString());
    });

    it('should emit the new value when increment', () => {
      let emitedValue;
      const result = render(<NumberInput defaultValue={1} onChange={(value) => emitedValue = value}/>);
      act(() => {
        result.getByTestId("increment").click();
      })
      const value = getValue(result);
      expect(emitedValue).toBe(parseInt(value!));
    });

    it('should emit the new value when decrement', () => {
      let emitedValue;
      const result = render(<NumberInput defaultValue={5} onChange={(value) => emitedValue = value}/>);
      act(() => {
        result.getByTestId("decrement").click();
      })
      act(() => {
        result.getByTestId("decrement").click();
      })
      const value = getValue(result);
      expect(emitedValue).toBe(parseInt(value!));
    });
  });
});
