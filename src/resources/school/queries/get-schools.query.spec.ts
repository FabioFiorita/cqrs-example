import { GetSchoolsQuery } from './get-schools.query';

describe('GetSchoolsQuery', () => {
  it('should create an instance with the given parameters', () => {
    const params = { limit: 10, offset: 0 };
    const query = new GetSchoolsQuery(params);

    expect(query).toBeDefined();
    expect(query.params).toEqual(params);
  });
});
