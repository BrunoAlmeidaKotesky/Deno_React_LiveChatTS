
export type REvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;
export type RDispatch<S> = React.Dispatch<React.SetStateAction<S>>; 
export type RTarget = EventTarget & HTMLInputElement;
export type RForm = React.FormEvent<HTMLFormElement>;