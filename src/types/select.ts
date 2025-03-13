export interface SelectProps<T> {
    children: React.ReactNode;
    value?: T;
    onChange?: (value: T) => void;
  }