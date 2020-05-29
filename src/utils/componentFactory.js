const SCREEN_WIDTH = 250
const SCREEN_MARGIN = 12

export class ImageFactory {
  constructor(posX = 12, posY = 12) {
    this.name = 'Image';
    this.type = 'Image';
    this.config = {
      content: {
        fileData: 'https://images.unsplash.com/photo-1590374585152-ca0e8194c0d6?auto=format&fit=crop&w=500&q=80',
        fileName: 'Office.jpg'
      },
      dimension: {
        width: `${SCREEN_WIDTH - (SCREEN_MARGIN * 2)}px`,
        height: `${(SCREEN_WIDTH - (SCREEN_MARGIN * 2)) * (4 / 3)}px`
      },
      positioning: {
        posX: `${posX}px`,
        posY: `${posY}px`
      }
    };
  }
}
 