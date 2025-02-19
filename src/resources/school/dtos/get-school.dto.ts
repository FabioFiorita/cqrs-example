export class SchoolDto {
  id: number;
  name: string;
  address: string;

  constructor({ id, name, address }: SchoolDto) {
    this.id = id;
    this.name = name;
    this.address = address;
  }
}
