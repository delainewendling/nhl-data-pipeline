import {beforeAll, expect, describe, jest, test} from '@jest/globals';
import { GameDataProcessor } from '../../processes/gameDataProcessor';
import { liveGameData, finalGameData } from '../__fixtures__/gameData';

const unsuccessfulGetById = jest.fn(async id => null);
const successfulGetById = jest.fn(async id => true);


describe('DB upload methods in GameDataProcessor', () => {

    beforeAll(()=> {
        jest.clearAllMocks();
    })

    test('createTeamIfDoesNotExist creates team if one is not in db', () => {
        const processor = new GameDataProcessor();
        const addSpy = jest.spyOn(processor.gameDb, 'add').mockImplementation(() => Promise.resolve())
        processor.gameDb.getById = unsuccessfulGetById;

        processor.createTeamIfDoesNotExist({id: 18, name: 'Minnesota Wild'});
        expect(addSpy).toHaveBeenCalledTimes(1);
    });

    test('createTeamIfDoesNotExist does not create a team if one is already in db', () => {
        const processor = new GameDataProcessor();
        const addSpy = jest.spyOn(processor.gameDb, 'add').mockImplementation(() => Promise.resolve());
        processor.gameDb.getById = successfulGetById;

        processor.createTeamIfDoesNotExist({id: 18, name: 'Minnesota Wild'});
        expect(addSpy).toHaveBeenCalledTimes(0);
    });

    test('createNewGameIfDoesNotExist throws error if game already exists', () => {
        const processor = new GameDataProcessor();
        processor.gameDb.getById = successfulGetById;
        processor.gameDb.add = jest.fn();

        expect(processor.createNewGameIfDoesNotExist).toThrow(Error);
    });

    test('createNewGameIfDoesNotExist creates game if game does not exist', () => {
        const processor = new GameDataProcessor();
        const addSpy = jest.spyOn(processor.gameDb, 'add').mockImplementation(() => Promise.resolve());
        processor.gameDb.getById = unsuccessfulGetById

        processor.createNewGameIfDoesNotExist(liveGameData);
        expect(addSpy).toHaveBeenCalledTimes(1);
    });

    test('updateGameData updates endTime property if it exists', () => {
        const processor = new GameDataProcessor();
        processor.createPlayerIfDoesNotExist = jest.fn();
        processor.createOrUpdatePlayerGameStats = jest.fn();
        const updateSpy = jest.spyOn(processor.gameDb, 'update').mockImplementation(() => Promise.resolve());
        processor.gameDb.getById = unsuccessfulGetById;

        processor.createNewGameIfDoesNotExist(finalGameData);
        expect(updateSpy).toHaveBeenCalledWith(
            finalGameData.gamePk, 
            {'end_date_time': '2023-03-29T01:35:01Z'}
        );
        expect(processor.endTime).toBe('2023-03-29T01:35:01Z')
    });

});