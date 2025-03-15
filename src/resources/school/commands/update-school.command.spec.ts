import { UpdateSchoolCommand } from './update-school.command';

describe('UpdateSchoolCommand', () => {
  it('should create an instance with the given parameters', () => {
    const params = {
      id: 1,
      updateSchoolDto: { newAddress: '123 New Address' },
    };
    const command = new UpdateSchoolCommand(params);

    expect(command).toBeDefined();
    expect(command.params).toEqual(params);
  });
});
