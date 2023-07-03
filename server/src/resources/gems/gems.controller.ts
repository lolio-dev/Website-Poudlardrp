import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { GemsService } from './gems.service';
import { CreateGemDto } from './dto/create-gem.dto';
import { UpdateGemDto } from './dto/update-gem.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '../../types/enums/role.enum';
import { Roles } from '../../utils/decorators/roles.decorator';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';

@ApiTags('Gems')
@Controller('gems')
export class GemsController {
  constructor(private readonly gemsService: GemsService) {}

  @Post()
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new gem offer' })
  @ApiResponse({ status: 201, description: 'The offer has been successfully created.' })
  @ApiResponse({ status: 400, description: 'An offer with this id already exist.' })
  @ApiResponse({ status: 403, description: 'Forbidden operation.' })
  create(@Body() createGemDto: CreateGemDto) {
    return this.gemsService.create(createGemDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all gems offers.' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  findAll() {
    return this.gemsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one gems offer.' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @ApiResponse({ status: 404, description: 'No offer found.' })
  findOne(@Param('id') id: string) {
    return this.gemsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a gems offer.' })
  @ApiResponse({ status: 200, description: 'The offer has been successfully updated.' })
  update(@Param('id') id: string, @Body() updateGemDto: UpdateGemDto) {
    return this.gemsService.update(id, updateGemDto);
  }

  @Post(':id/archive')
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Archive one gems offer.' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @ApiResponse({ status: 404, description: 'No offer found.' })
  archive(@Param('id') id: string) {
    return this.gemsService.archive(id);
  }

  @Post(':id/unarchive')
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Unarchive one gems offer.' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @ApiResponse({ status: 404, description: 'No offer found.' })
  unarchive(@Param('id') id: string) {
    return this.gemsService.unarchive(id);
  }
}
