

export interface IImageSliderProps{
    config: Array<IImageSliderItem>
}

export interface IImageSliderItem{
    id: number;
    label: string;
    imgSrc: string;
    alt: string;
}