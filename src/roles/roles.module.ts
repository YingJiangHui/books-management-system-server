import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { RolesService } from './roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role])], // 导入实体
  providers: [RolesService],
  exports:[RolesService]
})
export class RolesModule {}
