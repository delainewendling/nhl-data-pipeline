import {Game} from '../../models';

describe("Game", () => {
  const game = new Game();

  test("has add() method", () => {
    expect(typeof game.add).toBe("function");
  });

  test("has correct tableName property", () => {
    expect(game.tableName).toBe('Game');
  });

  test("calls getById with correct query", () => {
    const game = new Game();
    const mockQuery = jest.fn();
    const mockDb = {
        query: mockQuery
    }
    game.database = mockDb;
    const gameId = 18;

    game.getById(gameId);
    
    expect(mockQuery.mock.calls[0]).toStrictEqual(['SELECT * FROM Game WHERE id = 18']);
  });

});