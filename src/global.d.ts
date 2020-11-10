/// <reference types='react' />

declare namespace Txp {
  export interface IProps<T> {
    props?: T;
    style?: React.CSSProperties;
    onClick?: (e: React.MouseEvent) => void;
    onContextMenu?: (e: React.MouseEvent) => void;
  }
  export interface IAntdComp<T> {
    Name: string;
    Config: IFormItemConfig[];
    Comp: (props: IPropsWithChild<T>) => React.ReactElement;
    Preview: (props: IPreviewProps) => React.ReactElement;
    Props: T;
    Style: {};
    Container: boolean;
    Children?: any[];
  }

  export type IDomListContext = IChild[];
  export type ISetDomListContext = React.Dispatch<
    React.SetStateAction<IChild[]>
  >;
  export type ICurrentDomContext = IChild;
  export type ISetCurrentDomContext = React.Dispatch<
    React.SetStateAction<IChild>
  >;

  export interface IPropsWithChild<T> extends IProps<T> {
    children?: React.ReactNode;
  }
  export interface IDomItem<T> extends IAntdComp<T> {
    title: React.ReactNode;
    key: string;
    disabled?: boolean;
    children?: IChild[];
  }
  export interface IPreviewProps {
    children?: React.ReactNode;
    onDragStart: (e: React.DragEvent, name: string) => void;
  }

  export interface ILabelinValue {
    label: string;
    value: string | undefined;
  }

  export interface IFormItemConfig {
    title: string;
    dataIndex: string;
    type: 'Input' | 'Switch' | 'Select' | 'Radio' | 'Textarea' | 'Color';
    defaultValue?: string | boolean;
    options?: string[];
    placeholder?: string;
    required?: boolean;
    requiredMsg?: string;
  }
  export type IChild = Partial<IDomItem<any>>;
}
