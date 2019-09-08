export interface IMovie{
    id: string;
    rank: string;
    title: string;
}


export interface ILetter{
    value: string;
    chosenRandomly: boolean;
    isSelected: boolean;
}


export interface IWord{
    value: string;
    length: number;
    letters: ILetter[];
}
