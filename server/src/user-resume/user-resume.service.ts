import { Injectable } from '@nestjs/common';
import { CreateUserResumeDto } from './dto/create-user-resume.dto';
import { UpdateUserResumeDto } from './dto/update-user-resume.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CV, CVDocument } from './schema/user-resume-schema';
import { Model } from 'mongoose';

@Injectable()
export class UserResumeService {
  constructor (
    @InjectModel(CV.name) private  UserResume : Model <CVDocument>
  ){

  }
  async create(primaryData,userId) {
    const isExist = await this.UserResume.findOne({userId})

    if (isExist) {
        return 'Already Exist!'
    } else {
      const newResume = new this.UserResume({userId,primaryData});
      await newResume.save()
      return null
    }
  }

  async editPrimaryBio(primaryData,userId) {
    const isExist = await this.UserResume.findOne({userId})

    if (isExist) {
      isExist.primaryData[0]=primaryData;
      await isExist.save()
    } else {
      return null
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////
  async addEducation(educationData,userId) {
    const isExist = await this.UserResume.findOne({userId})

    if (isExist) {
      isExist.education.push(educationData);
      await isExist.save()
    } else {
      return null
    }
  }


  async updateEducation(id,userId,filteredPayload) {
    const isExist = await this.UserResume.findOne({userId})
    if (isExist) {
     const currentIndex = isExist.education.findIndex( (item:any) => item.id === id)
     if (currentIndex !== -1) {
      isExist.education[currentIndex] = {...isExist.education[currentIndex],...filteredPayload}
     }
     console.log(isExist.education);
     await isExist.save()
     return  {id,...filteredPayload}
         } else {
      return null
    }
  }//

  async deleteEducation(id, userId) {
    const isExist = await this.UserResume.findOne({ userId });
  
    if (isExist) {
      // Filter out the item
      const updatedEducation = isExist.education?.filter((item: any) => item?.id !== id);
  
      // Assign it back to the document
      isExist.education = updatedEducation;
  
      // Save the updated document
      await isExist.save();
      console.log(isExist.education)
      return isExist.education; // optional: return updated list
    } else {
      return null;
    }
  }

////////////////////////////////////////////////////////////////////////////////////////////
async addExperience(educationData,userId) {
  const isExist = await this.UserResume.findOne({userId})

  if (isExist) {
    isExist.experience.push(educationData);
    await isExist.save()
  } else {
    return null
  }
}

async updateExperience(id,userId,filteredPayload) {
  const isExist = await this.UserResume.findOne({userId})
  if (isExist) {
   const currentIndex = isExist.experience.findIndex( (item:any) => item.id === id)
   if (currentIndex !== -1) {
    isExist.experience[currentIndex] = {...isExist.experience[currentIndex],...filteredPayload}
   }
   await isExist.save()
   return  {id,...filteredPayload}
       } else {
    return null
  }
}//

async deleteExperience(id, userId) {
  const isExist = await this.UserResume.findOne({ userId });

  if (isExist) {
    // Filter out the item
    const updatedExperience = isExist.experience?.filter((item: any) => item?.id !== id);

    // Assign it back to the document
    isExist.experience = updatedExperience;

    // Save the updated document
    await isExist.save();
    return isExist.experience; // optional: return updated list
  } else {
    return null;
  }
}




////////////////////////////////////////////////////////////////////////////////////////////
async addProject(educationData,userId) {
  const isExist = await this.UserResume.findOne({userId})

  if (isExist) {
    isExist.project=[...educationData];
    console.log(educationData)
    await isExist.save()
  } else {
    return null
  }
}

async addReProject(educationData,userId) {
  const isExist = await this.UserResume.findOne({userId})

  if (isExist) {
    isExist.project=[...educationData,...isExist.project];
    await isExist.save()
  } else {
    return null
  }
}


async updateProject(id,userId,projectData) {
  const isExist = await this.UserResume.findOne({userId})
  if (isExist) {
   const currentIndex = isExist.project.findIndex( (item:any) => item.id === id)
   if (currentIndex !== -1) {
    isExist.project[currentIndex] = {id,...projectData}
   }
   await isExist.save()
   return  {id,...projectData}
       } else {
    return null
  }
}//

async deleteProject(id, userId) {
  const isExist = await this.UserResume.findOne({ userId });

  if (isExist) {
    // Filter out the item
    const updatedPro = isExist.project?.filter((item: any) => item?.id !== id);

    // Assign it back to the document
    isExist.project = updatedPro;

    // Save the updated document
    await isExist.save();
    return isExist.project; // optional: return updated list
  } else {
    return null;
  }
}


  
  async getPrimaryBio(id) {
    const getAllCvData = await this.UserResume.find({userId:id})
    return getAllCvData[0];
  }

  findOne(id: number) {
    return `This action returns a #${id} userResume`;
  }

  update(id: number, updateUserResumeDto: UpdateUserResumeDto) {
    return `This action updates a #${id} userResume`;
  }

  remove(id: number) {
    return `This action removes a #${id} userResume`;
  }
}
