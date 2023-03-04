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
  createNutritionistProfile(
    @Args('createNutritionistProfileInput')
    createUserProfileInput: CreateUserProfileInput,
  ) {
    return this.nutritionistProfileService.create(createUserProfileInput)
  }

  @Query(() => [UserProfile], { name: 'userProfile' })
  findAll() {
    return this.userProfileService.findAll()
  }

  @Query(() => UserProfile, { name: 'userProfile' })
  findOne(@Args('id', { type: () => Int }) id: string) {
    return this.nutritionistProfileService.findOne(id)
  }

  @Mutation(() => UserProfile)
  updateUserProfile(
    @Args('updateUserProfileInput')
    updateUserProfileInput: UpdateUserProfileInput,
  ) {
    return this.userProfileService.updatePersonalData(
      updateUserProfileInput.id,
      updateUserProfileInput,
    )
  }

  @Mutation(() => UserProfile)
  removeUserProfile(@Args('id', { type: () => String }) id: string) {
    return this.userProfileService.remove(id)
  }
}
