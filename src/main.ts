import { NestFactory } from '@nestjs/core'
import { MainModule } from './main.module'
import { PrismaService } from './PrismaService/PrismaService'

async function bootstrap() {
  const app = await NestFactory.create(MainModule)

  // Graceful prisma client shutdown
  // (https://github.com/prisma/prisma/issues/2917#issuecomment-708340112)
  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)

  await app.listen(3000)
}

bootstrap()
