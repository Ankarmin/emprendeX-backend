import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { AuthenticatedUser } from '../auth/types/authenticated-user.type';
import { ProductosServiciosService } from './catalog.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateItemDto } from './dto/create-item.dto';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';

@Controller({ path: 'productos-servicios', version: '1' })
@UseGuards(JwtAuthGuard)
export class ProductosServiciosController {
  constructor(
    private readonly productosServiciosService: ProductosServiciosService,
  ) {}

  @Get('units')
  getUnits(@CurrentUser() currentUser: AuthenticatedUser) {
    return this.productosServiciosService.getUnits(currentUser.id);
  }

  @Post('units')
  @HttpCode(HttpStatus.CREATED)
  createUnit(
    @CurrentUser() currentUser: AuthenticatedUser,
    @Body() createUnitDto: CreateUnitDto,
  ) {
    return this.productosServiciosService.createUnit(
      currentUser.id,
      createUnitDto,
    );
  }

  @Patch('units/:unitId')
  updateUnit(
    @CurrentUser() currentUser: AuthenticatedUser,
    @Param('unitId', new ParseUUIDPipe()) unitId: string,
    @Body() updateUnitDto: UpdateUnitDto,
  ) {
    return this.productosServiciosService.updateUnit(
      currentUser.id,
      unitId,
      updateUnitDto,
    );
  }

  @Delete('units/:unitId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUnit(
    @CurrentUser() currentUser: AuthenticatedUser,
    @Param('unitId', new ParseUUIDPipe()) unitId: string,
  ): Promise<void> {
    await this.productosServiciosService.deleteUnit(currentUser.id, unitId);
  }

  @Get('categories')
  getCategories(@CurrentUser() currentUser: AuthenticatedUser) {
    return this.productosServiciosService.getCategories(currentUser.id);
  }

  @Post('categories')
  @HttpCode(HttpStatus.CREATED)
  createCategory(
    @CurrentUser() currentUser: AuthenticatedUser,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return this.productosServiciosService.createCategory(
      currentUser.id,
      createCategoryDto,
    );
  }

  @Patch('categories/:categoryId')
  updateCategory(
    @CurrentUser() currentUser: AuthenticatedUser,
    @Param('categoryId', new ParseUUIDPipe()) categoryId: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.productosServiciosService.updateCategory(
      currentUser.id,
      categoryId,
      updateCategoryDto,
    );
  }

  @Delete('categories/:categoryId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCategory(
    @CurrentUser() currentUser: AuthenticatedUser,
    @Param('categoryId', new ParseUUIDPipe()) categoryId: string,
  ): Promise<void> {
    await this.productosServiciosService.deleteCategory(
      currentUser.id,
      categoryId,
    );
  }

  @Get('items')
  getItems(@CurrentUser() currentUser: AuthenticatedUser) {
    return this.productosServiciosService.getItems(currentUser.id);
  }

  @Get('items/:itemId')
  getItemById(
    @CurrentUser() currentUser: AuthenticatedUser,
    @Param('itemId', new ParseUUIDPipe()) itemId: string,
  ) {
    return this.productosServiciosService.getItemById(currentUser.id, itemId);
  }

  @Post('items')
  @HttpCode(HttpStatus.CREATED)
  createItem(
    @CurrentUser() currentUser: AuthenticatedUser,
    @Body() createItemDto: CreateItemDto,
  ) {
    return this.productosServiciosService.createItem(
      currentUser.id,
      createItemDto,
    );
  }

  @Patch('items/:itemId')
  updateItem(
    @CurrentUser() currentUser: AuthenticatedUser,
    @Param('itemId', new ParseUUIDPipe()) itemId: string,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    return this.productosServiciosService.updateItem(
      currentUser.id,
      itemId,
      updateItemDto,
    );
  }

  @Delete('items/:itemId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteItem(
    @CurrentUser() currentUser: AuthenticatedUser,
    @Param('itemId', new ParseUUIDPipe()) itemId: string,
  ): Promise<void> {
    await this.productosServiciosService.deleteItem(currentUser.id, itemId);
  }
}
