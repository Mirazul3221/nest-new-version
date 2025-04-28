import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UpdateUserResumeDto } from './dto/update-user-resume.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CV, CVDocument } from './schema/user-resume-schema';
import * as puppeteer from 'puppeteer';
import { Model } from 'mongoose';
import axios from 'axios';

@Injectable()
export class UserResumeService {
  private readonly GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent';
  private readonly geminiApiKey: string;
  constructor(@InjectModel(CV.name) private UserResume: Model<CVDocument>,private readonly configService: ConfigService) {
    this.geminiApiKey = this.configService.get<string>('GEMINI_API_KEY');
  }
  async create(primaryData, userId) {
    const isExist = await this.UserResume.findOne({ userId });

    if (isExist) {
      return 'Already Exist!';
    } else {
      const newResume = new this.UserResume({ userId, primaryData });
      await newResume.save();
      return null;
    }
  }

  async editPrimaryBio(primaryData, userId) {
    const isExist = await this.UserResume.findOne({ userId });

    if (isExist) {
      isExist.primaryData[0] = primaryData;
      await isExist.save();
    } else {
      return null;
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////
  async addEducation(educationData, userId) {
    const isExist = await this.UserResume.findOne({ userId });

    if (isExist) {
      isExist.education.push(educationData);
      await isExist.save();
    } else {
      return null;
    }
  }

  async updateEducation(id, userId, filteredPayload) {
    const isExist = await this.UserResume.findOne({ userId });
    if (isExist) {
      const currentIndex = isExist.education.findIndex(
        (item: any) => item.id === id,
      );
      if (currentIndex !== -1) {
        isExist.education[currentIndex] = {
          ...isExist.education[currentIndex],
          ...filteredPayload,
        };
      }
      console.log(isExist.education);
      await isExist.save();
      return { id, ...filteredPayload };
    } else {
      return null;
    }
  } //

  async deleteEducation(id, userId) {
    const isExist = await this.UserResume.findOne({ userId });

    if (isExist) {
      // Filter out the item
      const updatedEducation = isExist.education?.filter(
        (item: any) => item?.id !== id,
      );

      // Assign it back to the document
      isExist.education = updatedEducation;

      // Save the updated document
      await isExist.save();
      console.log(isExist.education);
      return isExist.education; // optional: return updated list
    } else {
      return null;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////
  async addExperience(educationData, userId) {
    const isExist = await this.UserResume.findOne({ userId });

    if (isExist) {
      isExist.experience.push(educationData);
      await isExist.save();
    } else {
      return null;
    }
  }

  async updateExperience(id, userId, filteredPayload) {
    const isExist = await this.UserResume.findOne({ userId });
    if (isExist) {
      const currentIndex = isExist.experience.findIndex(
        (item: any) => item.id === id,
      );
      if (currentIndex !== -1) {
        isExist.experience[currentIndex] = {
          ...isExist.experience[currentIndex],
          ...filteredPayload,
        };
      }
      await isExist.save();
      return { id, ...filteredPayload };
    } else {
      return null;
    }
  } //

  async deleteExperience(id, userId) {
    const isExist = await this.UserResume.findOne({ userId });

    if (isExist) {
      // Filter out the item
      const updatedExperience = isExist.experience?.filter(
        (item: any) => item?.id !== id,
      );

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
  async addProject(educationData, userId) {
    const isExist = await this.UserResume.findOne({ userId });

    if (isExist) {
      isExist.project = [...educationData];
      console.log(educationData);
      await isExist.save();
    } else {
      return null;
    }
  }

  async addReProject(educationData, userId) {
    const isExist = await this.UserResume.findOne({ userId });

    if (isExist) {
      isExist.project = [...educationData, ...isExist.project];
      await isExist.save();
    } else {
      return null;
    }
  }

  async updateProject(id, userId, projectData) {
    const isExist = await this.UserResume.findOne({ userId });
    if (isExist) {
      const currentIndex = isExist.project.findIndex(
        (item: any) => item.id === id,
      );
      if (currentIndex !== -1) {
        isExist.project[currentIndex] = { id, ...projectData };
      }
      await isExist.save();
      return { id, ...projectData };
    } else {
      return null;
    }
  } //

  async deleteProject(id, userId) {
    const isExist = await this.UserResume.findOne({ userId });

    if (isExist) {
      // Filter out the item
      const updatedPro = isExist.project?.filter(
        (item: any) => item?.id !== id,
      );

      // Assign it back to the document
      isExist.project = updatedPro;

      // Save the updated document
      await isExist.save();
      return isExist.project; // optional: return updated list
    } else {
      return null;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////

  async addSkills(educationData, userId) {
    const isExist = await this.UserResume.findOne({ userId });
    if (isExist) {
      isExist.skills = [...educationData];
      await isExist.save();
    } else {
      return null;
    }
  }

  async addReSkills(educationData, userId) {
    const isExist = await this.UserResume.findOne({ userId });

    if (isExist) {
      isExist.skills = [...educationData, ...isExist.skills];
      await isExist.save();
    } else {
      return null;
    }
  }

  async updateSkills(id, userId, projectData) {
    const isExist = await this.UserResume.findOne({ userId });
    if (isExist) {
      const currentIndex = isExist.skills.findIndex(
        (item: any) => item.id === id,
      );
      if (currentIndex !== -1) {
        isExist.skills[currentIndex] = { id, ...projectData };
      }
      await isExist.save();
      return { id, ...projectData };
    } else {
      return null;
    }
  } //

  async deleteSkills(id, userId) {
    const isExist = await this.UserResume.findOne({ userId });

    if (isExist) {
      // Filter out the item
      const updatedPro = isExist.skills?.filter((item: any) => item?.id !== id);

      // Assign it back to the document
      isExist.skills = updatedPro;

      // Save the updated document
      await isExist.save();
      return isExist.skills; // optional: return updated list
    } else {
      return null;
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  async addLangs(educationData, userId) {
    const isExist = await this.UserResume.findOne({ userId });
    if (isExist) {
      isExist.langs = [...educationData];
      await isExist.save();
    } else {
      return null;
    }
  }

  async addReLangs(educationData, userId) {
    const isExist = await this.UserResume.findOne({ userId });

    if (isExist) {
      isExist.langs = [...educationData, ...isExist.langs];
      await isExist.save();
    } else {
      return null;
    }
  }

  async updateLangs(id, userId, projectData) {
    const isExist = await this.UserResume.findOne({ userId });
    if (isExist) {
      const currentIndex = isExist.langs.findIndex(
        (item: any) => item.id === id,
      );
      if (currentIndex !== -1) {
        isExist.langs[currentIndex] = { id, ...projectData };
      }
      await isExist.save();
      return { id, ...projectData };
    } else {
      return null;
    }
  } //

  async deleteLangs(id, userId) {
    const isExist = await this.UserResume.findOne({ userId });

    if (isExist) {
      // Filter out the item
      const updatedPro = isExist.langs?.filter((item: any) => item?.id !== id);

      // Assign it back to the document
      isExist.langs = updatedPro;

      // Save the updated document
      await isExist.save();
      return isExist.langs; // optional: return updated list
    } else {
      return null;
    }
  }
  ///////////////////////////////////////////////////////////////////////////////
  async getPrimaryBio(userBio) {
    const getAllCvData = await this.UserResume.find({ userId: userBio.id });
    const bioWithProfile = getAllCvData[0];
    console.log(userBio.profile);
    return { cvdata: getAllCvData[0], profile: userBio.profile };
  }

  //////////////////////////////////////////////////here the logic for pdf generate/.////////////////////////////////////////
  async generatePdf(htmlContent: string) {
    // Define the dynamic <head> content (you can add styles or meta tags)
    const headContent = `
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial, sans-serif;
        color: "gray",
        padding: "40px",
        width: "794px", // A4 page width at 96 DPI
        min-height: "1123px", // A4 page height at 96 DPI (optional)
        margin: "0 auto", // center it
        background-color: "white", // to ensure white background for PDF
          }
        h1,h2,h3,h4,h5,h6,p,div {
          margin: 0;
        }
          /* Add more global styles here */
        </style>
      </head>
    `;

    // Define the full HTML structure with <html>, <head>, and <body>
    const fullHtmlContent = `
      <html>
        ${headContent}
        <body>
          ${htmlContent}
        </body>
      </html>
    `;
    // Launch Puppeteer and create the PDF
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set the page content
    await page.setContent(fullHtmlContent, { waitUntil: 'domcontentloaded' });

    // Generate PDF from the HTML content
    const pdfBuffer = await page.pdf({
      format: 'A4',                  // A4 paper size
      printBackground: true,          // Include background graphics
      margin: {
        top: '5mm',                  // Top padding
        right: '5mm',                // Right padding
        bottom: '5mm',               // Bottom padding
        left: '5mm',                 // Left padding
      },
    });
    

    // Close the browser after generating the PDF
    await browser.close();

    return pdfBuffer;
  }

  async getGeminiAnswer(question: any): Promise<string> {
    try {
      const response = await axios.post(
        `${this.GEMINI_API_URL}?key=${this.geminiApiKey}`,
        {
          contents: [
            {
              parts: [{ text: question }],
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const candidates = response.data?.candidates;
      if (candidates && candidates.length > 0) {
        return candidates[0].content.parts[0].text;
      } else {
        return 'No valid response from Gemini.';
      }
    } catch (error) {
      console.error('Gemini API error:', error.response?.data || error.message);
      throw new Error('Failed to generate Gemini response.');
    }
  }

async generateBio (userId){
  const isExist = await this.UserResume.findOne({ userId });
  const primaryData = isExist.primaryData?.[0] || {};
  const experience = isExist.experience?.[0] || {};
  
  const firstName = (primaryData as any).firstName;
  const lastName = (primaryData as any).lastName;
  const title = (primaryData as any).title;
  const number = (primaryData as any).number;
  const website = (primaryData as any).website;
  const location = (primaryData as any).location;
  const email = (primaryData as any).email;
  
  const jobTitle0 = (experience as any).jobTitle;
  const companyName0 = (experience as any).companyName;
  const tecUse0 = (experience as any).tecUse;
  const editorContent0 = (experience as any).editorContent;

  const jobTitle1 = (isExist.experience[1] as any).jobTitle; 
  const companyName1 = (isExist.experience[1] as any).companyName; 
  const tecUse1 = (isExist.experience[1] as any).tecUse;
  const editorContent1 = (isExist.experience[1] as any).editorContent;


  const jobTitle2 = (isExist.experience[2] as any).jobTitle; 
  const companyName2 = (isExist.experience[2] as any).companyName; 
  const tecUse2 = (isExist.experience[2] as any).tecUse;
  const editorContent2 = (isExist.experience[2] as any).editorContent;


  const longText = `Write a bio in 150 words based on the full text -here is my primary information take the important thing. Though i use my name but you replace my name as I . my bio start from here ${firstName + ' ' + lastName + " " + title + ' ' + number + ' ' + website + ' '
    + email + ' ' + location + '. Now I will provide you my experience info take only the the important value' + ' ' + jobTitle0 + ' ' + companyName0 + ' ' + tecUse0 + ' ' + editorContent0 + " Again  " + jobTitle1 + ' ' + companyName1 + ' ' + tecUse1 + ' ' + editorContent1 + '. Further '  + jobTitle2 + ' ' + companyName2 + ' ' + tecUse2 + ' ' + editorContent2
  }`

  if (
    firstName &&
    lastName &&
    title &&
    number &&
    email &&
    jobTitle0 &&
    tecUse0 &&
    editorContent0
  ) {
    const bio =await this.getGeminiAnswer(longText)
    isExist.primaryData[0] = {...isExist.primaryData[0],myBioData:bio} ;
    await isExist.save();
  }
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
