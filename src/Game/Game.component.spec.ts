import {GameComponentDriver} from './Game.component.driver';


describe('Game component test', () => {
  let driver: GameComponentDriver;
  beforeEach(() => {
    driver = new GameComponentDriver();
  });

  it('Should trigger save on Save button click', () => {
    driver.when.render().when.clickOnSave();
    expect(driver.get.saveClickSpy()).toHaveBeenCalledTimes(1);
  });
});