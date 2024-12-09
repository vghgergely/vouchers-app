import { renderHook, act } from '@testing-library/react';
import useDelayedState from './useDelayedState';

jest.useFakeTimers();

describe('useDelayedState', () => {
  test('should initialize with the initial value', () => {
    const { result } = renderHook(() => useDelayedState(false));
    const [value] = result.current;
    expect(value).toBe(false);
  });

  test('should update the value immediately', () => {
    const { result } = renderHook(() => useDelayedState(false));
    const [, setValue] = result.current;

    act(() => {
      setValue(true);
    });

    const [value] = result.current;
    expect(value).toBe(true);
  });

  test('should reset the value after the delay', () => {
    const { result } = renderHook(() => useDelayedState(false, 3000));
    const [, setValue] = result.current;

    act(() => {
      setValue(true);
    });

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    const [value] = result.current;
    expect(value).toBe(false);
  });

  test('should clear the timeout on unmount', () => {
    const { result, unmount } = renderHook(() => useDelayedState(false, 3000));
    const [, setValue] = result.current;

    act(() => {
      setValue(true);
    });

    unmount();

    act(() => {
      jest.advanceTimersByTime(3000);
    });
  });

  test('should clear the previous timeout when setting a new value', () => {
    const { result } = renderHook(() => useDelayedState(false, 3000));
    const [, setValue] = result.current;

    act(() => {
      setValue(true);
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    act(() => {
      setValue(false);
    });

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    const [value] = result.current;
    expect(value).toBe(false);
  });
});