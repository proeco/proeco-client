import { VFC, ComponentProps, MouseEvent } from 'react';
import { Icon } from '..';
import { BootstrapColor } from '~/interfaces/variables';

type Props = {
  isActive?: boolean;
  disabled?: boolean;
  isRemovePadding?: boolean;
  text?: string;
  color: BootstrapColor;
  activeColor: BootstrapColor;
  buttonSize?: 'sm' | 'lg';
  buttonColor?: BootstrapColor;
  onClickButton?: (e: MouseEvent<HTMLButtonElement>) => void;
} & ComponentProps<typeof Icon>;

export const IconButton: VFC<Props> = ({
  size,
  isActive,
  disabled,
  isRemovePadding = false,
  icon,
  text,
  color,
  activeColor,
  buttonColor,
  buttonSize,
  onClickButton,
}) => {
  const textColor = isActive ? activeColor : color;

  const handleClickButton = (e: MouseEvent<HTMLButtonElement>) => {
    if (onClickButton != null) {
      onClickButton(e);
    }
  };

  const btnClassName: string[] = ['btn', 'px-2', 'border-0'];
  if (buttonSize != null) {
    btnClassName.push(`btn-${buttonSize}`);
  }
  if (buttonColor != null) {
    btnClassName.push(`btn-${BootstrapColor[buttonColor]}`);
  }
  if (disabled) {
    btnClassName.push('disabled');
  }
  if (isRemovePadding) {
    btnClassName.push('py-0');
  }

  return (
    <button className={btnClassName.join(' ')} onClick={handleClickButton}>
      <Icon size={size} icon={icon} color={textColor} />
      {text && <span className={`ms-2 text-${BootstrapColor[textColor]}`}>{text}</span>}
    </button>
  );
};
