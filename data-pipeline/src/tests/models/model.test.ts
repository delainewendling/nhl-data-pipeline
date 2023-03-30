import NHLDatabaseManager from '../../db/dbManager';
import {Model} from '../../models';

describe("Model", () => {
    const model = new Model();
  
    test("has update() method", () => {
      expect(typeof model.update).toBe("function");
    });

    test("has update() method", () => {
        expect(typeof model.getById).toBe("function");
    });

    test("has database property", () => {
        expect(typeof model.database).toBe(NHLDatabaseManager);
      });
  
  });