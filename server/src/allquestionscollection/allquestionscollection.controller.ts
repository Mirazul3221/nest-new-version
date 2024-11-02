import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query, Req } from '@nestjs/common';
import { AllquestionscollectionService } from './allquestionscollection.service';
import { CreateAllquestionscollectionDto } from './dto/create-allquestionscollection.dto';
import { UpdateAllquestionscollectionDto } from './dto/update-allquestionscollection.dto';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
@Controller('allquestionscollection')
export class AllquestionscollectionController {
  constructor(private readonly allquestionscollectionService: AllquestionscollectionService) {}

  @Post('create')
  @UsePipes(ValidationPipe)
  @FormDataRequest({storage:FileSystemStoredFile})
  create(@Body() createAllquestionscollectionDto : CreateAllquestionscollectionDto) {
    return this.allquestionscollectionService.create(createAllquestionscollectionDto);
  }

  @Get("findall")
  async findAll() {
    return await this.allquestionscollectionService.findAll();
  }
  //============BANGLA================
  @Get("banglaforeader")
  async findBanglaQuestionsFoReader() {
    return await this.allquestionscollectionService.findBanglaForReader();
  }
  @Get("bangla")
  async findBanglaQuestions() {
    return await this.allquestionscollectionService.findBangla();
  }
  //============ENGLISH===============

  @Get("englishforeader/:getopicvalue")
  async findEnglishQuestionsFoReader(@Param('getopicvalue') topicValue:any) {
    return await this.allquestionscollectionService.findEnglishForReader(topicValue);
  }//
  @Get("english")
  async findEnglishQuestions() {
    return await this.allquestionscollectionService.findEnglish();
  }

  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.allquestionscollectionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAllquestionscollectionDto: UpdateAllquestionscollectionDto) {
    return this.allquestionscollectionService.update(+id, updateAllquestionscollectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.allquestionscollectionService.remove(+id);
  }

  //=================Public Access=========================
  @Get('publicUser/all')
  async getAllQuestions(){
   return await this.allquestionscollectionService.findAll()
  }

  @Get('publicUser/find/:id')
  // @UseGuards(AuthGuard())
  async findQuestionForUser(@Param('id') id: string) {
    return await this.allquestionscollectionService.findFromPublicPlace(id);
  }


  @Get('publicUser/findbytopic/:topic')
  // @UseGuards(AuthGuard())
  async findTopicForPublicUser(@Param('topic') topic: string) {
    return await this.allquestionscollectionService.findTopicForPublicUser(topic);
  }
  //////////////////////////////////////////////////////////////////////////////////////////////
  @Get('english/find/:id')
  // @UseGuards(AuthGuard())
  async findEnglishSingleQuestion(@Param('id') id: string) {
    return await this.allquestionscollectionService.findEnglishSingleQuestion(id);
  }

  @Patch('updatenglish/:id')//
  async updateEnglish(@Param('id') id: string, @Body() body) : Promise<{msg:string}> {
    console.log(id,body)
    return await this.allquestionscollectionService.updateEnglis(id, body);
  }

  //========================================//
  //==========FAVOURITE-QUESTIONS============//
  //=========================================//
  @Post('myallfavouritequestions')
  async multipleQue(@Body() allQuestionsInfo) {
    return await this.allquestionscollectionService.multipleQue(allQuestionsInfo);
  }
  
  @Get('api/search/:value')
 async searchQuestionByQuery(@Param("value") param){
     return await this.allquestionscollectionService.searchQuestionByQuery(param)
  } 
  //=============Delete single question=====================
  @Get('english/delete/:id')
  // @UseGuards(AuthGuard())
  async deleteQuestion(@Param('id') id: string) {
    return await this.allquestionscollectionService.deleteQuestion(id);
  }
}
