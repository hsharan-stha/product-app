import {FilterPipe} from './filter.pipe';

describe('FilterPipe', () => {

  let pipe: FilterPipe;

  beforeEach(() => {
    pipe = new FilterPipe();
  })

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('it should return an empty array if value is falsy', () => {

    expect(pipe.transform(null, {label: ''})).toEqual([]);
    expect(pipe.transform(undefined, {label: ''})).toEqual([]);
  })

  it('it should return the same array if search box is empty', () => {

    // Arrange
    const value = [
      {label: 'test1'},
      {label: 'test2'}
    ]

    const searchText = {label: 'text'};

    // assert
    expect(pipe.transform(value, {label: ''})).toEqual(value)
  })


  it('it should return the matching value as written in search text', () => {

    // Arrange
    const value = [
      {label: 'test1'},
      {label: 'test2'},
      {label: 'product'},
    ]

    const searchText = {label: 'test'};

    // assert
    expect(pipe.transform(value, searchText)).toEqual([
      {label: 'test1'},
      {label: 'test2'}
    ])
  })


  it('it should return the matching value as written in search text thought search text written in capitalize', () => {

    // Arrange
    const value = [
      {label: 'test1'},
      {label: 'test2'},
      {label: 'product'},
    ]

    const searchText = {label: 'TEST'};

    // assert
    expect(pipe.transform(value, searchText)).toEqual([
      {label: 'test1'},
      {label: 'test2'}
    ])
  })

  it('it should return empty if no match found', () => {

    // Arrange
    const value = [
      {label: 'test1'},
      {label: 'test2'},
      {label: 'product'},
    ]

    const searchText = {label: 'nomatch'};

    // assert
    expect(pipe.transform(value, searchText)).toEqual([])
  })
});
