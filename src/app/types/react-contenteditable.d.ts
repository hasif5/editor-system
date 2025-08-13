declare module 'react-contenteditable' {
  import { Component } from 'react';

  interface ContentEditableProps {
    html: string;
    disabled?: boolean;
    onChange: (event: { target: { value: string } }) => void;
    onBlur?: (event: React.FocusEvent) => void;
    onFocus?: (event: React.FocusEvent) => void;
    onKeyUp?: (event: React.KeyboardEvent) => void;
    onKeyDown?: (event: React.KeyboardEvent) => void;
    className?: string;
    style?: React.CSSProperties;
    tagName?: string;
    innerRef?: React.RefObject<HTMLElement> | ((ref: HTMLElement | null) => void);
  }

  export default class ContentEditable extends Component<ContentEditableProps> {}
}
