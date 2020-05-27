export class ImageFactory {
  constructor(
    name = 'Image',
    type = 'Image',
    screenWidth = 250,
    screenMargin = 12
  ) {
    this.name = name;
    this.type = type;
    this.config = {
      content: {
        fileData: 'https://images.unsplash.com/photo-1590374585152-ca0e8194c0d6?auto=format&fit=crop&w=500&q=80',
        fileName: 'Office.jpg'
      },
      dimension: {
        width: `${screenWidth - (screenMargin * 2)}px`,
        height: `${(screenWidth - (screenMargin * 2)) * (4 / 3)}px`
      },
      positioning: {
        posX: '12px',
        posY: '12px'
      }
    };
  }
}
 