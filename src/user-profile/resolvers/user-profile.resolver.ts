import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { UserProfileService } from '../services/user-profile.service'
import { UserProfile } from '../entities/user-profile.entity'
import { CreateUserProfileInput } from '../dto/create-user-profile.input'
import { UpdateUserProfileInput } from '../dto/update-user-profile.input'
import { NutritionistProfileService } from '../services/nutritionist-profile.service'

@Resolver(() => UserProfile)
export class UserProfileResolver {
  constructor(
    private readonly userProfileService: UserProfileService,
    private readonly nutritionistProfileService: NutritionistProfileService,
  ) {}

  @Mutation(() => UserProfile)
  async createNutritionistProfile(
    @Args('createNutritionistProfileInput')
    createUserProfileInput: CreateUserProfileInput,
  ) {
    return await this.nutritionistProfileService.create(createUserProfileInput)
  }

  @Query(() => [UserProfile], { name: 'userProfile' })
  async findAll() {
    return await this.userProfileService.findAll()
  }

  @Query(() => UserProfile, { name: 'userProfile' })
  async findOne(@Args('id', { type: () => Int }) id: string) {
    return await this.nutritionistProfileService.findOne(id)
  }

  @Mutation(() => UserProfile)
  async updateUserProfile(
    @Args('updateUserProfileInput')
    updateUserProfileInput: UpdateUserProfileInput,
  ) {
    return await this.userProfileService.updatePersonalData(
      updateUserProfileInput.id,
      updateUserProfileInput,
    )
  }

  @Mutation(() => UserProfile)
  async removeUserProfile(@Args('id', { type: () => String }) id: string) {
    return await this.userProfileService.remove(id)
  }
}
