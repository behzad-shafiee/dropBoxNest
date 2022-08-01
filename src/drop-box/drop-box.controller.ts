import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DropBoxService } from './drop-box.service';
import { CreateDropBoxDto } from './dto/create-drop-box.dto';
import { UpdateDropBoxDto } from './dto/update-drop-box.dto';

@Controller('drop-box')
export class DropBoxController {
  constructor(private readonly dropBoxService: DropBoxService) {}

  @Post()
  create(@Body() createDropBoxDto: CreateDropBoxDto) {
    return this.dropBoxService.create(createDropBoxDto);
  }

  @Get()
  findAll() {
    return this.dropBoxService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dropBoxService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDropBoxDto: UpdateDropBoxDto) {
    return this.dropBoxService.update(+id, updateDropBoxDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dropBoxService.remove(+id);
  }
}
