import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserquestionDto } from './dto/create-userquestion.dto';
import { UpdateUserquestionDto } from './dto/update-userquestion.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UsersQuestion, QuestionDocument } from './schema/userquestions.schema';
import { Model, Types } from 'mongoose';
import mongoose from 'mongoose';
import axios from 'axios';

@Injectable()
export class UserquestionsService {
  private readonly GEMINI_API_URL =
    'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent';
  private readonly geminiApiKey: string;
  constructor(
    @InjectModel(UsersQuestion.name)
    private QuestionModel: Model<QuestionDocument>,
    private readonly configService: ConfigService,
  ) {
    this.geminiApiKey = this.configService.get<string>('GEMINI_API_KEY');
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

  async create(createUserquestionDto: CreateUserquestionDto, user) {
    const {
      subject,
      chapter,
      prevExam,
      question,
      option_01,
      option_02,
      option_03,
      option_04,
      content,
    } = createUserquestionDto;
    const createSlug = (text) => {
      return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9/s-]/g, '-')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
    };
    const date = new Date().getTime();
    const slug = createSlug(
      'bcs-preparation-online-' +
        subject +
        '-' +
        chapter +
        '-' +
        question +
        '-' +
        date,
    );
    const fullSchema = {
      slug,
      userId: user._id,
      userName: user.name,
      ...createUserquestionDto,
    };
    const existedQuestion = await this.QuestionModel.find({ question });

    const hasExistingQuestion = existedQuestion.some(
      (ex) => ex.question == question,
    );
    const hasExistingChapter = existedQuestion.some(
      (ex) => ex.chapter == chapter,
    );
    const hasExistingPrevExam = existedQuestion.some(
      (ex) => ex.prevExam == prevExam,
    );
    const hasExistingContent = existedQuestion.some(
      (ex) => ex.content == content,
    );

    if (
      hasExistingQuestion &&
      hasExistingChapter &&
      hasExistingPrevExam &&
      hasExistingContent
    ) {
      throw new ConflictException(
        'This question already exist, please add a new one',
      );
    } else {
      const createQuestion = new this.QuestionModel(fullSchema);
      await createQuestion.save();
      return 'Question create success';
    }
  } //

  async generateDescriptionByAi({ subject, chapter, question,content }) {
    if (subject && chapter && question) {
      const direction = `Create for me a description based on Subject:${subject}, Chapter:${chapter} and Question:${question}. if question is in Bangla produce the
    description in bangla if english then English if it is Math produce math fit for text editor in next.js as the app use text editor. while producing description 
    you can use html tag to bold and list the important text or use color because I use react Rich Text Edito. You can also seperate between two line. also you should point important part following this text editoe 
    also seperate the lines and show the description like I write description in text editor where I can bold color some inportant text etc. the description will be between 100 to 1000 words. Again I say if this is a math you can do the math in such a way where it can be fit in the text editor.I hope you understand
    . Again you do non show any unwanted text in the description box only the important things. thank you`;
    if (!content) {
      const genData = await this.getGeminiAnswer(direction);
      return genData;
    } else {
      return content
    }
    } else {
      return 'Please add a question set it`s subject and chapter to get a right description!';
    }
  }

  async edit(question, id) {
    await this.QuestionModel.findByIdAndUpdate(id, question, { new: true });
    return null;
  }
  async deleteQuestion(id) {
    await this.QuestionModel.findByIdAndDelete(id);
    return null;
  }

  async createComment(commentSchema, questionId) {
    const targetQuestion = await this.QuestionModel.findById(questionId);
    targetQuestion.comments.push(commentSchema);
    await targetQuestion.save();
  }
  /////////////////////////////////////////////////////////////////////////////////////
  async createLike(userId, questionId) {
    const targetQuestion = await this.QuestionModel.findById(questionId);
    if (targetQuestion.likes.includes(userId)) {
      return 'Already Liked the question';
    } else {
      targetQuestion.likes.push(userId);
      await targetQuestion.save();
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////

  async findMyAllQuestions(id, skip) {
    const filteredQuestions = await this.QuestionModel.aggregate([
      { $match: { userId: id } },

      { $unwind: { path: '$comments', preserveNullAndEmptyArrays: true } },

      // Sort the comments in descending order by their `createdAt`
      { $sort: { 'comments.createdAt': -1 } },
      {
        $lookup: {
          from: 'readers', // The name of the user profiles collection
          localField: 'userId', // The field in the questions collection
          foreignField: '_id', // The field in the users collection
          as: 'userProfile', // The name of the new field to store the joined data
        },
      },
      {
        $unwind: {
          path: '$userProfile',
          preserveNullAndEmptyArrays: true, // Optional: keep questions even if user profile doesn't exist
        },
      },
      {
        $skip: +skip, // Skip the required number of documents
      },
      {
        $limit: 10, // Limit the number of documents
      },
      // Group back all fields and collect the sorted comments

      {
        $group: {
          _id: '$_id', // Group by question ID
          chapter: { $first: '$chapter' },
          content: { $first: '$content' },
          createdAt: { $first: '$createdAt' },
          likes: { $first: '$likes' },
          option_01: { $first: '$option_01' },
          option_02: { $first: '$option_02' },
          option_03: { $first: '$option_03' },
          option_04: { $first: '$option_04' },
          prevExam: { $first: '$prevExam' },
          question: { $first: '$question' },
          rightAns: { $first: '$rightAns' },
          slug: { $first: '$slug' },
          subject: { $first: '$subject' },
          updatedAt: { $first: '$updatedAt' },
          userId: { $first: '$userId' },
          userName: { $first: '$userName' },
          userProfile: { $first: '$userProfile' },
          __v: { $first: '$__v' },
          recentComments: { $push: '$comments' }, // Collect all sorted comments
        },
      },
      { $sort: { createdAt: -1 } },

      {
        $project: {
          chapter: 1,
          content: 1,
          createdAt: 1,
          likes: 1,
          option_01: 1,
          option_02: 1,
          option_03: 1,
          option_04: 1,
          prevExam: 1,
          question: 1,
          rightAns: 1,
          slug: 1,
          subject: 1,
          updatedAt: 1,
          userId: 1,
          userName: 1,
          profile: '$userProfile.profile',
          __v: 1,
          comments: { $slice: ['$recentComments', 0, 2] }, // Limit to two comments
          totalComments: { $size: '$recentComments' }, // Count the total number of comments
          // comments: { $reverseArray: { $slice: ["$recentComments", 0, 2] } }, // Reverse the array
        },
      },
    ]);
    return filteredQuestions;
  } //

  async getAQuestion(slug) {
    const result = await this.QuestionModel.find(
      { slug },
      { comments: { $slice: -1 } },
    );
    return result;
  }

  async findMyFriendsAllQuestions(id, skip) {
    const questions = await this.QuestionModel.aggregate([
      {
        $match: {
          userId: { $ne: id }, // Exclude user's questions
        },
      },
      {
        $lookup: {
          from: 'readers', // The name of the user profiles collection
          localField: 'userId', // The field in the questions collection
          foreignField: '_id', // The field in the users collection
          as: 'userProfile', // The name of the new field to store the joined data
        },
      },
      {
        $unwind: {
          path: '$userProfile',
          preserveNullAndEmptyArrays: true, // Optional: keep questions even if user profile doesn't exist
        },
      },
      {
        $sort: { createdAt: -1 }, // Sort questions by creation date (newest first)
      },
      {
        $skip: +skip, // Skip the required number of documents
      },
      {
        $limit: 10, // Limit the number of documents
      },
      {
        $project: {
          slug: 1,
          userId: 1,
          userName: 1,
          profile: '$userProfile.profile',
          subject: 1,
          chapter: 1,
          prevExam: 1,
          question: 1,
          option_01: 1,
          option_02: 1,
          option_03: 1,
          option_04: 1,
          rightAns: 1,
          content: 1,
          likes: 1,
          comments: { $slice: ['$comments', -2] }, // Include only the last 2 comments
          totalComments: { $size: '$comments' }, // Count the total number of comments
          createdAt: 1,
        },
      },
    ]);
    return questions;
  }

  async testQ() {
    return await this.QuestionModel.find();
  }

  async findMyFriendsAllQuestionComments(id, skip) {
    const result = await this.QuestionModel.findById(id);
    const sliceComments = result.comments
      .reverse()
      .slice((skip - 1) * 5, skip * 5);
    return { comments: sliceComments, total: result.comments.length };
  }

  findAll() {
    return `This action returns all userquestions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userquestion`;
  }

  update(id: number, updateUserquestionDto: UpdateUserquestionDto) {
    return `This action updates a #${id} userquestion`;
  }

  remove(id: number) {
    return `This action removes a #${id} userquestion`;
  }
}
