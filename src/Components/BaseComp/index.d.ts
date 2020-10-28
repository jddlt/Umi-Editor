export interface ITxpComp {
  Name: string;
  Comp: React.ReactNode | Element;
  Config: Record<keyof any, any>;
  Container?: boolean;
}

interface IDomList {
  Name: string;
  Comp: React.ReactNode;
  Container?: boolean;
}
