import {Player, PlayerGameStats} from '../../models';

describe("Player", () => {
  const player = new Player();

  test("has add() method", () => {
    expect(typeof player.add).toBe("function");
  });

  test("has correct tableName property", () => {
    expect(player.tableName).toBe('Player');
  });

  test("calls getById with correct query", () => {
    const player = new Player();
    const mockQuery = jest.fn();
    const mockDb = {
        query: mockQuery
    }
    player.database = mockDb;
    const playerId = 22;

    player.getById(playerId);
    
    expect(mockQuery.mock.calls[0]).toStrictEqual(['SELECT * FROM Player WHERE id = 22']);
  });

});

describe("PlayerGameStats", () => {
    const playerGameStats = new PlayerGameStats();
  
    test("has add() method", () => {
      expect(typeof playerGameStats.add).toBe("function");
    });
  
    test("has correct tableName property", () => {
      expect(playerGameStats.tableName).toBe('PlayerGameStats');
    });

    test("calls getById with correct query", () => {
        const playerGameStats = new PlayerGameStats();
        const mockQuery = jest.fn(() => Promise.resolve());
        const mockDb = {
            query: mockQuery
        }
        playerGameStats.database = mockDb;
        const playerGameStatsId = 43;
    
        playerGameStats.getById(playerGameStatsId);
        
        expect(mockQuery.mock.calls[0]).toStrictEqual(['SELECT * FROM PlayerGameStats WHERE id = 43']);
    });

    test("calls update with correct query", () => {
        const playerGameStats = new PlayerGameStats();
        const mockQuery = jest.fn(() => Promise.resolve());
        const mockDb = {
            query: mockQuery,
            close: jest.fn(() => Promise.resolve())
        }
        playerGameStats.database = mockDb;
        const playerGameStatsId = 23;
        const updates = {'penalty_minutes': 4, assists: 2, goals: 1 }

        playerGameStats.update(playerGameStatsId, updates);
        
        expect(mockQuery.mock.calls[0]).toStrictEqual(['UPDATE PlayerGameStats SET penalty_minutes = 4, assists = 2, goals = 1 WHERE id = 23']);
    });
  
  });