import {Team} from '../../models';

describe("Team", () => {
  const team = new Team();

  test("has add() method", () => {
    expect(typeof team.add).toBe("function");
  });

  test("has correct tableName property", () => {
    expect(team.tableName).toBe('Team');
  });

  test("calls getById with correct query", () => {
    const team = new Team();
    const mockQuery = jest.fn(() => Promise.resolve());
    const mockDb = {
        query: mockQuery
    }
    team.database = mockDb;
    const playerGameStatsId = 56;

    team.getById(playerGameStatsId);
    
    expect(mockQuery.mock.calls[0]).toStrictEqual(['SELECT * FROM Team WHERE id = 56']);
  });

});
