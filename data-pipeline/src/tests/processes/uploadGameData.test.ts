import {beforeAll, expect, describe, jest, test} from '@jest/globals';
import { GameDataProcessor } from '../../processes/gameDataProcessor';
import { liveGameData } from '../__fixtures__/gameData';

const unsuccessfulGetById = jest.fn(async id => null);
const successfulGetById = jest.fn(async id => true);
const mockTeam = {
    tableName: 'Team',
    update: jest.fn(async() => null),
    database: jest.fn(async() => null),
}
const mockGame = {
    tableName: 'Game',
    update: jest.fn(async() => null),
    database: jest.fn(async() => null),
}

describe('DB upload methods in GameDataProcessor', () => {

    test('createTeamIfDoesNotExist creates team if one is not in db', () => {
        const processor = new GameDataProcessor();
        const mockAdd = jest.fn(async () => null);
        processor.teamDb = { ...mockTeam,
            getById: unsuccessfulGetById,
            add: mockAdd
        }

        processor.createTeamIfDoesNotExist({id: 18, name: 'Minnesota Wild'});
        expect(mockAdd.mock.calls).toHaveLength(1);
    });

    test('createTeamIfDoesNotExist does not create a team if one is already in db', () => {
        const processor = new GameDataProcessor();
        const mockAdd = jest.fn(async () => null);
        processor.teamDb = { ...mockTeam,
            getById: successfulGetById,
            add: mockAdd
        }

        processor.createTeamIfDoesNotExist({id: 18, name: 'Minnesota Wild'});
        expect(mockAdd.mock.calls).toHaveLength(0);
    });

    test('createNewGameIfDoesNotExist throws error if game already exists', () => {
        const processor = new GameDataProcessor();
        const mockAdd = jest.fn(async () => null);
        processor.gameDb = { ...mockGame,
            getById: successfulGetById,
            add: mockAdd
        }

        expect(processor.createNewGameIfDoesNotExist).toThrow(Error);
    });

    test('createNewGameIfDoesNotExist creates game if game does not exist', () => {
        const processor = new GameDataProcessor();
        const mockAdd = jest.fn(async () => null);
        processor.gameDb = { ...mockGame,
            getById: unsuccessfulGetById,
            add: mockAdd
        }

        processor.createNewGameIfDoesNotExist(liveGameData);
        expect(mockAdd.mock.calls).toHaveLength(1);
    });

    // test('createPlayerIfDoesNotExist creates player if player does not exist', () => {
        
    // });

    // test('createPlayerIfDoesNotExist creates player if player does not exist', () => {
        
    // });

    // test('createOrUpdatePlayerGameStats creates player if player does not exist', () => {
        
    // });

});