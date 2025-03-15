import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CreateSchoolDto } from '../dtos/create-school.dto';
import { UpdateSchoolDto } from '../dtos/update-school.dto';
import { AppModule } from '@/app.module';

describe('SchoolController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/POST schools', async () => {
    const createSchoolDto: CreateSchoolDto = {
      schoolName: 'Test School',
      schoolAddress: 'Test Address',
    };

    const response = await request(app.getHttpServer())
      .post('/schools')
      .send(createSchoolDto)
      .expect(201);

    expect(response.body).toEqual({
      id: expect.any(Number),
      name: createSchoolDto.schoolName,
      address: createSchoolDto.schoolAddress,
    });
  });

  it('/PUT schools/:id', async () => {
    const updateSchoolDto: UpdateSchoolDto = {
      newAddress: 'Updated Address',
    };

    const response = await request(app.getHttpServer())
      .put('/schools/1')
      .send(updateSchoolDto)
      .expect(200);

    expect(response.body).toEqual({
      id: 1,
      name: expect.any(String),
      address: updateSchoolDto.newAddress,
    });
  });

  it('/DELETE schools/:id', async () => {
    await request(app.getHttpServer()).delete('/schools/1').expect(200);
  });

  it('/GET schools/:id', async () => {
    const response = await request(app.getHttpServer())
      .get('/schools/1')
      .expect(200);

    expect(response.body).toEqual({
      id: 1,
      name: expect.any(String),
      address: expect.any(String),
    });
  });

  it('/GET schools', async () => {
    const response = await request(app.getHttpServer())
      .get('/schools?limit=10&offset=0')
      .expect(200);

    expect(response.body).toEqual({
      schools: expect.any(Array),
    });
  });
});
