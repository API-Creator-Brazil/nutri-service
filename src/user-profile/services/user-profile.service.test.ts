import { Test, TestingModule } from '@nestjs/testing'
import {
  UserAccessType,
  UserActivityStatus,
  UserPersonalDataType,
} from '@prisma/client'
import { PrismaService } from '../../PrismaService/PrismaService'
import { UserProfile } from '../entities/user-profile.entity'
import { UserProfileService } from './user-profile.service'

describe('UserProfileService', () => {
  let userProfileService: UserProfileService
  let prisma: PrismaService

  const defaultUser = {
    name: 'user name',
    email: 'user email',
    phone: 'user phone',
    status: UserActivityStatus.ACTIVE,
  } as UserProfile

  const createUser = (prisma: PrismaService, profile: UserProfile) =>
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
            data: [{ type: UserAccessType.NUTRITIONIST }],
          },
        },
        status: profile.status,
      },
      include: { personalData: true },
    })

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, UserProfileService],
    }).compile()

    userProfileService = module.get<UserProfileService>(UserProfileService)
    prisma = module.get<PrismaService>(PrismaService)
  })

  afterEach(async () => {
    await prisma.user.deleteMany({ where: {} })
  })

  describe('findAll', () => {
    it('should return empty array if there is none', async () => {
      const users = await userProfileService.findAll()

      expect(users).toEqual([])
    })

    it('should find one user', async () => {
      await createUser(prisma, defaultUser)

      const users = await userProfileService.findAll()

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

      const users = await userProfileService.findAll()

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

      const users = await userProfileService.findAll()

      expect(users).toEqual([])
    })
  })

  describe('findOne', () => {
    it('should return null if there is user is not found', async () => {
      const existingUser = await userProfileService.findOne(
        '17feaccd-60d6-4241-a804-c963b4201d66',
      )

      expect(existingUser).toBe(null)
    })

    it('should return user if it exists', async () => {
      const createdUser = await createUser(prisma, defaultUser)

      const existingUser = await userProfileService.findOne(createdUser.id)

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

      const existingUser = await userProfileService.findOne(createdUser.id)

      expect(existingUser).toBe(null)
    })
  })

  describe('update personal data', () => {
    it('should return null if user does not exist', async () => {
      const updatedUser = await userProfileService.updatePersonalData(
        '5ae364f7-5a2d-469b-b45c-a71d36ae5dcb',
        defaultUser,
      )

      expect(updatedUser).toBe(null)
    })

    it.each([
      ['name', 'new name'],
      ['email', 'new email'],
      ['phone', 'new phone'],
      ['cpf', 'new cpf'],
      ['birthday', 'new birthday'],
    ])('should update %s', async (fieldName, newValue) => {
      const createdUser = await createUser(prisma, defaultUser)

      const updatedUser = await userProfileService.updatePersonalData(
        createdUser.id,
        {
          ...defaultUser,
          [fieldName]: newValue,
        },
      )

      expect(updatedUser[fieldName]).toBe(newValue)
    })
  })

  describe('remove', () => {
    it('should return null if user does not exist', async () => {
      const removedUser = await userProfileService.remove(
        '5ae364f7-5a2d-469b-b45c-a71d36ae5dcb',
      )

      expect(removedUser).toBe(null)
    })

    it('should return removed user removed', async () => {
      const createdUser = await createUser(prisma, defaultUser)

      const removedUser = await userProfileService.remove(createdUser.id)

      expect(removedUser).toEqual({
        id: expect.anything(),
        ...defaultUser,
        status: UserActivityStatus.REMOVED,
      })
    })
  })
})
