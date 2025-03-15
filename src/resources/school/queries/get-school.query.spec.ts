import { GetSchoolQuery } from './get-school.query';

describe('GetSchoolQuery', () => {
  it('should create an instance with the given parameters', () => {
    const params = { id: '1' };
    const query = new GetSchoolQuery(params);

    expect(query).toBeDefined();
    expect(query.params).toEqual(params);
  });
});
