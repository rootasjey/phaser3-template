import Phaser from 'phaser';

export const KEY = 'MAIN';

export class Scene extends Phaser.Scene {
  private context: { [key: string]: any } = {};

  constructor() {
    super({ key: KEY });
  }

  renderLevel (key: string): void {
    this.context.map = this.make.tilemap({ key: `level:${key}`, tileWidth: 16, tileHeight: 16 });

    const background = this.context.map.properties.find(({ name }) => name === 'background');
    this.context.background = this.add.tileSprite(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      this.context.map.widthInPixels,
      this.context.map.heightInPixels,
      `background:${background.value}`,
    );

    this.context.tileset = this.context.map.addTilesetImage('tileset');
    this.context.tiles = this.context.map.createStaticLayer('terrain', this.context.tileset, 0, 0);
    this.context.tiles.setCollisionByProperty({ collides: true });
    this.context.tiles.forEachTile((tile) => {
      if (tile.properties['jump-through'] === true) {
        tile.collideDown = false;
        tile.collideLeft = false;
        tile.collideRight = false;
      }
    });
  }

  create(): void {
    this.renderLevel('1');
  }

  update(): void {
    this.context.background.tilePositionY -= 0.5;
  }
}
