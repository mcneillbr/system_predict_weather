import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { UserService } from './user.service';
import { User } from './schemas';

const mockUser = {
  userName: 'user1',
  name: 'User #1',
  role: 'admin',
  password: '123456',
};

describe('userService', () => {
  let service: UserService;
  let model: Model<User>;

  const userArray = [
    { ...mockUser },
    {
      userName: 'user2',
      name: 'User #2',
      role: 'user',
      password: '654321',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken('User'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser),
            constructor: jest.fn().mockResolvedValue(mockUser),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    model = module.get<Model<User>>(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all user', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(userArray),
    } as any);
    const user = await service.findAll();

    expect(user).toEqual(userArray);
  });

  it('should insert a new User', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve(mockUser as any),
    );
    const newUser = await service.create({
      userName: 'user1',
      name: 'User #1',
      role: 'role #1',
      password: '123456',
    });

    expect(newUser).toEqual(mockUser);
  });
});
