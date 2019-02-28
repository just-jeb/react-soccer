import {GameContainerDriver} from './Game.container.driver';

describe('Game container test', () => {
  let driver: GameContainerDriver;
  beforeEach(() => {
    driver = new GameContainerDriver();
  });
  it('Should return null when no gameId', () => {
    driver.when.render();
    expect(driver.get.renderedContent()).toBeNull();
  })

  it('Should connect GameContainer component to Redux', () => {

  })
});