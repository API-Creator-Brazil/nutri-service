import { Test, TestingModule } from '@nestjs/testing'
import {
  User,
  UserAccessType,
  UserActivityStatus,
  UserPersonaDataPriority,
  UserPersonalData,
  UserPersonalDataType,
} from '@prisma/client'
import { PrismaService } from '../../PrismaService/PrismaService'
import { UserProfile } from '../entities/user-profile.entity'
import { NutritionistProfileService } from './nutritionist-profile.service'

describe('NutricionistProfileService', () => {
  let nutricionistProfileService: NutritionistProfileService
  let prisma: PrismaService

  const defaultUser = {
    name: 'user name',
    email: 'user email',
    phone: 'user phone',
    status: UserActivityStatus.ACTIVE,
  } as UserProfile

  const createUser = (
    prisma: PrismaService,
    profile: UserProfile,
    accessType?: UserAccessType,
  ) =>
    prisma.user.create({
      data: {
        personalData: {
          createMany: {
            data: [
              {
                value: profile.name,
                type: UserPersonalDataType.NAME,
              },
              {
                value: profile.email,
                type: UserPersonalDataType.EMAIL,
              },
              {
                value: profile.phone,
                type: UserPersonalDataType.PHONE,
              },
            ],
          },
        },
        access: {
          createMany: {
            data: [{ type: accessType ?? UserAccessType.NUTRITIONIST }],
          },
        },
        status: profile.status as UserActivityStatus,
      },
      include: { personalData: true },
    })

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, NutritionistProfileService],
    }).compile()

    nutricionistProfileService = module.get<NutritionistProfileService>(
      NutritionistProfileService,
    )
    prisma = module.get<PrismaService>(PrismaService)
  })

  afterEach(async () => {
    await prisma.user.deleteMany({ where: {} })
  })

  describe('create', () => {
    it('should create new nutricionist user', async () => {
      await nutricionistProfileService.create(defaultUser)

      const createdUser = await prisma.user.findMany({
        include: { personalData: true },
      })

      expect(createdUser.length).toBe(1)
      expect(createdUser).toContainEqual({
        id: expect.anything(),
        personalData: [
          {
            id: expect.anything(),
            value: defaultUser.name,
            type: UserPersonalDataType.NAME,
            userId: expect.anything(),
            priority: UserPersonaDataPriority.DEFAULT,
            complement: null,
            description: null,
          },
          {
            id: expect.anything(),
            value: defaultUser.email,
            type: UserPersonalDataType.EMAIL,
            userId: expect.anything(),
            priority: UserPersonaDataPriority.DEFAULT,
            complement: null,
            description: null,
          },
          {
            id: expect.anything(),
            value: defaultUser.phone,
            type: UserPersonalDataType.PHONE,
            userId: expect.anything(),
            priority: UserPersonaDataPriority.DEFAULT,
            complement: null,
            description: null,
          },
        ],
        status: defaultUser.status,
        createdAt: expect.anything(),
        udpatedAt: expect.anything(),
      } as (typeof createdUser)[0])
    })

    it('should create two new nutricionist user', async () => {
      const otherUser = {
        name: 'other user name',
        email: 'other user email',
        phone: 'other user phone',
        status: UserActivityStatus.ACTIVE,
      } as UserProfile

      await nutricionistProfileService.create(defaultUser)
      await nutricionistProfileService.create(otherUser)

      const createdUsers = await prisma.user.findMany()

      expect(createdUsers.length).toBe(2)
    })
  })

  describe('findAll', () => {
    it('should return empty array if there is none', async () => {
      const users = await nutricionistProfileService.findAll()

      expect(users).toEqual([])
    })

    it('should find one user', async () => {
      await createUser(prisma, defaultUser)

      const users = await nutricionistProfileService.findAll()

      expect(users.length).toBe(1)

      expect(users).toContainEqual({
        id: expect.anything(),
        ...defaultUser,
      })
    })

    it('should find 2 users', async () => {
      const otherUser = {
        name: 'other user name',
        email: 'other user email',
        phone: 'other user phone',
        status: UserActivityStatus.ACTIVE,
      } as UserProfile

      await createUser(prisma, defaultUser)
      await createUser(prisma, otherUser)

      const users = await nutricionistProfileService.findAll()

      expect(users.length).toBe(2)

      expect(users).toContainEqual({
        id: expect.anything(),
        ...defaultUser,
      })

      expect(users).toContainEqual({
        id: expect.anything(),
        ...otherUser,
      })
    })

    it('should not find user if status is removed', async () => {
      const removedUser = {
        name: 'other user name',
        email: 'other user email',
        phone: 'other user phone',
        status: UserActivityStatus.REMOVED,
      } as UserProfile

      await createUser(prisma, removedUser)

      const users = await nutricionistProfileService.findAll()

      expect(users).toEqual([])
    })

    it('should not find user if access is not nutritionist', async () => {
      await createUser(prisma, defaultUser, UserAccessType.PATIENT)

      const users = await nutricionistProfileService.findAll()

      expect(users).toEqual([])
    })
  })

  describe('findOne', () => {
    it('should return null if there is user is not found', async () => {
      const existingUser = await nutricionistProfileService.findOne(
        '17feaccd-60d6-4241-a804-c963b4201d66',
      )

      expect(existingUser).toBe(null)
    })

    it('should return user if it exists', async () => {
      const createdUser = await createUser(prisma, defaultUser)

      const existingUser = await nutricionistProfileService.findOne(
        createdUser.id,
      )

      expect(existingUser).toEqual({
        id: expect.anything(),
        ...defaultUser,
      })
    })

    it('should return null if removed', async () => {
      const removedUser = {
        name: 'other user name',
        email: 'other user email',
        phone: 'other user phone',
        status: UserActivityStatus.REMOVED,
      } as UserProfile

      const createdUser = await createUser(prisma, removedUser)

      const existingUser = await nutricionistProfileService.findOne(
        createdUser.id,
      )

      expect(existingUser).toBe(null)
    })

    it('should not find user if access is not nutritionist', async () => {
      const createdUser = await createUser(
        prisma,
        defaultUser,
        UserAccessType.PATIENT,
      )

      const existingUser = await nutricionistProfileService.findOne(
        createdUser.id,
      )

      expect(existingUser).toBe(null)
    })
  })
})
