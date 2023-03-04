import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'
import { UserProfileModule } from './user-profile/user-profile.module'
import { CustomUUIDScalar } from './CustomGraphQLScalars/UUID'
import { CPFScalar } from './CustomGraphQLScalars/CPF'
import { DateStringScalar } from './CustomGraphQLScalars/DateString'
import { EmailScalar } from './CustomGraphQLScalars/Email'
import { PhoneScalar } from './CustomGraphQLScalars/Phone'
import { FullNameScalar } from './CustomGraphQLScalars/FullName'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      resolvers: [
        { UUID: CustomUUIDScalar },
        { CPF: CPFScalar },
        { DateString: DateStringScalar },
        { Email: EmailScalar },
        { Phone: PhoneScalar },
        { FullName: FullNameScalar },
      ],
    }),

    UserProfileModule,
  ],
})
export class MainModule {}
