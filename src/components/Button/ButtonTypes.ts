export interface ButtonTypes {
  label?: string | React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "LEFT" | "RIGHT" | "";
  onClick?: () => void;
  buttonStyles?: string;
  type?: "submit" | "button";
  loading?: boolean;
  disabled?: boolean;
}
